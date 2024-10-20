const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  screen,
  ipcMain,
  Notification,
  shell,
} = require("electron");
const path = require("node:path");
const fs = require("fs");
const regedit = require("regedit");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");
const crypto = require("crypto");
const http = require("http");
const os = require("os");
const { exec } = require("child_process");
const { randomInt } = require("node:crypto");

const spoop_eyes = [
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0xf0, 0x00, 0x07, 0xff,
  0xff, 0xff, 0xff, 0xc0, 0x00, 0x0f, 0x80, 0x00, 0x00, 0x00, 0x00, 0x01, 0xf0,
  0x00, 0x07, 0xff, 0xff, 0xff, 0xff, 0xc0, 0x00, 0x0f, 0x80, 0x00, 0x00, 0x00,
  0x00, 0x01, 0xf0, 0x00, 0x07, 0xff, 0xff, 0xff, 0xff, 0xc0, 0x00, 0x0f, 0x80,
  0x00, 0x00, 0x00, 0x00, 0x01, 0xf0, 0x00, 0x07, 0xff, 0xff, 0xff, 0xff, 0xc0,
  0x00, 0x0f, 0x80, 0x00, 0x00, 0x00, 0x00, 0x01, 0xf0, 0x00, 0x07, 0xff, 0xff,
  0xff, 0xff, 0xc0, 0x00, 0x0f, 0x80, 0x00, 0x00, 0x00, 0x00, 0x01, 0xf0, 0x00,
  0x07, 0xff, 0xff, 0xff, 0xff, 0xc0, 0x00, 0x0f, 0x80, 0x00, 0x00, 0x00, 0x00,
  0x01, 0xf0, 0x00, 0x07, 0xff, 0xff, 0xff, 0xff, 0xc0, 0x00, 0x0f, 0x80, 0x00,
  0x00, 0x00, 0x00, 0x01, 0xf0, 0x00, 0x07, 0xff, 0xff, 0xff, 0xff, 0xc0, 0x00,
  0x0f, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
];

// Configure logging
log.transports.file.level = "info";
autoUpdater.logger = log;
autoUpdater.autoDownload = false; // Disables auto downloading of any available updates.
autoUpdater.autoInstallOnAppQuit = false; // Disables auto updating after app restart.

function getUserName(callback) {
  exec(
    'wmic useraccount where name="%username%" get fullname',
    (error, stdout, stderr) => {
      if (error || stderr) {
        console.warn(
          `Failed to get full name, falling back to basic username: ${
            error || stderr
          }`
        );
        const userInfo = os.userInfo();
        callback(userInfo.username);
      } else {
        const lines = stdout.split("\n");
        const fullName = lines.length > 1 ? lines[1].trim() : null;
        if (fullName) {
          const firstName = fullName.split(" ")[0];
          callback(firstName);
        } else {
          const userInfo = os.userInfo();
          callback(userInfo.username);
        }
      }
    }
  );
} // gets the current windows user account name.

function getDefaultGateway(callback) {
  if (typeof callback !== "function") {
    throw new Error("Callback must be a function");
  }

  const platform = process.platform;

  let command;
  if (platform === "win32") {
    command = "route print";
  } else if (platform === "linux" || platform === "darwin") {
    command = "ip route | grep default";
  } else {
    return callback(new Error("Unsupported platform"));
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return callback(error);
    }

    // Log raw output for debugging
    console.log("Raw output:", stdout);
    console.log("Raw error output:", stderr);

    let gateway;
    if (platform === "win32") {
      // Improved regex to correctly capture the default gateway IP
      const match = stdout.match(
        /0\.0\.0\.0\s+0\.0\.0\.0\s+(\d+\.\d+\.\d+\.\d+)/
      );
      gateway = match ? match[1] : null;
    } else {
      const match = stdout.match(/default via (\d+\.\d+\.\d+\.\d+)/);
      gateway = match ? match[1] : null;
    }

    callback(null, gateway);
  });
}

// Initialize electron-reload with the directory to watch for changes
//electronReload(__dirname);

let win;
let tray;
let moveModeEnabled = false;
let isDragging = false;
let offset = { x: 0, y: 0 };
var firstRun = true;
var autoRun = true;
const appVersion = app.getVersion();
const userDataPath = app.getPath("userData");
var username;
const gotTheLock = app.requestSingleInstanceLock();

getUserName((usrname) => {
  console.log(`User's name: ${usrname}`);
  username = usrname;
});

if (!gotTheLock) {
  app.quit();
} // If a instance is already running of the program, kill the current program.

// modify your existing createWindow() function
const createWindow = () => {
  win = new BrowserWindow({
    width: 260,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
    parent: BrowserWindow.getFocusedWindow(), // Set the main window as a child of the desktop window
    modal: true, // Ensure it behaves as a child window
    frame: false, // Optionally remove frame for aesthetic purposes
    skipTaskbar: true, // Don't show the window in the taskbar
    resizable: false, // Make window non-resizable
  });
  // Get the primary display's size
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Calculate the position of the window to be in the bottom right corner
  const windowWidth = win.getSize()[0];
  const windowHeight = win.getSize()[1];
  const x = width - windowWidth;
  const y = height - windowHeight;

  // Set the position of the window
  win.setPosition(x, y);

  win.loadFile(path.join(__dirname, "index.html"));

  // // Open DevTools in a separate window
  // const devToolsWindow = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     nodeIntegration: true,
  //
  //     webSecurity: false, // This will allow loading local resources but is not recommended for production
  //     allowRunningInsecureContent: true
  //   },
  // });
  // win.webContents.setDevToolsWebContents(devToolsWindow.webContents);
  // win.webContents.openDevTools({ mode: "detach" });

  // Create a tray icon
  const iconPath = path.join(__dirname, "icon.ico");
  tray = new Tray(iconPath);

  // Create a context menu for the tray icon
  const contextMenu = Menu.buildFromTemplate([
    { label: `Version ${appVersion}      `, enabled: false }, // Version label
    { type: "separator" }, // Separator
    { label: "      Quit", click: () => app.quit() }, // Quit option
  ]);

  // Set the context menu for the tray icon
  tray.setContextMenu(contextMenu);

  // Set the context menu for the tray icon
  tray.setContextMenu(contextMenu);

  // Toggle window visibility on left-click
  tray.on("click", () => {
    win.show();
  });

  win.on("closed", () => {
    win = null;
  });

  win.on("move", () => {
    isDragging = true;
  });

  win.on("resize", () => {
    isDragging = false;
  });

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("move-mode", moveModeEnabled);
    win.webContents.send("get-base-dir", __dirname);
    checkAndInitializeClientData().then((res) => {
      console.log("RES", res, res.firstRun);
      if (res.firstRun == false) {
        win.webContents.send("wipeTutorial");
        startGameLoop();
      } else {
        win.webContents.send("startTutorial", username);
        setFace("idle");
      }
    });
  });

  // Check for updates after creating the window
  autoUpdater.checkForUpdatesAndNotify();
};

ipcMain.on("base-dir", (event, baseDir) => {
  console.log("Base directory:", baseDir);
});

function toggleMoveMode(enabled) {
  moveModeEnabled = enabled;
  if (win) {
    win.webContents.send("move-mode", moveModeEnabled);
    if (moveModeEnabled) {
      win.setIgnoreMouseEvents(false);
    } else {
      win.setIgnoreMouseEvents(true);
    }
  }
}

ipcMain.on("toggle-move-mode", (event, enabled) => {
  toggleMoveMode(enabled);
});

ipcMain.on("drag-window", (event, { x, y }) => {
  if (win && !win.isDestroyed()) {
    win.setPosition(x, y, true);
  }
});

// Function to open the settings window and load settings.html
function openSettingsWindow() {
  win.loadFile("settings.html");
  win.show();
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  const clientData = checkAndInitializeClientData();
  if (clientData.firstRun) {
    setAutoRun();
  }
  syncTrayMenu();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    removePal();
  }
});

if (process.platform === "win32") {
  app.setAppUserModelId("Bullegachi");
}

// -----------------------
//    GAME LOOP CLASSES
// -----------------------

const byteToBase64 = (byte) => {
  const key =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let bytes = new Uint8Array(byte);
  let newBase64 = "";
  let currentChar = 0;
  for (let i = 0; i < bytes.length; i++) {
    // Go over three 8-bit bytes to encode four base64 6-bit chars
    if (i % 3 === 0) {
      // First Byte
      currentChar = bytes[i] >> 2; // First 6-bits for first base64 char
      newBase64 += key[currentChar]; // Add the first base64 char to the string
      currentChar = (bytes[i] << 4) & 63; // Erase first 6-bits, add first 2 bits for second base64 char
    }
    if (i % 3 === 1) {
      // Second Byte
      currentChar += bytes[i] >> 4; // Concat first 4-bits from second byte for second base64 char
      newBase64 += key[currentChar]; // Add the second base64 char to the string
      currentChar = (bytes[i] << 2) & 63; // Add two zeros, add 4-bits from second half of second byte
    }
    if (i % 3 === 2) {
      // Third Byte
      currentChar += bytes[i] >> 6; // Concat first 2-bits of third byte for the third base64 char
      newBase64 += key[currentChar]; // Add the third base64 char to the string
      currentChar = bytes[i] & 63; // Add last 6-bits from third byte for the fourth base64 char
      newBase64 += key[currentChar]; // Add the fourth base64 char to the string
    }
  }
  if (bytes.length % 3 === 1) {
    // Pad for two missing bytes
    newBase64 += `${key[currentChar]}==`;
  }
  if (bytes.length % 3 === 2) {
    // Pad one missing byte
    newBase64 += `${key[currentChar]}=`;
  }
  return newBase64;
};

class Enemy {
  constructor(serialized) {
    if (serialized != null) {
      this.deserialize(serialized);
    } else {
      this.boss = false;
      this.health = this.calculateHealth();
      this.ttk = this.calculateTimerValue();
      this.face = Math.floor(Math.random() * 5) + 1; // Skinwalker type shit
      this.name = this.generateName(this.face);
    }
  }
  calculateHealth() {
    this.health = 50;
    // Scaling health logarithmically based on attack with a wider range
    let scaledHealth = Math.log(attack) * 13 + (220 + Math.random() * 100);

    // Adding randomness to health
    var randomFactor = Math.random();
    if (randomFactor < 0.3) {
      // 30% chance to decrease health
      var decreaseFactor = Math.random() * 0.8 + 0.1; // Random fraction from 0.1 to 0.9
      scaledHealth *= decreaseFactor;
    } else if (randomFactor < 0.4) {
      // 10% chance to increase health
      var increaseFactor = Math.random() * 4 + 1; // Random factor from 1 to 5
      scaledHealth *= increaseFactor;
      this.boss = true;
    }
    // Update the character's health
    return Math.round(scaledHealth);
  }
  generateName(face) {
    const nameParts = {
      1: {
        prefixes: ["Balor", "Levith", "Aeron", "Pneumo", "Aerial"],
        suffixes: ["thrax", "zor", "gorn", "thus", "dor"],
      },
      2: {
        prefixes: ["Fizzar", "Canis", "Bubblor", "Colar", "Frothar"],
        suffixes: ["zark", "gon", "dar", "nix", "zor"],
      },
      3: {
        prefixes: ["Woden", "Hingor", "Knobar", "Peevor", "Framix"],
        suffixes: ["dor", "lock", "bane", "gorn", "guard"],
      },
      4: {
        prefixes: ["Brikor", "Wallon", "Mortar", "Stonox", "Blocen"],
        suffixes: ["guard", "hold", "shield", "fort", "barr"],
      },
      5: {
        prefixes: ["Petalus", "Stemix", "Budon", "Leafor", "Rooton"],
        suffixes: ["bloom", "flora", "thorn", "petal", "growth"],
      },
    };

    if (!nameParts[face]) {
      throw new Error("Invalid face. Must be a number between 1 and 5.");
    }

    const getRandomElement = (arr) =>
      arr[Math.floor(Math.random() * arr.length)];

    const { prefixes, suffixes } = nameParts[face];

    let name = "";
    let attempts = 0;

    while ((name.length > 10 || name.length === 0) && attempts < 10) {
      const prefix = getRandomElement(prefixes);
      const suffix = getRandomElement(suffixes);
      name = prefix + suffix;

      if (name.length <= 10) {
        return name;
      }

      attempts++;
    }

    // Truncate to a maximum of 10 characters after 10 failed attempts
    return name.substring(0, 10);
  }
  calculateTimerValue() {
    // Assume the player can click 4.5 times per second
    // Calculate the effective clicks per second based on click damage
    // Calculate the time required to reasonably kill the unit
    const timeToKill = Math.round(this.health / (4.7 * attack));

    // Ensure a minimum of 5 seconds
    return Math.max(timeToKill, 5);
  }
  serialize() {
    const bossFlag = this.boss ? 1 : 0;
    const nameEncoded = encodeURIComponent(this.name);
    const serialized = `${bossFlag}|${this.health}|${nameEncoded}|${Math.round(
      this.ttk
    )}|${this.face}`;
    return serialized;
  }

  deserialize(serialized) {
    const [bossFlag, health, nameEncoded, ttk, face] = serialized.split("|");
    this.boss = bossFlag === "1";
    this.health = parseInt(health, 10);
    this.name = decodeURIComponent(nameEncoded);
    this.ttk = parseInt(ttk, 10);
    this.face = parseInt(face, 10);
  }
}

// ---------------------------------
//        Pal HTTP Wrapper
// ---------------------------------

var palHungry = false;
var palX = 0; // default X position
var palY = 0; // default Y position

ipcMain.on("faceMovedX", (event, X) => {
  palX = X;
});

/**
 * Handles the idle animation state for the pal.
 */
function idleHandler() {
  if (palConnected) {
    if (palFaceUpdate + 3000 < Date.now()) {
      // its been longer than 3 seconds since the last face update, proceed with idle animation
      let i = getRandomValue(1, 2);
      switch (palFace) {
        case "idle":
          setFace("idle_blink");
          break;
        case "dead":
          setFace("dead_drool");
          break;
        case "angry":
          setFace("angry_symbol");
          break;
        case "happy_1":
          if (i == 1) {
            setFace("happy_1_blink");
          } else {
            setFace("happy_1_wink");
          }
          break;
        case "happy_2":
          if (i == 1) {
            setFace("happy_2_blink");
          } else {
            setFace("happy_2_wink");
          }
          break;
        case "sleep":
          setFace("sleep_zzz");
          break;
        case "sad":
          setFace("sad_tear");
          break;
      }
      // Sets the next time to do a idle animation between 5-18 seconds.
      palIdleInterval = setTimeout(idleHandler, getRandomValue(5, 18) * 1000);
    } else {
      // it has not been longer than 3 seconds since the last face update, wait another 3-5 seconds. *could make it the difference but it adds a randomness to it by not*
      palIdleInterval = setTimeout(idleHandler, getRandomValue(3, 5) * 1000);
    }
  } // Checks if pal is connected before doing all this bs.
} // Handles the idle animation states.

/**
 * Sets the face of the bulletpal ONLY if a pal is connected, otherwise does nothing.
 * @param {string} name id of the face as used internally by the bulletpal (`idle, idle_blink, etc`)
 */
function setFace(name) {
  console.log("palConnected ", palConnected);
  if (palConnected) {
    palFace = name;
    palFaceUpdate = Date.now();
    var req = http.request(
      `http://${palIP}:80/setemotion?emotion=${name}&x=${palX}&y=${palY}`,
      { method: "POST" },
      (res) => {
        res.on("data", (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        res.on("end", () => {
          console.log("No more data in response.");
          console.log("face set:", name);
        });
      }
    );
    req.on("error", (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.end();
  }
}
/**
 * Sets the face of the bulletpal ONLY if a pal is connected, otherwise does nothing.
 * @param {string} name id of the raw face image as used internally by the bulletpal (`idle, sleep_zzz_1, etc`)
 */
function setRawFace(name) {
  if (palConnected) {
    palFace = name;
    palFaceUpdate = Date.now();
    var req = http.request(
      `http://${palIP}:80/setrawemotion?emotion=${name}&x=${palX}&y=${palY}`,
      { method: "POST" },
      (res) => {
        res.on("data", (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        res.on("end", () => {
          console.log("No more data in response.");
          console.log("face set:", name);
        });
      }
    );
    req.on("error", (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    req.end();
  }
} // image byte array 128x64
/**
 * Displays a custom image through a provided byte array ONLY if a pal is connected, otherwise does nothing. `resolution= (128x64px)`
 * @param {Array} imageArr A byte array of the image. 0 = off, 1 = on.
 */
function setCustomFace(imageArray) {
  if (palConnected) {
    palFace = "custom";
    palFaceUpdate = Date.now();
    var imgBuffer = Buffer.from(imageArray);
    var imgBase64 = imgBuffer
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
    // console.log(imgBase64)
    // Create the JSON object with the Base64 encoded image data
    const postData = JSON.stringify({
      image: imgBase64,
    });
    console.log(postData);
    var req = http.request(
      `http://${palIP}:80/displayImage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          console.log("Response:", body);
          console.log("No more data in response.");
          console.log("Face set to custom.");
        });
      }
    );

    req.on("error", (e) => {
      console.error(`Problem with request: ${e.message}`);
    });

    // Write the data to the request body
    //console.log(postData)
    req.write(postData);
    req.end();
  }
}
function setFaceByHealth() {
  if (palHungry) {
    switch (health) {
      case 0:
        setFace("dead");
        break;
      case 1:
        setRawFace("sad_tear_hungry");
        break;
      case 2:
        setRawFace("sad_hungry");
        break;
      case 3:
        setRawFace("idle_hungry");
        break;
    }
  } else {
    switch (health) {
      case 0:
        setFace("dead");
        break;
      case 1:
        setRawFace("sad_tear_1");
        break;
      case 2:
        setFace("sad");
        break;
      case 3:
        setFace("idle");
        break;
    }
  }
}

// ----------------------------------
//           GAMEPLAY LOOP
// ----------------------------------

let food = 100; // Initial food value (percentage)
let health = 3; // Initial health value
let energy = 100; // Initial energy value (percentage)
let dead = false; // Initial state of whether the player Fis dead
let attack = 1; // Attack power per click.
let nextEnergyCost = 20; // Initial energy cost value.
let timeSpawned = new Date(); // Time the pal was spawned in at (useful for it being revived.)
let trackingIntervalId = null; // Global variable to store the interval ID
let palLevel = 1; // Current level of the pal (based on time spent alive)
let palLevelProgress = 0; // Current progress towards the next level (0-100)
let bullettime = false; // BulletTime flag (used for checking if BulletTime is enabled)
let bullettimeDateObj = null; // BulletTime Date MS representing the end time for the effect.
let heartChained = false; // Heartchain flag (used for checking if heartchain is enabled)
let palFace = "idle"; // The current pal face (for the bullet pal), used for the idle animation handler.
let palFaceUpdate = null; // The time of when the face was last updated, (used to prevent idle animations from being instantly played on face change.).
let palIdleInterval = null; // Storage for the idle animation interval (used so it can be cleared once a pal is dcd)
let battleBoxOpened = false;

// -----------------------------------
//            COMBAT LOOP
// -----------------------------------

var enemy = new Enemy(); // The enemy object that is for the current enemy.

// -----------------------------------

// Track food data
var foods = [
  { id: 1, name: "Orange", discovered: false, count: 0 },
  { id: 2, name: "Sweets", discovered: true, count: 3 },
  { id: 3, name: "Spice", discovered: false, count: 0 },
];

// Track item data
var items = [
  { id: 1, name: "Medkit", discovered: false, count: 0 },
  { id: 2, name: "BulletTime", discovered: false, count: 0 },
  { id: 3, name: "Soda", discovered: false, count: 0 },
  { id: 4, name: "Sword", discovered: false, count: 0 },
  { id: 5, name: "Lootbox", discovered: false, count: 0 },
  { id: 6, name: "HeartChain", discovered: false, count: 0 },
];

let foodDepletionTimeout; // Timeout for food depletion.
let healthCheckTimeout; // Timeout for health check.
let lastCallTime = 0; // Used to check if 1 second has passed for timer.

/**
 * Used to tick the bullettime clock consistently.
 * @returns {Boolean} `true` if time is passed, `false` if time has not.
 */
function hasSecondPassed() {
  const currentTime = Date.now();
  if (currentTime - lastCallTime >= 1000) {
    lastCallTime = currentTime;
    return true;
  }
  return false;
}

/**
 * Returns a random value inbetween 2 numbers.
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} A number inbetween the 2 provided numbers.
 */
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Initializes the entire game loop to start.
 */
function startGameLoop() {
  loadVariables(); // Load saved variables when the game starts
  // Save variables intermittently or before the program closes
  setInterval(saveVariables, 60000); // Save every minute
  app.on("before-quit", () => {
    removePal(true);
    //saveVariables();
    mainWindow = null;
    if (tray) {
      tray.destroy();
    }
  }); // Save before the program closes
  console.log(
    `Initial Variables states: Food: ${food} | Health: ${health} | Energy: ${energy} | Dead: ${dead}`
  );
  win.webContents.send("setStats", {
    health: health,
    food: food,
    energy: energy,
    attack: attack,
  });
  win.webContents.send("setFoods", foods);
  win.webContents.send("setItems", items);
  nextEnergyCost = getRandomValue(10, 25);
  win.webContents.send("initBattlebox");
  syncEnemy();
  trackPlayerProgress(timeSpawned);
  // if (enemy.health == 0) {
  //   console.log("enemy loaded dead.");
  // } else {

  //   timerTimeout = setInterval(() => {
  //     if (enemy.ttk > 0) {
  //       enemy.ttk--;
  //       syncEnemy();
  //     } else {
  //       // timer expired.
  //       win.webContents.send("timerDamage", health);
  //       clearInterval(timerTimeout);
  //     }
  //   }, 1000);
  // }
  setFaceByHealth();
  if (health == 0) {
    // Loaded as dead.
    dead = true;
    startDeath();
    disableTracking();
    console.log("pal loaded in dead.");
  }
  // Start food depletion loop
  foodDepletionTimeout = setTimeout(depleteFood, 3000); // Random time in seconds (5-15 minutes)
}

/**
 * Automatically depletes food for the pal and yields energy.
 *
 * `LOW` energy ==> Greater food consumption.
 *
 * `FULL` energy ==< Less food consumption.
 *
 * Energy yield is proportional to food consumed.
 */
function depleteFood() {
  if (!bullettime) {
    var foodDepleted;
    if (energy < 100) {
      foodDepleted = getRandomValue(3, 12); // Energy is low, consume more food to replenish.
    } else {
      foodDepleted = getRandomValue(1, 2); // Energy is full, consume a little food to survive.
    }
    // Random amount between 1-7%
    const timeSinceLastEat = getRandomValue(5, 15); // Random time in minutes (5-15 minutes)
    const multiplier = Math.random() < 0.25 ? timeSinceLastEat * 1.5 : 1;

    const foodToSubtract = Math.floor(foodDepleted * multiplier); // Convert food depletion to percentage
    const foodRound = Math.max(food - foodToSubtract, 0);
    food = foodRound;
    if (energy < 100) {
      console.log(foodToSubtract);
      energy = Math.min(100, foodToSubtract * 1.5);
    }
    syncStats();

    if (food == 0) {
      // Food has reached 0, start health check
      if (health === 0) {
        checkHealth();
      } else {
        healthCheckTimeout = setTimeout(checkHealth, 3000); // Random time in seconds (5-10 minutes)
        //healthCheckTimeout = setTimeout(checkHealth, getRandomValue(300000, 600000)); // Random time in seconds (5-10 minutes)
      }
    } else {
      // Continue food depletion loop
      foodDepletionTimeout = setTimeout(
        depleteFood,
        getRandomValue(300000, 900000)
      ); // Random time in seconds (5-15 minutes)
    }
  } else {
    // Continue food depletion loop
    foodDepletionTimeout = setTimeout(
      depleteFood,
      getRandomValue(300000, 900000)
    ); // Random time in seconds (5-15 minutes) }
  }

  // Function to check player's health
  function checkHealth() {
    if (health === 0) {
      // Player is dead
      if (heartChained == true) {
        console.log("heartchained active, reviving");
        // Heartchain is active, break it and restore health and energy.
        heartChained = false;
        win.webContents.send("disable_heartchain");
        energy = 100;
        health = 3;
        food = 100;
        dead = false;
        setTimeout(() => {
          syncStats();
          alivePal();
          foodDepletionTimeout = setTimeout(
            depleteFood,
            getRandomValue(300000, 900000)
          ); // Random time in seconds (5-15 minutes)
        }, 2800);
      } else {
        // Health has ran out and no heartchain is active, kill em.
        console.log("bullet ran out of health with no heartchain. killing");
        dead = true;
        startDeath();
      }
    } else {
      // Subtract 1 from health and restart food depletion loop
      health--;
      syncStats();
      if (health == 0) {
        foodDepletionTimeout = setTimeout(
          depleteFood,
          getRandomValue(3000, 30000)
        ); // Random time in seconds (5-15 minutes)
      } else {
        foodDepletionTimeout = setTimeout(
          depleteFood,
          getRandomValue(300000, 900000)
        ); // Random time in seconds (5-15 minutes)
      }
    }
  }
}

/**
 * Used to start the pal death sequence.
 */
function startDeath() {
  setFace("dead");
  food = 0;
  disableTracking();
  win.webContents.send("killPal", true);
  console.log("Bullet has died");
  clearTimeout(foodDepletionTimeout);
  clearTimeout(healthCheckTimeout);
  setFace("dead");
}
function alivePal() {
  win.webContents.send("alivePal", true);
  setFace("idle");
  console.log("Pal has alived");
}
/**
 * Wrapper for win.webContents. Syncs internal pal stats with UI.
 */
function syncStats() {
  win.webContents.send("setStats", {
    health: health,
    food: food,
    energy: energy,
    attack: attack,
  });
  if (food < 25) {
    palHungry = true;
  } else {
    palHungry = false;
  }
  setFaceByHealth();
}
/**
 * Wrapper for win.webContents. Syncs internal foods with UI.
 */
function syncFoods() {
  win.webContents.send("setFoods", foods);
}
/**
 * Wrapper for win.webContents. Syncs internal items with UI.
 */
function syncItems() {
  win.webContents.send("setItems", items);
}
/**
 * Wrapper for win.webContents. Syncs internal enemy with UI.
 */
function syncEnemy() {
  win.webContents.send("setEnemy", enemy);
}
/**
 * Wrapper for win.webContents. Syncs internal player level with UI.
 * @param {number} level The current player level.
 * @param {number} levelprog The current level progress. (0-100)
 */
function syncLevel(level, levelprog) {
  win.webContents.send("setLevel", { level: level, levelProgress: levelprog });
  palLevel = level;
  palLevelProgress = levelprog;
}

/**
 * Checks if the gameData.json file exists, if not it creates and populates it with default states.
 */
function ensureDataFileExists(flag) {
  const filePath = path.join(userDataPath, "gameData.json");
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }
  if (!fs.existsSync(filePath) || flag) {
    fs.writeFileSync(
      filePath,
      JSON.stringify({
        food: 100,
        health: 3,
        energy: 100,
        attack: 1,
        dead: false,
        timeSpawned: new Date(),
        palLevel: 1,
        palLevelProgress: 0,
        bullettime: false,
        bullettimeDateObj: null,
        heartChained: false,
        foods: [
          { id: 1, name: "Orange", discovered: false, count: 0 },
          { id: 2, name: "Sweets", discovered: true, count: 3 },
          { id: 3, name: "Spice", discovered: false, count: 0 },
        ],
        items: [
          { id: 1, name: "Medkit", discovered: false, count: 0 },
          { id: 2, name: "BulletTime", discovered: false, count: 0 },
          { id: 3, name: "Soda", discovered: false, count: 0 },
          { id: 4, name: "Sword", discovered: false, count: 0 },
          { id: 5, name: "Lootbox", discovered: false, count: 0 },
          { id: 6, name: "HeartChain", discovered: false, count: 0 },
        ],
        enemy: enemy.serialize(),
      })
    );
  }
}

// Path to the configuration file
const clientDataPath = path.join(app.getPath("userData"), "clientData.json");
// Registry key for auto-run
const runKey = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run";

/**
 * Checks if the clientData.json file exists, if not it creates and populates it.
 * @returns JSON object of the client data file.
 */
const checkAndInitializeClientData = () => {
  return new Promise((resolve) => {
    let clientData = { firstRun: false, autoRun: true, palConnected: false };

    // Check if the file exists
    if (fs.existsSync(clientDataPath)) {
      // Read the existing file
      const data = fs.readFileSync(clientDataPath);
      clientData = JSON.parse(data);
      firstRun = clientData.firstRun;
      autoRun = clientData.autoRun;
      palConnected = clientData.palConnected;
      if (palConnected) {
        connectPal();
      }
      syncTrayMenu();
      resolve(clientData);
    } else {
      // Create the file with initial data
      fs.writeFileSync(clientDataPath, JSON.stringify(clientData, null, 2));
      firstRun = true;
      connectPal();
      setAutoRun();
      syncTrayMenu();
      saveClientData();
      resolve(clientData);
    }
  });
};

/**
 * Saves the client unique data (autoRun, firstRun) to the clientData.json file.
 */
const saveClientData = () => {
  fs.writeFileSync(
    clientDataPath,
    JSON.stringify(
      {
        firstRun,
        autoRun,
        palConnected,
      },
      null,
      2
    )
  );
};

/**
 * Sets the AutoRun registry key on the device and updates the tray menu.
 */
const setAutoRun = () => {
  if (autoRun == false) {
    const exePath = app.getPath("exe"); // Path to the app executable
    const appName = app.getName(); // Retrieve the name of the application
    const valuesToAdd = {
      [runKey]: {
        [appName]: {
          value: `"${exePath}"`,
          type: "REG_SZ",
        },
      },
    };

    regedit.putValue(valuesToAdd, (err) => {
      if (err) {
        console.error("Error adding registry entry:", err);
        syncTrayMenu();
      } else {
        console.log("Registry entry added successfully");
        autoRun = true;
        saveClientData();
        syncTrayMenu();
      }
    });
  } else {
    console.log("Unable to add registry entry, autoRun is true.");
  }
};

/**
 * Removes the AutoRun registry key from the device and updates the tray menu.
 */
const removeAutoRun = () => {
  const exePath = `"${app.getPath("exe")}"`; // Get the path to the app executable
  const appName = app.getName(); // Application name used as the key

  // First, remove from the normal Run registry key
  regedit.list(runKey, (err, result) => {
    if (err) {
      console.error("Error listing registry:", err);
      return;
    }

    const keys = result[runKey]?.values;
    let foundAndRemoved = false;

    if (keys) {
      Object.entries(keys).forEach(([key, valueObj]) => {
        if (valueObj.value.toLowerCase() === exePath.toLowerCase()) {
          regedit.deleteValue(`${runKey}\\${key}`, (err) => {
            if (err) {
              console.error(`Error deleting registry entry for ${key}:`, err);
            } else {
              console.log(`Registry entry deleted successfully for ${key}`);
              foundAndRemoved = true;
            }
          });
        }
      });
    } else {
      console.log("No values found under", runKey);
    }

    // Now also delete from StartupApproved registry to reset Task Manager's disabled flag
    const startupApprovedKey = `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StartupApproved\\Run`;

    regedit.list(startupApprovedKey, (err, result) => {
      if (err) {
        console.error("Error listing StartupApproved registry:", err);
        return;
      }

      const approvedKeys = result[startupApprovedKey]?.values;

      if (approvedKeys && approvedKeys[appName]) {
        regedit.deleteValue(`${startupApprovedKey}\\${appName}`, (err) => {
          if (err) {
            console.error(
              `Error deleting StartupApproved entry for ${appName}:`,
              err
            );
          } else {
            console.log(
              `StartupApproved entry deleted successfully for ${appName}`
            );
          }
        });
      } else {
        console.log("No StartupApproved entry found for", appName);
      }
    });

    // Update autoRun status and sync tray menu after cleanup
    autoRun = false;
    saveClientData();
    syncTrayMenu();
  });
};

/**
 * Loads the gameData.json file into the appropriate variables.
 */
function loadVariables() {
  ensureDataFileExists(); // Ensure directory and file exist
  valChk().then((ress) => {
    if (ress) {
      const filePath = path.join(userDataPath, "gameData.json");
      try {
        const data = fs.readFileSync(filePath, "utf-8");
        const savedData = JSON.parse(data);
        food = savedData.food;
        health = savedData.health;
        energy = savedData.energy;
        attack = savedData.attack;
        dead = savedData.dead;
        timeSpawned = new Date(savedData.timeSpawned);
        palLevel = savedData.palLevel;
        palLevelProgress = savedData.palLevelProgress;
        foods = savedData.foods;
        items = savedData.items;
        enemy = new Enemy(savedData.enemy);
        bullettime = savedData.bullettime;
        bullettimeDateObj = new Date(savedData.bullettimeDateObj);
        heartChained = savedData.heartChained;
        if (bullettime == true) {
          console.log(
            "bullettime was previously activated, resuming.",
            bullettimeDateObj
          );
          let bteMs = bullettimeDateObj - Date.now();
          win.webContents.send("startBulletTime", bteMs);
          syncStats();
          syncItems();
          setTimeout(() => {
            win.webContents.send("stopBulletTime");
          }, bteMs); // Make this function wait until the end time of the effect before triggering.
        }
        if (heartChained == true) {
          win.webContents.send("activate_heartchain");
        }
        syncStats();
        syncItems();
        syncFoods();
        syncEnemy();
        syncLevel();
      } catch (err) {
        console.error("Error loading game data:", err);
      }
    } else {
      console.log("no crypto key found. resetting data...");
      ensureDataFileExists(true);
      syncStats();
      syncItems();
      syncFoods();
      syncEnemy();
      syncLevel();
      genChk();
    }
  });
}

/**
 * Saves the game state variables to the gameData.json file.
 */
function saveVariables() {
  const filePath = path.join(userDataPath, "gameData.json");
  var eSer = null; // Enemy serialized data.
  if (enemy) {
    eSer = enemy.serialize();
  } // Serializing the enemy data if an enemy is present.
  const gameData = {
    food,
    health,
    energy,
    attack,
    dead,
    timeSpawned,
    palLevel,
    palLevelProgress,
    foods,
    items,
    enemy: eSer,
    bullettime,
    bullettimeDateObj,
    heartChained,
  };
  try {
    fs.writeFile(filePath, JSON.stringify(gameData), () => {
      genChk();
      console.log("updated gameData.json");
    });
  } catch (err) {
    console.error("Error saving game data:", err);
  }
}

// -------------------------
//  Pal connection sequence
// -------------------------

var palConnected = false; // Used as a flag for checking whether to send HTTP traffic to a IP.
var palConnecting = false; // Used to prevent double running connection function.
var palIP = null; // Currently connected Pal's IP address. (populated once the connectPal() is called)
var palDevInterval = null; // Interval storage used to clear dev mode heartbeat interval when pal is dcd.

/**
 * Starts the discovery phase to connect to a local Pal (same WiFi).
 */

function tickHeartbeat(ip) {
  const interval = setInterval(() => {
    const url = `http://${ip}:80/heartbeat`;

    const req = http.get(url, (res) => {
      if (res.statusCode === 200) {
        console.log("heartbeat thumped");
      } else {
        console.log("error heartbeating", res);
      }
    });
    req.on("error", (e) => {
      console.log("error heartbeating2", e);
    });
    req.end();
  }, 4500);

  return interval;
}

function connectPal() {
  palConnecting = true;
  syncTrayMenu();
  // Define your IP range and scan
  const baseIp = "192.168.1"; // Networks base IP
  const start = 254; // Starting IP in the range
  const end = 2; // Ending IP in the range

  // Create an AbortController instance
  const abortController = new AbortController();
  const signal = abortController.signal;

  // Call the function and handle the result
  getDefaultGateway((err, gateway) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log("Default Gateway IP:", gateway);
    }
    // Function to check if an endpoint responds with a 200 status code
    function checkEndpoint(ip, callback) {
      const url = `http://${ip}:80/isPal`;

      const req = http.get(url, { signal }, (res) => {
        let data = "";

        // Collect response data
        res.on("data", (chunk) => {
          data += chunk;
        });

        // Check when response is fully received
        res.on("end", () => {
          if (res.statusCode === 200) {
            console.log(`200 ip found with isPal, ${ip}`);
            if (data.trim()) {
              // Check if the response has content
              console.log(`Device found at ${ip} : Supports /isPal. Content: `);
              callback(null, ip);
            } else {
              console.log(
                `Device found at ${ip} : /isPal endpoint returned empty content.`
              );
              callback(new Error(`Empty content from /isPal at ${ip}`));
            }
          } else {
            console.log(
              `Device found at ${ip} : Does not support /isPal (Status Code: ${res.statusCode})`
            );
            callback(new Error(`Failed with status code: ${res.statusCode}`));
          }
        });
      });

      req.on("error", (e) => {
        callback(e);
      });

      req.end();
    }

    // Function to scan a range of IPs
    function scanRange(baseIp, start, end, callback) {
      let pending = start - end + 1;
      let results = [];
      var found = false;

      for (let i = end; i <= start; i++) {
        const ip = `${baseIp}.${256 - i}`;
        // Check the /isPal endpoint
        if (ip != gateway) {
          if (!found) {
            checkEndpoint(ip, (err, foundIp) => {
              if (err) {
                console.error(`Error checking ${ip}:`, err.message);
              } else {
                console.log(`Device with /isPal found at ${foundIp}`);
                found = true;
                abortController.abort(); // Abort all remaining requests
                return callback(foundIp);
              }
            });
          }
        }
      }
    }

    scanRange(baseIp, start, end, (foundIp) => {
      if (!foundIp) {
        // BulletPal not found on the network. return a error visual.
        console.log("Scan complete. BulletPal found?: \x1b[31mFALSE\x1b[0m");
        palConnecting = false;
        palConnected = false;
        palIP = null;
        saveClientData();
        syncTrayMenu();
        new Notification({
          title: "Bullegachi",
          body: "Connect to Pal failed to connect. Unable to detect a Pal on your local network. Make sure you and the Pal are on the same network!",
        }).show();
      } else {
        // BulletPal found on network, proceed with setup.
        console.log(
          `Scan complete. BulletPal found?: \x1b[32mTRUE | ${foundIp}\x1b[0m`
        );
        palConnected = true;
        palConnecting = false;
        palIP = foundIp;
        saveClientData();
        syncTrayMenu();

        console.log(
          `Making a setdev request to: http://${palIP}:80/setdev?mode=dev`
        );
        var req = http.request(
          `http://${palIP}:80/setdev?mode=dev`,
          { method: "POST" },
          (res) => {
            if (res.statusCode === 200) {
              console.log("\x1b[32mPal connected successfully!\x1b[0m");
              palDevInterval = tickHeartbeat(palIP);
              idleHandler();
            } else {
              console.log(`Failed with status code: ${res.statusCode}`);
              palDevInterval = tickHeartbeat(palIP);
            }
          }
        );
        req.on("error", (e) => {
          console.log("err", e);
          palConnected = false;
          palConnecting = false;
          saveClientData();
          syncTrayMenu();
          console.log("err", e);
          new Notification({
            title: "Bullegachi",
            body: "Unable to connect to the BulletPal successfully, Try reconnecting or unplugging and plugging back in the Pal.",
          }).show();
        });
        req.end();
      }
    });
  });
}

/**
 * Removes the connected Pal from the software. (deletes the remembered IP and resets the auto-reconnect bool)
 */
function removePal(ind) {
  if (ind) {
    var req = http.request(
      `http://${palIP}/setdev?mode=default`,
      { method: "POST" },
      (res) => {
        if (res.statusCode === 200) {
          console.log("Pal mode set to default.");
        } else {
          console.log(`Failed with status code: ${res.statusCode}`);
        }
      }
    );
    req.on("error", (e) => {
      console.log("err", e);
    });
    req.end();
  }
  palConnected = false;
  palConnecting = true;
  saveClientData();
  syncTrayMenu();
  clearInterval(palDevInterval);
  var req = http.request(
    `http://${palIP}/setdev?mode=default`,
    { method: "POST" },
    (res) => {
      if (res.statusCode === 200) {
        console.log("Pal mode set to default.");
      } else {
        console.log(`Failed with status code: ${res.statusCode}`);
      }
    }
  );
  req.on("error", (e) => {
    console.log("err", e);
  });
  req.end();
  palIP = false;
  console.log("\x1b[31mPal disconnected successfully :(\x1b[0m");
  setTimeout(() => {
    palConnecting = false;
    syncTrayMenu();
  }, 5000); // Give the Pal time to display the disconnect effects or whatever shit fully.
}

/**
 * Synchronizes the windows tray menu with the current AutoRun state.
 */
function syncTrayMenu() {
  const autoRunLabel = autoRun ? "AutoRun - Enabled" : "AutoRun - Disabled";
  const palConnectLabel = palConnected ? "Pal - Connected" : "Connect to Pal";
  const contextMenu = Menu.buildFromTemplate([
    { label: `Version ${appVersion}      `, enabled: false }, // Version label
    { type: "separator" }, // Separator
    {
      label: palConnectLabel,
      click: palConnected ? removePal : connectPal,
      enabled: !palConnecting,
    },
    { label: autoRunLabel, click: autoRun ? removeAutoRun : setAutoRun },
    { label: "      Quit", click: () => app.quit() }, // Quit option
  ]);

  if (tray) {
    tray.setContextMenu(contextMenu);
  }
}

ipcMain.on("consume_food", (event, name) => {
  if (dead == false) {
    console.log("food consuming", name);
    if (food >= 100) {
      // Dont let the pal consume food if already full.
      win.webContents.send("food_full", true);
      console.log("food is already full.");
    } else {
      var x = 0;
      switch (name) {
        case "sweets":
          x = 1;
          break;
        case "orange":
          x = 0;
          break;
        case "spice":
          x = 2;
          break;
      }
      if (foods[x].count != 0) {
        p1();
      } else {
        p2();
      }
      function p1() {
        var worth = 0;
        switch (name) {
          case "sweets":
            foods[1].count = foods[1].count - 1;
            worth = getRandomValue(1, 4); // Sweets are worth 1-4% food per.
            break;
          case "orange":
            foods[0].count = foods[0].count - 1;
            worth = getRandomValue(7, 19); // Orange are worth 7-19% food per.
            break;
          case "spice":
            foods[2].count = foods[2].count - 1;
            worth = getRandomValue(5, 50); // Spice are worth 5-70% food per.
            break;
        }
        if (food == 0) {
          clearTimeout(healthCheckTimeout);
        }
        food += worth;
        if (food > 100) {
          food = 100;
        } // Makes sure food doesnt exceed 100%.
        popupFoodStat(worth);
        syncStats();
        syncFoods();
        saveVariables();
      }
      function p2() {
        // If you have no food to eat.
        console.log(`no ${name} to eat.`);
      }
    }
  } else {
    // Bullet is dead. do not allow food consumption.
    win.webContents.send("food_dead", true);
    console.log("bullet is already dead.");
  }
});

/**
 * Wrapper for win.webContents
 * @param {number} int The number of food % to display as a popup.
 */
function popupFoodStat(int) {
  console.log("food popup sent.");
  win.webContents.send("food_popup", int);
}

ipcMain.on("consume_item", (event, name) => {
  if (dead == false) {
    console.log("consuming item.");
    var x = 0; // Defaults to Medkit
    switch (name) {
      case "medkit":
        break;
      case "bullettime":
        x = 1;
        break;
      case "soda":
        x = 2;
        break;
      case "sword":
        x = 3;
        break;
      case "lootbox":
        x = 4;
        break;
      case "heartchain":
        x = 5;
        break;
    }
    if (items[x].count != 0) {
      p1();
    } else {
      p2();
    }
    function p1() {
      // Process item effect.
      switch (name) {
        case "medkit":
          if (health == 3) {
            console.log("Unable to consume medkit as health is already full.");
            win.webContents.send("alertItem", "Medkit", true);
          } else {
            console.log("consuming medkit.");
            items[0].count = items[0].count - 1;
            health = 3;
            syncStats();
            syncItems();
            win.webContents.send("alertItem", "Medkit");
            saveVariables();
          }
          break;
        case "bullettime":
          if (bullettime) {
            console.log(
              "Unable to consume bullettime as bullettime is already active."
            );
            win.webContents.send("alertItem", "BulletTime", true);
          } else {
            console.log("consuming bullettime.");
            items[1].count = items[1].count - 1;
            bullettime = true; // Turns on bullettime.
            // Generate a random time offset between 30 minutes (1800000 ms) and 2 hours (7200000 ms)
            let rto = Math.random() * (7200000 - 1800000) + 1800000;
            bted = new Date(new Date().getTime() + rto); // bullet time end date object.
            bullettimeDateObj = bted.getTime(); // Set the end time for the BulletTime effect.
            let bteMs = bullettimeDateObj - Date.now();
            win.webContents.send("startBulletTime", bteMs);
            syncStats();
            syncItems();
            win.webContents.send("alertItem", "BulletTime");
            saveVariables();
            setTimeout(() => {
              win.webContents.send("stopBulletTime");
            }, bteMs); // Make this function wait until the end time of the effect before triggering.
          }
          break;
        case "soda":
          // Give the player a random amount of energy (100-370) (additive so this can be spammed to exceed energy limit of 100)
          items[2].count = items[2].count - 1;
          ren = getRandomValue(100, 370);
          energy += ren;
          console.log(`Soda consumed and gave: ${ren} energy.`);
          syncStats();
          syncItems();
          win.webContents.send("alertItem", "Soda");
          saveVariables();
          break;
        case "sword":
          // Gives the player a damage bonus per click permanently till death. (+1 additively)
          items[3].count = items[3].count - 1;
          attack += 1;
          console.log(`Attack power increased to: ${attack}`);
          syncStats();
          syncItems();
          win.webContents.send("alertItem", "Sword");
          saveVariables();
          break;
        case "lootbox":
          console.log("Rolling lootbox.");
          var id = getRandomValue(1, 9); // id of the drop (0-2 = food \ 3-8 = items)
          var ct = getRandomValue(1, 5);
          id = id - 1;
          if (id == undefined) {
            id = 1;
            ct = 13;
          }
          items[4].count = items[4].count - 1;
          win.webContents.send("roll_lootbox", [id, ct]);
          switch (id) {
            case 0:
            case 1:
            case 2:
              foods[id].count += ct;
              foods[id].discovered = true;
              break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
              items[id - 3].count += ct;
              items[id - 3].discovered = true;
              break;
            default:
              console.log("error, item id not valid:", id);
              break;
          }
          console.log(`lootbox id rolled: ${id} | ct: ${ct}`);
          syncItems();
          syncFoods();
          saveVariables();
          break;
        case "heartchain":
          if (heartChained) {
            console.log(
              "Unable to consume heartchain as a heartchain is already active."
            );
            win.webContents.send("alertItem", "Heartchain", true);
          } else {
            // Give the player heartchained.
            items[5].count = items[5].count - 1;
            heartChained = true;
            win.webContents.send("activate_heartchain");
            win.webContents.send("alertItem", "Heartchain");
            syncStats();
            syncItems();
            saveVariables();
          }
          break;
      }
    }
    function p2() {
      console.log(`no ${name}'s to consume.`);
    }
  } else {
    console.log("pal already dead.");
  }
});
// ---------------------
//      COMBAT LOOP
// ---------------------

var timerTimeout = null;
var lastSetAttackFaceTime = Date.now();

// ---------------------

ipcMain.on("battle-click", () => {
  console.log("battle-btn-clicked");
  if (enemy.health > 0) {
    enemy.health = Math.max(0, enemy.health - attack);
    syncEnemy();
    var currentTime = Date.now();
    var elapsedTime = currentTime - lastSetAttackFaceTime;
    console.log(`elapsed: ${elapsedTime}, last: ${lastSetAttackFaceTime}`);
    if (elapsedTime > 850) {
      setFace("angry_shake");
      console.log(true);
      lastSetAttackFaceTime = Date.now();
    }
    if (enemy.health === 0) {
      clearInterval(timerTimeout);
      win.webContents.send("killEnemy", enemy);
      setTimeout(() => {
        setFace("angry_symbol");
      }, 1000);
    }
    console.log("enemy values updated.");
  } else {
    console.log("enemy is already ded. dk how this happened.");
  }
});

ipcMain.on("itemDropped", (event, vars) => {
  console.log("item dropped", vars);
  // handle item drop.
  switch (vars[0]) {
    case 1:
      foods[0].count = foods[0].count + vars[1];
      foods[0].discovered = true;
      break;
    case 2:
      foods[1].count = foods[1].count + vars[1];
      foods[1].discovered = true;
      break;
    case 3:
      foods[2].count = foods[2].count + vars[1];
      foods[2].discovered = true;
      break;
    case 4:
      items[1].count = items[1].count + vars[1];
      items[1].discovered = true;
      break;
    case 5:
      items[4].count = items[4].count + vars[1];
      items[4].discovered = true;
      break;
    case 6:
      items[5].count = items[5].count + vars[1];
      items[5].discovered = true;
      break;
  }
  syncFoods();
  syncItems();
  syncStats();
  setFace("happy_1");
  saveVariables();
});

ipcMain.on("advanceEnemy", (event) => {
  if (energy >= nextEnergyCost || bullettime) {
    if (!bullettime) {
      energy = energy - nextEnergyCost;
    }
    nextEnergyCost = getRandomValue(10, 25);
    enemy = new Enemy();
    syncStats();
    setTimeout(() => {
      win.webContents.send("nextEnemy", enemy);
    }, 500);
  } else {
    win.webContents.send("neEnergy", `Energy required: ${nextEnergyCost}`);
  }
});

ipcMain.on("startTTK", (event) => {
  if (timerTimeout) {
    if (timerTimeout._destroyed) {
      timerTimeout = setInterval(() => {
        if (enemy.ttk > 0) {
          enemy.ttk--;
          syncEnemy();
        } else {
          // timer expired.
          clearInterval(timerTimeout);
          win.webContents.send("timerDamage", health);
          health = health - 1;
          syncStats();
          setFaceByHealth();
          if (health == 0) {
            if (heartChained == true) {
              console.log("heartchained active, reviving");
              // Heartchain is active, break it and restore health and energy.
              heartChained = false;
              win.webContents.send("disable_heartchain");
              energy = 100;
              health = 3;
              food = 100;
              dead = false;
              syncStats();
            } else {
              dead = true;
              startDeath();
              disableTracking();
              console.log("pal died in battle.");
            }
          }
        }
      }, 1000);
    }
  } else {
    timerTimeout = setInterval(() => {
      if (enemy.ttk > 0) {
        enemy.ttk--;
        syncEnemy();
      } else {
        // timer expired.
        win.webContents.send("timerDamage", health);
        clearInterval(timerTimeout);
      }
    }, 1000);
  }
});

ipcMain.on("startSacrifice", () => {
  if (dead) {
    log.info("Pal sacrifice started.");
    win.webContents.send("sacrificePal", palLevel);
    setTimeout(() => {
      food = 100;
      health = 3;
      energy = 100;
      dead = false;
      attack = 1;
      nextEnergyCost = 20;
      palLevel = 1;
      palLevelProgress = 0;
      enemy = new Enemy();
      // give the player a random amount of (5-7) sweets on reset to encourage a new attempt instead of the starting 3 sweets.
      foods = [
        { id: 1, name: "Orange", discovered: false, count: 0 },
        {
          id: 2,
          name: "Sweets",
          discovered: true,
          count: getRandomValue(5, 7),
        },
        { id: 3, name: "Spice", discovered: false, count: 0 },
      ];
      items = [
        { id: 1, name: "Medkit", discovered: items[0].discovered, count: 0 },
        {
          id: 2,
          name: "BulletTime",
          discovered: items[1].discovered,
          count: 0,
        },
        { id: 3, name: "Soda", discovered: items[2].discovered, count: 0 },
        { id: 4, name: "Sword", discovered: items[3].discovered, count: 0 },
        { id: 5, name: "Lootbox", discovered: items[4].discovered, count: 0 },
        {
          id: 6,
          name: "HeartChain",
          discovered: items[5].discovered,
          count: 0,
        },
      ];
      syncItems();
      console.log("Reset all variables to default values.");
    }, 1500);
  } else {
    log.info("Pal is not dead, unable to sacrifice.");
  }
});

ipcMain.on("endSacrifice", () => {
  console.log("Sacrifice ended. resetting and starting all timers/trackers...");
  timeSpawned = new Date();
  trackingIntervalId = null;
  trackPlayerProgress(timeSpawned);
  foodDepletionTimeout = setTimeout(depleteFood, 3000); // Random time in seconds (5-15 minutes)
  saveVariables();
  saveClientData();
  enemy = new Enemy();
  syncFoods();
  syncItems();
  syncLevel();
  syncStats();
  syncEnemy();
});

/**
 * Automatically tracks player level and updates the visual bar accordingly.
 * @param {number} timeSpawned A Date objects time converted into milliseconds of when the pal was first alive
 */
function trackPlayerProgress(timeSpawned) {
  // Function to announce the level up
  function levelUp(newLevel) {
    console.log(`Congratulations! You have reached level ${newLevel}.`);
    syncLevel(newLevel, 0);
    win.webContents.send("levelUp", newLevel);
  }

  // Function to synchronize the level progress
  function levelSync(level, percentToNextLevel) {
    console.log(`You are ${percentToNextLevel}% of the way to the next level.`);
    syncLevel(level, percentToNextLevel);
  }

  // Function to calculate the players level and progress.
  function calculateLevel(minutesAlive) {
    let level = 1;
    let minutesToNextLevel = 30; // initial increment is 30 minutPaes
    let totalMinutes = 0;

    while (minutesAlive >= totalMinutes + minutesToNextLevel) {
      totalMinutes += minutesToNextLevel;
      level++;
      if (minutesToNextLevel < 360) {
        minutesToNextLevel += 30;
      } else {
        minutesToNextLevel = 360;
      }
    }

    // Calculate how far we are into the current level
    let minutesInCurrentLevel = minutesAlive - totalMinutes;
    let percentToNextLevel = Math.floor(
      (minutesInCurrentLevel / minutesToNextLevel) * 100
    );

    return { level, percentToNextLevel };
  }

  // Function to calculate time alive and manage the level progression
  function updateProgress() {
    let now = new Date();
    let timeAliveMs = now - timeSpawned; // calculate time alive in milliseconds
    let timeAliveMinutes = Math.floor(timeAliveMs / 60000); // convert milliseconds to minutes

    let { level, percentToNextLevel } = calculateLevel(timeAliveMinutes);

    if (level !== currentLevel) {
      currentLevel = level;
      levelUp(currentLevel);
    }

    levelSync(level, percentToNextLevel);
  }

  // Clear any existing interval
  if (trackingIntervalId !== null) {
    clearInterval(trackingIntervalId);
    trackingIntervalId = null;
  }

  // Reset current level
  let currentLevel = 1;

  // Start the tracking
  updateProgress();
  trackingIntervalId = setInterval(updateProgress, 60000); // 60000 milliseconds = 1 minute
}

/**
 * Disables automatically player progress tracking and visual bar updating.
 * mainly used for the sacrifice routine.
 */
function disableTracking() {
  if (trackingIntervalId !== null) {
    clearInterval(trackingIntervalId);
    trackingIntervalId = null;
    console.log("Tracking has been disabled.");
  }
}

ipcMain.on("tutorialEnded", () => {
  startGameLoop();
  console.log("Tutorial ended, starting game loop.");
  firstRun = false;
  saveClientData();
});

ipcMain.on("battleBoxStarted", () => {
  if (battleBoxOpened == false) {
    battleBoxOpened = true;
    console.log("battlebox has been started by the user.");
    if (enemy.health == 0) {
      console.log("enemy loaded dead.");
    } else {
      timerTimeout = setInterval(() => {
        if (enemy.ttk > 0) {
          enemy.ttk--;
          syncEnemy();
        } else {
          // timer expired.
          win.webContents.send("timerDamage", health);
          clearInterval(timerTimeout);
        }
      }, 1000);
    }
  }
});

ipcMain.on("open-external", (event, url) => {
  shell.openExternal(url);
});

ipcMain.on("tutorialAdvanced", (event, id) => {
  switch (id) {
    case 2:
      setCustomFace(spoop_eyes);
      break;
    case 4:
      setTimeout(() => {
        setFace("happy_2");
      }, 2500);
      break;
    case 7:
      setFace("dead");
      break;
    case 8:
      setRawFace("sad_tear_1");
      break;
    case 9:
      setFace("angry");
      break;
    case 10:
      setFace("happy_2");
      break;
    case 19:
      setRawFace("happy_2_blink");
      break;
    case 20:
      setCustomFace(spoop_eyes);
      break;
  }
});

// ------------------------
//    Auto-updater Events
// ------------------------

ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});

ipcMain.on("updateConfirmed", (resetSave) => {
  if (resetSave) {
    fs.unlink(`${userDataPath}/pal.bgh`, (err) => {
      if (err) {
        console.log(`failed to delete pal.bgh during saveReset`, err);
      }
      console.log("Successfully deleted pal.bgh");
      fs.unlink(`${userDataPath}/gameData.json`, (err)=>{
        if (err) {
          console.log(`failed to delete gameData.json during saveReset.`, err);
        }
        console.log("Successfully deleted gameData.json");
        fs.unlink(`${userDataPath}/clientData.json`, (err)=>{
          if (err) {
            console.log(`failed to delete clientData.json during saveReset.`, err);
          }
          console.log("Successfully deleted clientData.json");
          autoUpdater.quitAndInstall();
        })
      })
    });
  } else {
    setTimeout(() => {
      autoUpdater.quitAndInstall();
    }, 500);
  }
});

autoUpdater.on("update-available", (info) => {
  log.info("Update available:", info);
  win.webContents.send("update-available", info);
});

autoUpdater.on("update-downloaded", (info) => {
  log.info("Update downloaded:", info);
  win.webContents.send("update-downloaded", info);
  // setTimeout(() => {
  //   autoUpdater.quitAndInstall();
  // }, 4500);
});

autoUpdater.on("download-progress", (info) => {
  win.webContents.send("updateProgress", info);
});

autoUpdater.on("error", (err) => {
  log.error("Error in auto-updater:", err);
  win.webContents.send("update-error", err);
});

// -------------------------------------------
//                Crypto shit
// -------------------------------------------
// may seem pointless but even the slightest
// inconvenience to cheat disuades most people
// (even if you can read the source code :p)

function genChk() {
  fs.readFile(`${userDataPath}/gameData.json`, (err, data) => {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    const hashedData = hash.digest("hex");
    fs.writeFile(`${userDataPath}/pal.bgh`, hashedData, (err) => {
      if (err) {
        console.log(`crypto write error, yep.`, err);
      }
      console.log("updated crypto key.");
    });
    return hashedData;
  });
}

function valChk() {
  return new Promise((resolve) => {
    fs.readFile(`${userDataPath}/pal.bgh`, (err, aData) => {
      if (err) {
        resolve(false);
      } else {
        const aHashData = String(aData);
        fs.readFile(`${userDataPath}/gameData.json`, (err, bData) => {
          if (err) {
            console.log("err");
            resolve(false);
          } else {
            const bHash = crypto.createHash("sha256");
            bHash.update(bData);
            const bHashData = bHash.digest("hex");
            console.log(aHashData, "|", bHashData);
            if (bHashData === aHashData) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        });
      }
    });
  });
}
