const { app, BrowserWindow, session, desktopCapturer, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#6fc3f0',
    title: 'AeroChat',
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.setMenuBarVisibility(false); // hides the default File/Edit/View menu bar for a cleaner app feel

  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  mainWindow = win;
}

app.whenReady().then(() => {
  createWindow();

  // Explicitly allow microphone/camera access for calling — without this,
  // some Windows setups and any future macOS build can silently block it.
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowed = ['media', 'microphone', 'camera', 'notifications'];
    callback(allowed.includes(permission));
  });
  if (session.defaultSession.setDevicePermissionHandler) {
    session.defaultSession.setDevicePermissionHandler(() => true);
  }

  // Screen sharing: Electron has no built-in "choose a screen" popup like
  // browsers do, so we list the screens/windows here and let the page show
  // its own picker (see preload.js and the picker in dms.html).
  session.defaultSession.setDisplayMediaRequestHandler(async (request, callback) => {
    try {
      const sources = await desktopCapturer.getSources({
        types: ['screen', 'window'],
        thumbnailSize: { width: 320, height: 180 }
      });
      const chosenId = await new Promise(resolve => {
        ipcMain.once('screen-source-chosen', (_event, id) => resolve(id));
        mainWindow.webContents.send('pick-screen-source', sources.map(s => ({
          id: s.id,
          name: s.name,
          thumbnail: s.thumbnail.toDataURL()
        })));
      });
      const chosen = sources.find(s => s.id === chosenId);
      callback(chosen ? { video: chosen } : null);
    } catch (err) {
      callback(null);
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
