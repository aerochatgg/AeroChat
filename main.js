const { app, BrowserWindow, session, desktopCapturer, ipcMain, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

// Name notifications and the tray balloon "AeroChat" instead of "Electron".
// On Windows the name comes from this ID, which must match build.appId in
// package.json (the installer registers the Start Menu shortcut under it).
app.setName('AeroChat');
if (process.platform === 'win32') app.setAppUserModelId('com.aerochat.app');

let mainWindow = null;
let tray = null;
let isQuitting = false;      // true only when the user really quits (tray menu, shutdown...)
let shownTrayHint = false;   // "still running in the tray" balloon, once per launch

// Only one AeroChat at a time - opening it again just brings the window back
const gotSingleInstanceLock = app.requestSingleInstanceLock();
if (!gotSingleInstanceLock) app.quit();
else app.on('second-instance', showWindow);

function showWindow() {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
}

function createTray() {
  const icon = nativeImage.createFromPath(path.join(__dirname, 'build', 'icon.png')).resize({ width: 16, height: 16 });
  tray = new Tray(icon);
  tray.setToolTip('AeroChat');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open AeroChat', click: showWindow },
    { type: 'separator' },
    { label: 'Quit AeroChat', click: () => { isQuitting = true; app.quit(); } }
  ]));
  tray.on('click', showWindow);
}

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
      preload: path.join(__dirname, 'preload.js'),
      // keep messages, calls and notifications running at full speed while hidden in the tray
      backgroundThrottling: false
    }
  });

  win.setMenuBarVisibility(false); // hides the default File/Edit/View menu bar for a cleaner app feel

  // Closing the window hides it to the tray instead of quitting
  win.on('close', e => {
    if (isQuitting) return;
    e.preventDefault();
    win.hide();
    if (!shownTrayHint && tray && process.platform === 'win32') {
      shownTrayHint = true;
      tray.displayBalloon({
        iconType: 'info',
        title: 'AeroChat is still running',
        content: 'It\'s down here in the tray. Right-click the icon to quit.'
      });
    }
  });

  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  mainWindow = win;
}

app.on('before-quit', () => { isQuitting = true; }); // e.g. Windows shutting down

// Clicking a message notification while hidden should bring the window back
ipcMain.on('show-window', showWindow);

app.whenReady().then(() => {
  if (!gotSingleInstanceLock) return; // this copy is closing - the other one was brought forward
  createWindow();
  createTray();

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
    else showWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
