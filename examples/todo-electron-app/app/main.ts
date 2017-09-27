import * as is from "electron-is";
import { app, BrowserWindow } from "electron";

if (is.dev()) {
    process.env.NODE_ENV = "development";
} else {
    process.env.NODE_ENV = "production";
}

let mainWindow: Electron.BrowserWindow | null;

function onAppReady(): void {
    mainWindow = new BrowserWindow({ minHeight: 800, minWidth: 1200 });

    mainWindow.on("closed", onDispose);
    mainWindow.webContents.on('dom-ready', onDomReady);

    mainWindow.loadURL(`file://${__dirname}/renderer/views/index.html`);
    mainWindow.maximize();
}

function onDomReady(): void {
}

function onDispose(): void {
    app.removeAllListeners();
    if (mainWindow) {
        mainWindow.removeAllListeners();
        mainWindow = null;
    }
}

app.on("ready", onAppReady);