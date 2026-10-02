// Small, safe bridge between the desktop app (main.js) and the web pages.
// Only exposes the screen-share picker - pages can't touch anything else.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('aeroDesktop', {
  // main.js asks the page to show its screen/window picker
  onPickScreenSource: callback => {
    ipcRenderer.on('pick-screen-source', (_event, sources) => callback(sources));
  },
  // the page answers with the chosen source id (or null if cancelled)
  chooseScreenSource: sourceId => ipcRenderer.send('screen-source-chosen', sourceId)
});
