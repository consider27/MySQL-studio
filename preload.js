const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mysqlBridge', {
  available: true,
  run: (payload) => ipcRenderer.invoke('mysql:run', payload),
  findExecutable: () => ipcRenderer.invoke('mysql:find-executable'),
  pickExecutable: () => ipcRenderer.invoke('mysql:pick-executable')
});
