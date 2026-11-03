// Small, safe bridge between the desktop app (main.js) and the web pages.
// Only exposes the screen-share picker, "show the window" and app updates - pages can't touch anything else.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('aeroDesktop', {
  // main.js asks the page to show its screen/window picker
  onPickScreenSource: callback => {
    ipcRenderer.on('pick-screen-source', (_event, sources) => callback(sources));
  },
  // the page answers with the chosen source id (or null if cancelled)
  chooseScreenSource: sourceId => ipcRenderer.send('screen-source-chosen', sourceId),
  // bring the window back from the tray (e.g. when a notification is clicked)
  showWindow: () => ipcRenderer.send('show-window'),

  // App updates: { state: 'none' | 'available' | 'downloading' | 'ready', version, percent }
  getUpdateStatus: () => ipcRenderer.invoke('get-update-status'),
  onUpdateStatus: callback => {
    ipcRenderer.on('update-status', (_event, status) => callback(status));
  },
  installUpdate: () => ipcRenderer.send('install-update')
});
