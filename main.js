const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn } = require('node:child_process');
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
ipcMain.handle('mysql:pick-executable', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'MySQL executable', extensions: ['exe'] }] });
  return result.canceled ? '' : result.filePaths[0];
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
