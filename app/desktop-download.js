// Where the desktop app downloads live (GitHub Releases - "latest" always
// points at the newest release, as long as the files keep these names).
// When a Mac build is attached to a release, fill in `mac`.
const DESKTOP_DOWNLOADS = {
  windows: 'https://github.com/aerochatgg/AeroChat/releases/latest/download/AeroChat-Setup.exe',
  mac: null // 'https://github.com/aerochatgg/AeroChat/releases/latest/download/AeroChat.dmg'
};

const IS_DESKTOP_APP = navigator.userAgent.toLowerCase().includes('electron');

// 'mac', 'windows', or 'other' (phones, Linux...)
function visitorPlatform() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return 'other';
  if (/Mac/i.test(ua)) return 'mac';
  if (/Windows/i.test(ua)) return 'windows';
  return 'other';
}

// What the download button should offer this visitor
function desktopDownloadFor() {
  const platform = visitorPlatform();
  if (platform === 'mac') {
    return DESKTOP_DOWNLOADS.mac
      ? { url: DESKTOP_DOWNLOADS.mac, label: 'for Mac' }
      : { url: null, label: 'Mac version coming soon' };
  }
  return { url: DESKTOP_DOWNLOADS.windows, label: 'for Windows' };
}
