const { app, BrowserWindow, Tray, Menu, screen, ipcMain, contextBridge } = require("electron");
const path = require("node:path");
const fs = require("fs");
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
//const electronReload = require("electron-reload");

// Configure logging
log.transports.file.level = 'info';
autoUpdater.logger = log;

// Initialize electron-reload with the directory to watch for changes
//electronReload(__dirname);

let win;
let tray;
let moveModeEnabled = false;
let isDragging = false;
let offset = { x: 0, y: 0 };

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

  win.loadFile("index.html");

  // Open DevTools in a separate window
  const devToolsWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.webContents.setDevToolsWebContents(devToolsWindow.webContents);
  win.webContents.openDevTools({ mode: "detach" });

  // Create a tray icon
  const iconPath = path.join(__dirname, "icon.png"); // Replace 'icon.png' with your actual icon file
  tray = new Tray(iconPath);

  // Get the app version
  const appVersion = app.getVersion();

  // Create a context menu for the tray icon
  const contextMenu = Menu.buildFromTemplate([
    { label: `Version ${appVersion}      `, enabled: false }, // Version label
    { type: "separator" }, // Separator
    { label: "   Settings", click: () => openSettingsWindow() }, // Settings option
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

  win.on('move', () => {
    isDragging = true;
  });

  win.on('resize', () => {
    isDragging = false;
  });

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('move-mode', moveModeEnabled);
    win.webContents.send('get-base-dir', __dirname);
    startGameLoop();
  });

   // Check for updates after creating the window
   autoUpdater.checkForUpdatesAndNotify();
};

ipcMain.on('base-dir', (event, baseDir) => {
  console.log('Base directory:', baseDir);
});

function toggleMoveMode(enabled) {
  moveModeEnabled = enabled;
  if (win) {
    win.webContents.send('move-mode', moveModeEnabled);
    if (moveModeEnabled) {
      win.setIgnoreMouseEvents(false);
    } else {
      win.setIgnoreMouseEvents(true);
    }
  }
}

ipcMain.on('toggle-move-mode', (event, enabled) => {
  toggleMoveMode(enabled);
});

ipcMain.on('drag-window', (event, { x, y }) => {
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
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// -----------------------
//    GAME LOOP CLASSES
// -----------------------

class Enemy {
  constructor(serialized) {
    if (serialized != null) {
      this.deserialize(serialized);
    } else {
      this.boss = false;
      this.health = this.calculateHealth();
      this.ttk = this.calculateTimerValue();
      this.name = this.generateName();
      this.face = Math.floor(Math.random() * 5) + 1; // Skinwalker type shit
    }
  }
  calculateHealth() {
    this.health = 50;
    // Scaling health logarithmically based on attack with a wider range
    let scaledHealth = (Math.log(attack) * 13) + (220 + Math.random() * 100);

    // Adding randomness to health
    var randomFactor = Math.random();
    if (randomFactor < 0.3) { // 30% chance to decrease health
      var decreaseFactor = Math.random() * 0.8 + 0.1; // Random fraction from 0.1 to 0.9
      scaledHealth *= decreaseFactor;
    } else if (randomFactor < 0.4) { // 10% chance to increase health
      var increaseFactor = Math.random() * 4 + 1; // Random factor from 1 to 5
      scaledHealth *= increaseFactor;
      this.boss = true;
    };
    // Update the character's health
    return (Math.round(scaledHealth));
  };
  generateName() {
    const themes = {
      weaponTitles: {
        titleParts1: ["Blaze", "Iron", "Steel", "Thunder", "Shadow"],
        titleParts2: ["Fury", "Edge", "Strike", "Blast", "Bolt"],
        nameParts1: ["Mord", "Gor", "Thal", "Rag", "Bor"],
        nameParts2: ["rek", "rim", "nak", "dor", "zak"]
      },
      weaponNames: {
        titleParts1: ["Sword", "Axe", "Dagger", "Bow", "Spear"],
        titleParts2: ["Master", "Wielder", "Bearer", "Hunter", "Slayer"],
        nameParts1: ["Snag", "Drak", "Claw", "Grim", "Spik", "Ar", "Bran", "Cael", "Drax", "Talon"],
        nameParts2: ["gle", "gor", "tak", "gle", "unk", "ion", "thor", "blade", "gore", "fire"]
      }
    };

    function getRandomElement(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    const themeKeys = Object.keys(themes);
    const selectedTheme = getRandomElement(themeKeys);
    const selectedParts = themes[selectedTheme];

    const title = getRandomElement(selectedParts.titleParts1) + getRandomElement(selectedParts.titleParts2);
    const name = getRandomElement(selectedParts.nameParts1) + getRandomElement(selectedParts.nameParts2);

    return (title + " " + name); // Sets the name of the enemy.
  };
  calculateTimerValue() {
    // Assume the player can click 4.5 times per second
    // Calculate the effective clicks per second based on click damage
    // Calculate the time required to reasonably kill the unit
    const timeToKill = Math.round((this.health / (4.7 * attack)));

    // Ensure a minimum of 5 seconds
    return (Math.max(timeToKill, 5));
  };
  serialize() {
    const bossFlag = this.boss ? 1 : 0;
    const nameEncoded = encodeURIComponent(this.name);
    const serialized = `${bossFlag}|${this.health}|${nameEncoded}|${Math.round(this.ttk)}|${this.face}`;
    return serialized;
  }

  deserialize(serialized) {
    const [bossFlag, health, nameEncoded, ttk, face] = serialized.split('|');
    this.boss = bossFlag === '1';
    this.health = parseInt(health, 10);
    this.name = decodeURIComponent(nameEncoded);
    this.ttk = parseInt(ttk, 10);
    this.face = parseInt(face, 10);
  }
};

// ----------------------------------
//           GAMEPLAY LOOP
// ----------------------------------

let food = 70; // Initial food value (percentage)
let health = 3; // Initial health value
let energy = 100; // Initial energy value (percentage)
let dead = false; // Initial state of whether the player Fis dead
let attack = 1; // Attack power per click.
let nextEnergyCost = 20; // Initial energy cost value.

// -----------------------------------
//            COMBAT LOOP
// -----------------------------------

var enemy = new Enemy(); // The enemy object that is for the current enemy.

// -----------------------------------

// Track food data
var foods = [
  { id: 1, name: 'Orange', discovered: false, count: 0 },
  { id: 2, name: 'Sweets', discovered: false, count: 1 },
  { id: 3, name: 'Spice', discovered: false, count: 0 }
];

// Track item data
var items = [
  { id: 1, name: 'Medkit', discovered: false, count: 0 },
  { id: 2, name: 'BulletTime', discovered: true, count: 0 },
  { id: 3, name: 'Soda', discovered: false, count: 0 },
  { id: 4, name: 'Sword', discovered: false, count: 0 },
  { id: 5, name: 'Chest', discovered: false, count: 0 },
  { id: 6, name: '?', discovered: false, count: 0 }
];

let foodDepletionTimeout; // Timeout for food depletion.
let healthCheckTimeout; // Timeout for health check.
let lastCallTime = 0; // Used to check if 1 second has passed for timer.

function hasSecondPassed() {
  const currentTime = Date.now();
  if (currentTime - lastCallTime >= 1000) {
    lastCallTime = currentTime;
    return true;
  }
  return false;
}

// Function to pick a random value between min and max
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function startGameLoop() {
  loadVariables(); // Load saved variables when the game starts
  // Save variables intermittently or before the program closes
  setInterval(saveVariables, 60000); // Save every minute
  app.on('before-quit', saveVariables); // Save before the program closes
  console.log(`Initial Variables states: Food: ${food} | Health: ${health} | Energy: ${energy} | Dead: ${dead}`)
  win.webContents.send('setStats', { "health": health, "food": food, "energy": energy, "attack": attack });
  win.webContents.send('setFoods', foods);
  win.webContents.send('setItems', items);
  nextEnergyCost = getRandomValue(10, 25);
  syncEnemy();
  if (enemy.health == 0) {
    console.log('enemy loaded dead.');
  } else {
    timerTimeout = setInterval(() => {
      if (enemy.ttk > 0) {
        enemy.ttk--;
        syncEnemy();
      } else {
        // timer expired.
        win.webContents.send('timerDamage', health);
        clearInterval(timerTimeout);
      }
    }, 1000);
  };
  if (health == 0) {
    // Loaded as dead.
    dead = true;
    startDeath();
  };

  // Function to handle food depletion
  function depleteFood() {
    var foodDepleted;
    if(energy < 100){
      foodDepleted = getRandomValue(3, 12); // Energy is low, consume more food to replenish.
    }else{
      foodDepleted = getRandomValue(1, 2); // Energy is full, consume a little food to survive.
    };
     // Random amount between 1-7%
    const timeSinceLastEat = getRandomValue(5, 15); // Random time in minutes (5-15 minutes)
    const multiplier = Math.random() < 0.25 ? timeSinceLastEat * 1.5 : 1;

    const foodToSubtract = Math.floor((foodDepleted * multiplier)); // Convert food depletion to percentage
    const foodRound = Math.max(food - foodToSubtract, 0);
    food = foodRound;
    if(energy < 100){
      console.log(foodToSubtract)
      energy = Math.min(100, (foodToSubtract * 1.5));
    };
    syncStats();

    if (food == 0) {
      // Food has reached 0, start health check
      if (health === 0) {
        checkHealth();
      } else {
        healthCheckTimeout = setTimeout(checkHealth, 3000); // Random time in seconds (5-10 minutes)
        //healthCheckTimeout = setTimeout(checkHealth, getRandomValue(300000, 600000)); // Random time in seconds (5-10 minutes)
      };
    } else {
      // Continue food depletion loop
      foodDepletionTimeout = setTimeout(depleteFood, getRandomValue(300000, 900000)); // Random time in seconds (5-15 minutes)
    }

    // Function to check player's health
    function checkHealth() {
      if (health === 0) {
        // Player is dead
        dead = true;
        startDeath();
      } else {
        // Subtract 1 from health and restart food depletion loop
        health--;
        syncStats();
        if (health == 0) {
          foodDepletionTimeout = setTimeout(depleteFood, getRandomValue(3000, 30000)); // Random time in seconds (5-15 minutes)
        } else {
          foodDepletionTimeout = setTimeout(depleteFood, getRandomValue(300000, 900000)); // Random time in seconds (5-15 minutes)
        };
      }
    }
  };
  // Start food depletion loop
  foodDepletionTimeout = setTimeout(depleteFood, 3000); // Random time in seconds (5-15 minutes)
  //foodDepletionTimeout = setTimeout(depleteFood, getRandomValue(300000, 900000)); // Random time in seconds (5-15 minutes)
};

// Function to start the death sequence
function startDeath() {
  food = 0;
  win.webContents.send('killPal', true);
  console.log("Bullet has died");
  clearTimeout(foodDepletionTimeout);
  clearTimeout(healthCheckTimeout);
};
function alivePal() {
  win.webContents.send('alivePal', true);
  console.log('Pal has alived');
  depleteFood();
};
function syncStats() {
  win.webContents.send('setStats', { "health": health, "food": food, "energy": energy, "attack": attack });
};
function syncFoods() {
  win.webContents.send('setFoods', foods);
};
function syncItems() {
  win.webContents.send('setItems', items);
};
function syncEnemy() {
  win.webContents.send('setEnemy', enemy);
};

// Function to ensure directory and file exist
function ensureDataFileExists() {
  const userDataPath = app.getPath('userData');
  const filePath = path.join(userDataPath, 'gameData.json');
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({
      food: 100, health: 3, energy: 100, attack: 1, dead: false, foods: [
        { id: 1, name: 'Orange', discovered: false, count: 0 },
        { id: 2, name: 'Sweets', discovered: true, count: 1 },
        { id: 3, name: 'Spice', discovered: false, count: 0 }
      ],
      items: [
        { id: 1, name: 'Medkit', discovered: false, count: 0 },
        { id: 2, name: 'BulletTime', discovered: false, count: 0 },
        { id: 3, name: 'Soda', discovered: false, count: 0 },
        { id: 4, name: 'Sword', discovered: false, count: 0 },
        { id: 5, name: 'Lootbox', discovered: false, count: 0 },
        { id: 6, name: 'HeartChain', discovered: false, count: 0 }
      ],
      enemy: enemy.serialize()
    }));
  }
}

// Function to load variables from file
function loadVariables() {
  ensureDataFileExists(); // Ensure directory and file exist
  const userDataPath = app.getPath('userData');
  const filePath = path.join(userDataPath, 'gameData.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const savedData = JSON.parse(data);
    food = savedData.food;
    health = savedData.health;
    energy = savedData.energy;
    attack = savedData.attack;
    dead = savedData.dead;
    foods = savedData.foods;
    items = savedData.items;
    enemy = new Enemy(savedData.enemy);
  } catch (err) {
    console.error('Error loading game data:', err);
  }
}

// Function to save variables to file
function saveVariables() {
  const userDataPath = app.getPath('userData');
  const filePath = path.join(userDataPath, 'gameData.json');
  var eSer = null; // Enemy serialized data.
  if (enemy) {
    eSer = enemy.serialize();
  }; // Serializing the enemy data if an enemy is present.
  const gameData = { food, health, energy, attack, dead, foods, items, enemy: eSer };
  try {
    fs.writeFileSync(filePath, JSON.stringify(gameData));
  } catch (err) {
    console.error('Error saving game data:', err);
  }
}

ipcMain.on('consume_food', (event, name) => {
  if (dead == false) {
    console.log("food consuming", name);
    if (food >= 100) {
      // Dont let the pal consume food if already full.
      win.webContents.send('food_full', true);
      console.log("food is already full.")
    }
    else {
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
      };
      if (foods[x].count != 0) {
        p1();
      } else {
        p2();
      }
      function p1() {
        var worth = 0;
        switch (name) {
          case "sweets":
            foods[1].count = (foods[1].count - 1);
            worth = getRandomValue(1, 4); // Sweets are worth 1-4% food per.
            break;
          case "orange":
            foods[0].count = (foods[0].count - 1);
            worth = getRandomValue(7, 19); // Orange are worth 7-19% food per. 
            break;
          case "spice":
            foods[2].count = (foods[2].count - 1);
            worth = getRandomValue(5, 50); // Spice are worth 5-70% food per.
            break;
        };
        if (food == 0) {
          clearTimeout(healthCheckTimeout);
        };
        food += worth;
        if (food > 100) {
          food = 100;
        }; // Makes sure food doesnt exceed 100%.
        popupFoodStat(worth);
        syncStats();
        syncFoods();
      };
      function p2() {
        // If you have no food to eat.
        console.log(`no ${name} to eat.`);
      }
    };
  } else {
    // Bullet is dead. do not allow food consumption.
    win.webContents.send('food_dead', true);
    console.log("bullet is already dead.")
  };
});

function popupFoodStat(int) {
  console.log('food popup sent.')
  win.webContents.send('food_popup', int);
};

// ---------------------
//      COMBAT LOOP
// ---------------------

var timerTimeout = null;

ipcMain.on('battle-click', () => {
  console.log('battle-btn-clicked');
  if (enemy.health > 0) {
    enemy.health--;
    syncEnemy();
    if (enemy.health === 0) {
      clearInterval(timerTimeout);
      win.webContents.send('killEnemy', enemy);
    };
    console.log("enemy values updated.");
  } else {
    console.log("enemy is already ded. dk how this happened.");
  };
});

ipcMain.on('itemDropped', (event, id) => {
  console.log('item dropped');
  // handle item drop.
  switch (id) {
    case 1:
      foods[0].count = (foods[0].count + 1);
      foods[0].discovered = true;
      break;
    case 2:
      foods[1].count = (foods[1].count + 1);
      foods[1].discovered = true;
      break;
    case 3:
      foods[2].count = (foods[2].count + 1);
      foods[2].discovered = true;
      break;
    case 4:
      items[1].count = (items[1].count + 1);
      items[1].discovered = true;
      break;
    case 5:
      items[4].count = (items[4].count + 1);
      items[4].discovered = true;
      break;
    case 6:
      items[5].count = (items[5].count + 1);
      items[5].discovered = true;
      break;
  };
  syncFoods();
  syncItems();
  syncStats();
});

ipcMain.on('advanceEnemy', (event) => {
  if (energy >= nextEnergyCost) {
    energy = (energy - nextEnergyCost);
    nextEnergyCost = getRandomValue(10, 25);
    enemy = new Enemy();
    syncStats();
    setTimeout(() => { win.webContents.send('nextEnemy', enemy); }, 500)
  } else {
    win.webContents.send('neEnergy', `Energy required: ${nextEnergyCost}`);
  }
});

ipcMain.on('startTTK', (event) => {
  if (timerTimeout) {
    if (timerTimeout._destroyed) {
      timerTimeout = setInterval(() => {
        if (enemy.ttk > 0) {
          enemy.ttk--;
          syncEnemy();
        } else {
          // timer expired.
          win.webContents.send('timerDamage', health);
          clearInterval(timerTimeout);
        }
      }, 1000);
    };
  } else {
    timerTimeout = setInterval(() => {
      if (enemy.ttk > 0) {
        enemy.ttk--;
        syncEnemy();
      } else {
        // timer expired.
        win.webContents.send('timerDamage', health);
        clearInterval(timerTimeout);
      }
    }, 1000);
  }
});

// ------------------------
//    Auto-updater Events
// ------------------------
// Auto-updater events
autoUpdater.on('update-available', (info) => {
  log.info('Update available:', info);
  mainWindow.webContents.send('update-available', info);
});

autoUpdater.on('update-downloaded', (info) => {
  log.info('Update downloaded:', info);
  mainWindow.webContents.send('update-downloaded', info);

  // Optionally prompt the user to install the update
  autoUpdater.quitAndInstall();
});

autoUpdater.on('error', (err) => {
  log.error('Error in auto-updater:', err);
  mainWindow.webContents.send('update-error', err);
});