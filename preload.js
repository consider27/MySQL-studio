const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mysqlBridge', {
  available: true,
  run: (payload) => ipcRenderer.invoke('mysql:run', payload),
  startService: () => ipcRenderer.invoke('mysql:start-service'),
  findExecutable: () => ipcRenderer.invoke('mysql:find-executable'),
  pickExecutable: () => ipcRenderer.invoke('mysql:pick-executable')
});
