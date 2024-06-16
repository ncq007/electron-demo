const { app, BrowserWindow, BrowserView, ipcMain } = require('electron')
const path = require("path")

app.whenReady().then(() => {
  createWindow()
})

const createWindow = () => {
    return new Promise((resolve, reject) => {
        // Create the browser window.
        const mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
            },
            title: '测试',
            show: false,
            backgroundColor: 'pink'
        });

        const view = new BrowserView()
        mainWindow.setBrowserView(view)
        view.setBounds({ x: 0, y: 0, width: 800, height: 600 })
        view.webContents.loadFile('loading.html')
        view.webContents.on('dom-ready', () => {
            console.log('加载完成')
            mainWindow.show()
        })
        mainWindow.once('ready-to-show', () => {
            setTimeout(() => {
                console.log('完成')
                // mainWindow.removeBrowserView(view)
            }, 500);

        })
        ipcMain.on('stop-loading-main', () => {
            // mainWindow.removeBrowserView(view)
        })

        // and load the index.html of the app.
        // if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        //     mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
        // } else {
        //     mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
        // }



        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    });
};