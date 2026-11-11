const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1480,
    height: 920,
    minWidth: 1040,
    minHeight: 680,
    backgroundColor: '#0e1117',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.loadFile('index.html');
}

function splitMysqlArgs(value) {
  return value.match(/(?:[^\s"]+|"[^"]*")+/g)?.map((item) => item.replace(/^"|"$/g, '')) || [];
}

function runMysql({ mysqlPath, host, port, user, password, database, sql, extraArgs = [] }) {
  return new Promise((resolve) => {
    const args = ['--batch', '--raw', '--column-names', '-h', host || '127.0.0.1', '-P', String(port || 3306), '-u', user || 'root'];
    if (database) args.push(database);
    args.push(...splitMysqlArgs(extraArgs));
    const child = spawn(mysqlPath || 'mysql', args, {
      env: { ...process.env, MYSQL_PWD: password || '' },
      windowsHide: true,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => child.kill(), 30000);
    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('error', (error) => { clearTimeout(timer); resolve({ ok: false, error: error.message }); });
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ ok: code === 0, code, stdout, stderr, error: code === 0 ? '' : (stderr || `mysql.exe exited with code ${code}`) });
    });
    child.stdin.end(sql || '');
  });
}

ipcMain.handle('mysql:run', (_event, payload) => runMysql(payload));
ipcMain.handle('mysql:find-executable', () => {
  const candidates = [];
  try {
    const result = spawnSync(process.platform === 'win32' ? 'where.exe' : 'which', ['mysql'], { encoding: 'utf8', windowsHide: true });
    if (result.status === 0) candidates.push(...result.stdout.split(/\r?\n/).map((item) => item.trim()).filter(Boolean));
  } catch (_) {}
  if (process.platform === 'win32') {
    const roots = [process.env.ProgramFiles, process.env['ProgramFiles(x86)'], process.env.ProgramW6432, 'C:\\xampp\\mysql\\bin', 'C:\\wamp64\\bin\\mysql'];
    for (const root of roots.filter(Boolean)) {
      try {
        if (root.toLowerCase().endsWith('mysql\\bin')) candidates.push(path.join(root, 'mysql.exe'));
        else for (const folder of fs.readdirSync(root, { withFileTypes: true })) {
          if (!folder.isDirectory() || !/^MySQL|MariaDB/i.test(folder.name)) continue;
          const direct = path.join(root, folder.name, 'bin', 'mysql.exe');
          if (fs.existsSync(direct)) candidates.push(direct);
        }
      } catch (_) {}
    }
  }
  return candidates.find((candidate) => fs.existsSync(candidate)) || '';
});
ipcMain.handle('mysql:pick-executable', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'MySQL executable', extensions: ['exe'] }] });
  return result.canceled ? '' : result.filePaths[0];
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
