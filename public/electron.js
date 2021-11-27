const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require("electron-is-dev");

let mainWindow;
// let splash;

function createWindow() {
    const iconPath=isDev? path.join(__dirname,"notesLogo.png"): path.join(__dirname,"../build/notesLogo.png")
    const startUrl = isDev? "http://localhost:3000": `file://${path.join(__dirname, "../build/index.html")}`
    console.log(startUrl);
    mainWindow = new BrowserWindow({
        width: 900,
        height: 715,
        webPreferences: {
            spellcheck: false,
            nodeIntegration: true,
        },
        show: false,
        backgroundColor: '#f5f5f5',
        icon: iconPath,
    });
    // splash = new BrowserWindow({
    //     width: 900,
    //     height: 715,
    //     transparent: true,
    // })
    // splash.setMenuBarVisibility(false)
    // splash.loadURL(__dirname + '/icon.html');
    mainWindow.setMenuBarVisibility(false);
    mainWindow.setBackgroundColor('#f5f5f5')
    mainWindow.loadURL(startUrl);
    mainWindow.once('ready-to-show', () => {
        // splash.destroy();
        mainWindow.show();
    })
    mainWindow.on('closed', () => {
        // eslint-disable-next-line no-unused-expressions
        mainWindow == null;
    });
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('ready', createWindow);