const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mysqlBridge', {
  available: true,
  run: (payload) => ipcRenderer.invoke('mysql:run', payload),
  pickExecutable: () => ipcRenderer.invoke('mysql:pick-executable')
});
