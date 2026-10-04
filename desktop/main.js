// TERRA Desktop: zeigt die Web-App aus ../dist in einem eigenen Fenster – komplett offline.
// Die App wird über das eigene Schema terra://app/ geladen. So bleiben relative Pfade (assets/…),
// ES-Module und der lokale Speicher (Notizen, Lernstand, Erdbeben-Archiv) zwischen den Starts stabil erhalten.
// Nur der aktuelle USGS-Erdbebenabruf benötigt Internet; ohne Verbindung greift der mitgelieferte Archivstand.
const { app, BrowserWindow, protocol, net, shell, Menu } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const ROOT = app.isPackaged ? path.join(process.resourcesPath, 'app') : path.join(__dirname, '..', 'dist');
const ORIGIN = 'terra://app';

protocol.registerSchemesAsPrivileged([{
  scheme: 'terra',
  privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true, allowServiceWorkers: true }
}]);

if (!app.requestSingleInstanceLock()) app.quit();

// Dieselben Schutz-Header wie beim Web-Hosting (dist/_headers), die dort der Server setzt.
const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https://earthquake.usgs.gov; worker-src 'self'; object-src 'none'; base-uri 'self'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
const MIME = { '.geojson': 'application/geo+json', '.webmanifest': 'application/manifest+json', '.mjs': 'text/javascript' };

async function serveFile(request) {
  const { pathname } = new URL(request.url);
  let rel = decodeURIComponent(pathname);
  if (rel === '/' || rel === '') rel = '/index.html';
  const file = path.normalize(path.join(ROOT, rel));
  // Nur Dateien innerhalb des App-Ordners ausliefern.
  if (!file.startsWith(ROOT + path.sep)) return new Response('Not found', { status: 404 });
  const response = await net.fetch(pathToFileURL(file).toString());
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) headers.set(key, value);
  const type = MIME[path.extname(file).toLowerCase()];
  if (type) headers.set('Content-Type', type);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// Nur sichere Adressarten an das Betriebssystem weitergeben.
function isAppURL(url) {try {const u=new URL(url);return u.protocol==='terra:' && u.hostname==='app';}catch{return false;}}

function openSafe(url) {
  try { if (['https:', 'http:', 'mailto:', 'tel:'].includes(new URL(url).protocol)) shell.openExternal(url); } catch {}
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 980, minHeight: 680,
    title: 'TERRA · Erdatlas', backgroundColor: '#f1f5f8', show: false, autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false }
  });
  win.once('ready-to-show', () => win.show());
  // Quellen-Links, USGS-Ereignisseiten und alles Fremde im Standardbrowser bzw. System öffnen.
  win.webContents.setWindowOpenHandler(({ url }) => { if (!isAppURL(url)) openSafe(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!isAppURL(url)) { e.preventDefault(); openSafe(url); } });
  win.loadURL(ORIGIN + '/');
}

app.on('second-instance', () => { const [w] = BrowserWindow.getAllWindows(); if (w) { if (w.isMinimized()) w.restore(); w.focus(); } });

app.whenReady().then(() => {
  protocol.handle('terra', serveFile);
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(Menu.buildFromTemplate([{ role: 'appMenu' }, { role: 'editMenu' }, { role: 'viewMenu' }, { role: 'windowMenu' }]));
  } else {
    Menu.setApplicationMenu(null);
  }
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
