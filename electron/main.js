const {app,BrowserWindow}=require('electron');
const path=require('path');
const url=require('url');

let mainWindow;

function createWindow(){
    const startUrl=process.env.ELECTRON_START_URL || url.format({
        pathname:path.join(__dirname+'../public/index.html'),
        protocol:'file:',
        slashes:true,
    });
    mainWindow=new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            spellcheck:false,
        }
    });
    mainWindow.setMenuBarVisibility(false);
    mainWindow.setBackgroundColor('#f5f5f5')
    mainWindow.loadURL(startUrl);
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