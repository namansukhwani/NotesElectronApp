const {app,BrowserWindow}=require('electron');
const path=require('path');
const url=require('url');

let mainWindow;
let splash;

function createWindow(){
    const startUrl=process.env.ELECTRON_START_URL || url.format({
        pathname:path.join(__dirname+'../public/index.html'),
        protocol:'file:',
        slashes:true,
    });
    mainWindow=new BrowserWindow({
        width:900,
        height:715,
        webPreferences:{
            spellcheck:false,
        },
        show:false,
        backgroundColor:'#f5f5f5',
    });
    splash=new BrowserWindow({
        width:900,
        height:715,
        transparent:true,
    })
    splash.setMenuBarVisibility(false)
    splash.loadURL(__dirname+'/icon.html');
    mainWindow.setMenuBarVisibility(false);
    mainWindow.setBackgroundColor('#f5f5f5')
    mainWindow.loadURL(startUrl);
    mainWindow.once('ready-to-show',()=>{
        splash.destroy();
        mainWindow.show();
    })
    mainWindow.on('closed',()=>{
        mainWindow==null;
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

app.on('ready',createWindow);