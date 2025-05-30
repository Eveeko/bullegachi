const path = window.electronRequire("path");
var speechAudioBuffer;
var encounterStartAudioBuffer;
let speechAudioSlices = [];
let currentSpeechSliceIndex = 0;
const sliceDuration = 0.16;
// Move sfx buffers for combat.
var movePopSfxBuffer = null;
var movePopChargeSfxBuffer = null;
var moveWhipSfxBuffer = null;
var movePlayerPunchSfxBuffer = null;
var deathSfxBuffer = null;
var crySfxBuffer = null;
var fleeGlitchSfxBuffer = null;
// --- end of move sfx buffers ---
const scanlines = document.getElementById("scanlines");
const bPal = document.getElementById("bulletpal");
const bFace = document.getElementById("bFace");
const infoBtn = document.getElementById("infoBtn");
const foodBtn = document.getElementById("foodBtn");
const invBtn = document.getElementById("invBtn");
const battleBtn = document.getElementById("battleBtn");
const settingsBtn = document.getElementById("settingsBtn");
const hoverSound = document.getElementById("hoverSound");
const infoBox = document.getElementById("infoBox");
const infoHealth = document.getElementById("info_health");
const infoFood = document.getElementById("info_food");
const infoEnergy = document.getElementById("info_energy");
const foodBox = document.getElementById("foodBox");
const foodBoxThumb = document.getElementById("food_sidebar_thumb");
const foodIcon1 = document.getElementById("food_icon_1");
const foodIcon2 = document.getElementById("food_icon_2");
const foodIcon3 = document.getElementById("food_icon_3");
const foodCounter1 = document.getElementById("food_counter_1");
const foodCounter2 = document.getElementById("food_counter_2");
const foodCounter3 = document.getElementById("food_counter_3");
const popupFood = document.getElementById("popupFood");
const invBox = document.getElementById("inventoryBox");
const invIcon1 = document.getElementById("inv_icon_1");
const invIcon2 = document.getElementById("inv_icon_2");
const invIcon3 = document.getElementById("inv_icon_3");
const invIcon4 = document.getElementById("inv_icon_4");
const invIcon5 = document.getElementById("inv_icon_5");
const invIcon6 = document.getElementById("inv_icon_6");
const invCounter1 = document.getElementById("inv_counter_1");
const invCounter2 = document.getElementById("inv_counter_2");
const invCounter3 = document.getElementById("inv_counter_3");
const invCounter4 = document.getElementById("inv_counter_4");
const invCounter5 = document.getElementById("inv_counter_5");
const invCounter6 = document.getElementById("inv_counter_6");
const battleBox = document.getElementById("battleBox");
const foodWarn = document.getElementById("food_warn");
const moveBtn = document.getElementById("moveBtn");
const muteBtn = document.getElementById("muteBtn");
const settingsBox = document.getElementById("settingsBox");
const sacrificeBtn = document.getElementById("info_sacrifice");
const sidebar = document.getElementById("sidebar");
const nullEventVid = document.getElementById("nullEventVid");
const nullEventSfx = document.getElementById("nullEventSfx");
const dedpal_glitch_div = document.getElementById("dedpal_glitch");
const level = document.getElementById("info_level");
const levelIndicator = document.getElementById("info_levelProgFill");
const foodWarn2 = document.getElementById("food_warn_2");
const itemWarn = document.getElementById("item_warn_1");
const itemWarnCont = document.getElementById("item_warn_cont");
const bullettimeGlitch = document.getElementById("bullettime_glitch");
const bullettimeCont = document.getElementById("bullettime_cont");
const bullettimeTimer = document.getElementById("bullettime_timer");
const heartchain = document.getElementById("heartchain");
const heartchainSfx = document.getElementById("heartchainSound");
const heartchainSfx2 = document.getElementById("heartchainSound2");
const lootboxBG = document.getElementById("lootbox_background");
const lootbox = document.getElementById("lootbox");
const lootboxPointer = document.getElementById("lootbox_pointer");
const lootboxNextBtn = document.getElementById("lootbox-continue-btn");
const tutorialCont = document.getElementById("tutorialCont");
const tutorialNxtBtn = document.getElementById("tutorialNxtBtn");
const tutorialArrow = document.getElementById("tutorialArrow");
const tutorialH1 = document.getElementById("tutorialH1");
const tutorialSidebar = document.getElementById("tutorialSidebar");
const tutorialBackgroundSfx = document.getElementById("tutorialBackgroundSfx");
const updateNotes = document.getElementById("updateNotes");
const updateBtn = document.getElementById("updateBtn");
const updateBtnSkip = document.getElementById("updateBtnSkip");
const updateCont = document.getElementById("updateCont");
const updateLoading = document.getElementById("updateLoading");
const updateVer = document.getElementById("updateH1_1");
const updateResetSave = document.getElementById("updateResetSave");
const battleBoxSplash = document.getElementById("battleBox_splash");
const battleBoxSplashStart = document.getElementById("battleBox_splash_start");
const battleBoxSplashResume = document.getElementById("battleBox_splash_resume");
const battleBoxSplashH1_1 = document.getElementById("battleBox_splash_h1_1");
const battleBoxSplashH1_2 = document.getElementById("battleBox_splash_h1_2");
const playfield_grid = document.getElementById("playfield_grid");
const playfield_player = document.getElementById("playfield_player");
const map_controls_left = document.getElementById("map_controls_left");
const map_controls_right = document.getElementById("map_controls_right");
const map_controls_up = document.getElementById("map_controls_up");
const map_controls_down = document.getElementById("map_controls_down");
const map_controls_mask = document.getElementById("map_controls_mask");
const battleBox_intro_h1 = document.getElementById("battleBox_intro_h1");
const battleBox_intro_h1_2 = document.getElementById("battleBox_intro_h1_2");
const battleBox_intro_sprite_1 = document.getElementById("battleBox_intro_sprite_1");
const battleBox_intro_lineFlasher = document.getElementById("battleBox_intro_lineFlasher");
const speechSfx = document.getElementById("speechSfx");
const introCaveSfx = document.getElementById("introCaveSfx");
const intro_cave_start_btn = document.getElementById("intro_cave_start_btn");
const battle_tile_origin = document.getElementById("battle_tile_origin");
const playfield_encounterDiv = document.getElementById("playfield_encounterDiv");
const playfield_encounterPlayer = document.getElementById("playfield_encounterPlayer");
const playfield_encounterPlayer_name = document.getElementById("playfield_encounterPlayer_name");
const playfield_encounterPlayer_health = document.getElementById("playfield_encounterPlayer_health");
const playfield_encounterPlayer_sprite = document.getElementById("playfield_encounterPlayer_sprite");
const playfield_encounterPlayer_face = document.getElementById("playfield_encounterPlayer_face");
const playfield_encounterEnemy = document.getElementById("playfield_encounterEnemy");
const playfield_encounterEnemy_name = document.getElementById("playfield_encounterEnemy_name");
const playfield_encounterEnemy_health = document.getElementById("playfield_encounterEnemy_health");
const playfield_encounterEnemy_sprite = document.getElementById("playfield_encounterEnemy_sprite");
const playfield_globalContainer = document.getElementById("playfield_globalContainer");
const playfield_encounterControls_btn1 = document.getElementById("playfield_encounterControls_btn1");
const playfield_encounterControls_btn2 = document.getElementById("playfield_encounterControls_btn2");
const playfield_encounterControls_btn3 = document.getElementById("playfield_encounterControls_btn3");
const playfield_encounterControls_btn4 = document.getElementById("playfield_encounterControls_btn4");
const playfield_encounterControl_mask = document.getElementById("playfield_encounterControl_mask");
const playfield_encounterControls_exitBtn = document.getElementById("playfield_encounterControls_exitBtn");
const playfield_encounterPlayer_flee_h1 = document.getElementById("playfield_encounterPlayer_flee_h1");


var moveMode = false;
var isDragging = false;
let offset = { x: 0, y: 0 };
var __dirname = "";
var firstSetEnemy = true;
var health = 3; // bullet pals health.
var audioEnabled = true;
var infoOpen = false;
var sacking = false;

var moveFaceTimeout; // Used to store the timeout object so it can be cancelled.
var foods; // Used to store the foods obj
var items; // Used to store the items obj
var enemy; // Used to store the enemy obj

// Listen for the base directory path from the main process
window.electron.receive("get-base-dir", (baseDir) => {
  console.log("Base directory:", baseDir);
  __dirname = baseDir;
});

fetch("sfx/speech1.wav")
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(buffer => {
    speechAudioBuffer = buffer;
    console.log('SpeechSfx Audio buffer loaded:', speechAudioBuffer.duration, 'seconds');
    preloadAudioSlices();
  })
  .catch(error => console.error('Error loading SpeechSfx audio:', error));

function preloadAudioSlices() {
  const maxOffset = speechAudioBuffer.duration - sliceDuration;
  const sliceCount = 50; // Number of slices to preload

  speechAudioSlices = Array.from({ length: sliceCount }, () => Math.random() * maxOffset);
  currentSliceIndex = 0; // Reset the index when preloading
}

fetch("sfx/encounter_start.wav")
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(buffer => {
    encounterStartAudioBuffer = buffer;
    console.log('Encounter Start Audio buffer loaded:', encounterStartAudioBuffer.duration, 'seconds');
  }).catch(error => console.error('Error loading Encounter Start audio:', error));

fetch("sfx/enemy_1_pop.wav")
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(buffer => {
    movePopSfxBuffer = buffer;
    console.log('Move Pop Sfx Audio buffer loaded:', movePopSfxBuffer.duration, 'seconds');
  }).catch(error => console.error('Error loading Move Pop Sfx audio:', error));

fetch("sfx/enemy_1_pop_charge_sfx.wav")
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(buffer => {
    movePopChargeSfxBuffer = buffer;
    console.log('Move Pop Charge Sfx Audio buffer loaded:', movePopChargeSfxBuffer.duration, 'seconds');
  }).catch(error => console.error('Error loading Move Pop Charge Sfx audio:', error));

fetch("sfx/player_punch.wav")
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(buffer => {
    movePlayerPunchSfxBuffer = buffer;
    console.log('Move Player Punch Sfx Audio buffer loaded:', movePlayerPunchSfxBuffer.duration, 'seconds');
  }).catch(error => console.error('Error loading Move Player Punch Sfx audio:', error));

fetch("sfx/death_sfx.wav")
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(buffer => {
    deathSfxBuffer = buffer;
    console.log('Death Sfx Audio buffer loaded:', deathSfxBuffer.duration, 'seconds');
  }).catch(error => console.error('Error loading Death Sfx audio:', error));

fetch("sfx/cry_sfx.wav")
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(buffer => {
    crySfxBuffer = buffer;
    console.log('Cry Sfx Audio buffer loaded:', crySfxBuffer.duration, 'seconds');
  }).catch(error => console.error('Error loading Cry Sfx audio:', error));

fetch("sfx/flee_glitch_sfx.wav")
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(buffer => {
    fleeGlitchSfxBuffer = buffer;
    console.log('Flee Glitch Sfx Audio buffer loaded:', fleeGlitchSfxBuffer.duration, 'seconds');
  }).catch(error => console.error('Error loading Flee Glitch Sfx audio:', error));

fetch("sfx/enemy_1_whip.wav")
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(buffer => {
    moveWhipSfxBuffer = buffer;
    console.log('Move Whip Sfx Audio buffer loaded:', moveWhipSfxBuffer.duration, 'seconds');
  }).catch(error => console.error('Error loading Move Whip Sfx audio:', error));

function moveFace() {
  var left = bFace.style.getPropertyValue("left");
  // Move the div
  if (left == "24px") {
    bFace.style.left = "18px";
    window.electron.send("faceMovedX", -12);
  } else if (left == "18px") {
    bFace.style.left = "24px";
    window.electron.send("faceMovedX", 0);
  } else if (left == "30px") {
    bFace.style.left = "24px";
    window.electron.send("faceMovedX", 0);
  } else {
    bFace.style.left = "30px";
    window.electron.send("faceMovedX", 12);
  }
  // Set the next move after a random time between 2 and 9 seconds
  var randomTime = Math.floor(Math.random() * (13000 - 2000) + 2000); // Random time between 2 and 13 seconds in milliseconds
  moveFaceTimeout = setTimeout(moveFace, randomTime);
}

// Start moving the div
moveFaceTimeout = setTimeout(moveFace, 7000);

// Sidebar panel
// -------------

/**
 * plays the select sfx.
 */
function playSelectSfx() {
  if (audioEnabled) {
    hoverSound.currentTime = 0; // Rewind the sound to the beginning
    hoverSound.play(); // Play the sound
  }
}
/**
 * closes all panels except the provided panel.
 * 1 = foodBox, 2 = invBox, 3 = battleBox, 4 = settingBox
 * @param {number} selector used to select the panel to keep open. none = all get closed.
 */
function closeAnyOpenPanels(selector) {
  switch (selector) {
    case 1:
      infoBox.style.display = "none";
      infoBtn.style.backgroundImage = "";
      infoOpen = false;
      invBox.style.display = "none";
      invBtn.style.backgroundImage = "";
      battleBox.style.display = "none";
      battleBtn.style.backgroundImage = "";
      settingsBox.style.display = "none";
      settingsBtn.style.backgroundImage = "";
      break;
    case 2:
      infoBox.style.display = "none";
      infoBtn.style.backgroundImage = "";
      infoOpen = false;
      foodBox.style.display = "none";
      foodBtn.style.backgroundImage = "";
      battleBox.style.display = "none";
      battleBtn.style.backgroundImage = "";
      settingsBox.style.display = "none";
      settingsBtn.style.backgroundImage = "";
      break;
    case 3:
      infoBox.style.display = "none";
      infoBtn.style.backgroundImage = "";
      infoOpen = false;
      invBox.style.display = "none";
      invBtn.style.backgroundImage = "";
      foodBox.style.display = "none";
      foodBtn.style.backgroundImage = "";
      settingsBox.style.display = "none";
      settingsBtn.style.backgroundImage = "";
      break;
    case 4:
      infoBox.style.display = "none";
      infoBtn.style.backgroundImage = "";
      infoOpen = false;
      foodBox.style.display = "none";
      foodBtn.style.backgroundImage = "";
      invBox.style.display = "none";
      invBtn.style.backgroundImage = "";
      battleBox.style.display = "none";
      battleBtn.style.backgroundImage = "";
      break;
    case 5:
      foodBox.style.display = "none";
      foodBtn.style.backgroundImage = "";
      invBox.style.display = "none";
      invBtn.style.backgroundImage = "";
      battleBox.style.display = "none";
      battleBtn.style.backgroundImage = "";
      settingsBox.style.display = "none";
      settingsBtn.style.backgroundImage = "";
    default:
      foodBox.style.display = "none";
      foodBtn.style.backgroundImage = "";
      invBox.style.display = "none";
      invBtn.style.backgroundImage = "";
      battleBox.style.display = "none";
      battleBtn.style.backgroundImage = "";
  }
}
infoBtn.onmouseover = () => {
  if (infoOpen == false) {
    playSelectSfx();
    infoBox.style.display = "block";
    infoBtn.style.backgroundImage = `url("sprite/sprite_info_i.png")`;
  }
};
infoBtn.onmouseout = () => {
  if (infoOpen == false) {
    infoBox.style.display = "none";
    infoBtn.style.backgroundImage = `url("sprite/sprite_info.png")`;
  }
};
infoBtn.onmousedown = () => {
  if (infoOpen == false) {
    closeAnyOpenPanels(5);
    infoOpen = true;
    infoBox.style.display = "block";
    infoBtn.style.backgroundImage = `url("sprite/sprite_info.png")`;
    setTimeout(() => {
      infoBtn.style.backgroundImage = `url("sprite/sprite_info_i.png")`;
    }, 150);
  } else {
    infoOpen = false;
    infoBox.style.display = "none";
    infoBtn.style.backgroundImage = `url("sprite/sprite_info_i.png")`;
    setTimeout(() => {
      infoBtn.style.backgroundImage = `url("sprite/sprite_info.png")`;
    }, 150);
  }
  playSelectSfx();
};
foodBtn.onmouseover = () => {
  playSelectSfx();
};
foodBtn.onmousedown = () => {
  closeAnyOpenPanels(1);
  if (foodBox.style.display == "block") {
    foodBox.style.display = "none";
    foodBtn.style.backgroundImage = `url("sprite/sprite_food.png")`;
    setTimeout(() => {
      foodBtn.style.backgroundImage = "";
    }, 150);
  } else {
    foodBox.style.display = "block";
    foodBtn.style.backgroundImage = `url("sprite/sprite_food.png")`;
    setTimeout(() => {
      foodBtn.style.backgroundImage = `url("sprite/sprite_food_i.png")`;
    }, 150);
  }
  playSelectSfx();
};
invBtn.onmouseover = () => {
  playSelectSfx();
};
invBtn.onmousedown = () => {
  closeAnyOpenPanels(2);
  if (invBox.style.display == "block") {
    invBox.style.display = "none";
    invBtn.style.backgroundImage = `url("sprite/sprite_inv.png")`;
    setTimeout(() => {
      invBtn.style.backgroundImage = "";
    }, 150);
  } else {
    invBox.style.display = "block";
    invBtn.style.backgroundImage = `url("sprite/sprite_inv.png")`;
    setTimeout(() => {
      invBtn.style.backgroundImage = `url("sprite/sprite_inv_i.png")`;
    }, 150);
  }
  playSelectSfx();
};
battleBtn.onmouseover = () => {
  playSelectSfx();
};
battleBtn.onmousedown = () => {
  closeAnyOpenPanels(3);
  if (battleBox.style.display == "block") {
    battleBox.style.display = "none";
    battleBtn.style.backgroundImage = `url("sprite/sprite_battle.png")`;
    setTimeout(() => {
      battleBtn.style.backgroundImage = "";
    }, 150);
  } else {
    battleBox.style.display = "block";
    battleBtn.style.backgroundImage = `url("sprite/sprite_battle.png")`;
    setTimeout(() => {
      battleBtn.style.backgroundImage = `url("sprite/sprite_battle_i.png")`;
    }, 150);
  }
  playSelectSfx();
};
settingsBtn.onmouseover = () => {
  playSelectSfx();
};
settingsBtn.onmousedown = () => {
  closeAnyOpenPanels(4);
  if (settingsBox.style.display == "block") {
    settingsBox.style.display = "none";
    settingsBtn.style.backgroundImage = `url("sprite/sprite_settings.png")`;
    setTimeout(() => {
      settingsBtn.style.backgroundImage = "";
    }, 150);
  } else {
    settingsBox.style.display = "block";
    settingsBtn.style.backgroundImage = `url("sprite/sprite_settings.png")`;
    setTimeout(() => {
      settingsBtn.style.backgroundImage = `url("sprite/sprite_settings_i.png")`;
    }, 150);
  }
  playSelectSfx();
};

// MOVE MODE FUNCTIONALITY
// -----------------------

let moveModeBorders = [];
function createMoveModeBorder() {
  const directions = ["top", "bottom", "left", "right"];
  directions.forEach((direction) => {
    const border = document.createElement("div");
    border.className = `move-mode-border move-mode-border-${direction}`;
    document.body.appendChild(border);

    const text = document.createElement("div");
    text.className = `move-mode-text move-mode-text-${direction}`;
    text.textContent = "Move Mode";
    document.body.appendChild(text);

    moveModeBorders.push(border);
    moveModeBorders.push(text);
  });

  const centerSquare = document.createElement("div");
  centerSquare.className = "center-square";
  document.body.appendChild(centerSquare);

  const centerX = document.createElement("h1");
  centerX.className = "center-x";
  centerX.textContent = "X";
  centerSquare.appendChild(centerX);

  centerSquare.addEventListener("click", removeMoveModeBorder);
  moveMode = true;
  window.electron.send("toggle-move-mode", true);
}

function removeMoveModeBorder() {
  moveModeBorders.forEach((element) => {
    element.remove();
  });
  document.querySelector(".center-square").remove();
  moveModeBorders = []; // Reset the array
  moveMode = false;
  window.electron.send("toggle-move-mode", false);
}

document.addEventListener("mousedown", (event) => {
  if (moveMode == true) {
    isDragging = true;
    offset.x = event.screenX - window.screenLeft;
    offset.y = event.screenY - window.screenTop;
  }
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const newX = event.screenX - offset.x;
    const newY = event.screenY - offset.y;
    window.electron.send("drag-window", { x: newX, y: newY });
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

//createMoveModeBorder(); // for debug
//removeMoveModeBorder(); // for debug

// info panel listeners
window.electron.receive("setStats", (stats) => {
  console.log("Stats received for info panel:", stats);
  switch (stats.health) {
    case 3:
      infoHealth.innerHTML = `health: [*] [*] [*]`;
      bFace.src = "faces/default_idle.png";
      break;
    case 2:
      infoHealth.innerHTML = `health: [*] [*] [ ]`;
      bFace.src = "faces/default_sad_1.png";
      break;
    case 1:
      infoHealth.innerHTML = `health: [*] [ ] [ ]`;
      bFace.src = "faces/default_sad_2.png";
      break;
    case 0:
      infoHealth.innerHTML = `health: D E A D`;
      bFace.src = "faces/default_dead.png";
      break;
  }
  infoFood.innerHTML = `food: ${stats.food}%`;
  infoEnergy.innerHTML = `energy: ${stats.energy}%`;
});

window.electron.receive("setFoods", (foodsObj) => {
  foods = foodsObj;
  console.log(`Foods object updated:`);
  console.log(foodsObj);
  if (foodsObj[0].discovered == true) {
    foodIcon1.style.backgroundImage = `url("sprite/sprite_orange.png")`;
    foodCounter1.innerHTML = foods[0].count;
  }
  if (foodsObj[1].discovered == true) {
    foodIcon2.style.backgroundImage = `url("sprite/sprite_sweets.png")`;
    foodCounter2.innerHTML = foods[1].count;
  }
  if (foodsObj[2].discovered == true) {
    foodIcon3.style.backgroundImage = `url("sprite/sprite_spice.png")`;
    foodCounter3.innerHTML = foods[2].count;
  }
});

window.electron.receive("killPal", (bool) => {
  console.log("pal killed.");
  bFace.setAttribute("src", "faces/default_dead.png");
  clearTimeout(moveFaceTimeout);
  sacrificeBtn.style.visibility = "";
}); // Kill the pal.

window.electron.receive("alivePal", (bool) => {
  console.log("pal alived.");
  bFace.setAttribute("src", "faces/default_idle.png");
  moveFace();
  sacrificeBtn.style.visibility = "hidden";
}); // Alive the pal.

foodIcon1.addEventListener("mouseover", () => {
  if (foods[0].discovered == true) {
    foodIcon1.style.backgroundImage = `url("sprite/sprite_orange_i.png")`;
    foodIcon1.style.backgroundPosition = "0px";
    foodIcon1.style.backgroundSize = "40px 40px";
    playSelectSfx();
  }
});
foodIcon1.addEventListener("mouseleave", () => {
  if (foods[0].discovered == true) {
    foodIcon1.style.backgroundImage = `url("sprite/sprite_orange.png")`;
    foodIcon1.style.backgroundPosition = "2px";
    foodIcon1.style.backgroundSize = "35px 35px";
  }
});
foodIcon1.addEventListener("mousedown", () => {
  if (foods[0].discovered == true) {
    foodIcon1.style.backgroundImage = `url("sprite/sprite_orange.png")`;
    foodIcon1.style.backgroundPosition = "2px";
    foodIcon1.style.backgroundSize = "35px 35px";
    playSelectSfx();
    window.electron.send("consume_food", "orange");
    setTimeout(() => {
      foodIcon1.style.backgroundImage = `url("sprite/sprite_orange_i.png")`;
      foodIcon1.style.backgroundPosition = "0px";
      foodIcon1.style.backgroundSize = "40px 40px";
    }, 150);
  }
});
foodIcon2.addEventListener("mouseover", () => {
  if (foods[1].discovered == true) {
    foodIcon2.style.backgroundImage = `url("sprite/sprite_sweets_i.png")`;
    foodIcon2.style.backgroundPosition = "0px";
    foodIcon2.style.backgroundSize = "45px 45px";
    playSelectSfx();
  }
});
foodIcon2.addEventListener("mouseleave", () => {
  if (foods[1].discovered == true) {
    foodIcon2.style.backgroundImage = `url("sprite/sprite_sweets.png")`;
    foodIcon2.style.backgroundPosition = "4px";
    foodIcon2.style.backgroundSize = "40px 40px";
  }
});
foodIcon2.addEventListener("mousedown", () => {
  if (foods[1].discovered == true) {
    foodIcon2.style.backgroundImage = `url("sprite/sprite_sweets.png")`;
    foodIcon2.style.backgroundPosition = "4px";
    foodIcon2.style.backgroundSize = "40px 40px";
    playSelectSfx();
    window.electron.send("consume_food", "sweets");
    setTimeout(() => {
      foodIcon2.style.backgroundImage = `url("sprite/sprite_sweets_i.png")`;
      foodIcon2.style.backgroundPosition = "0px";
      foodIcon2.style.backgroundSize = "45px 45px";
    }, 150);
  }
});
foodIcon3.addEventListener("mouseover", () => {
  if (foods[2].discovered == true) {
    foodIcon3.style.backgroundImage = `url("sprite/sprite_spice_i.png")`;
    foodIcon3.style.backgroundPosition = "0px";
    foodIcon3.style.backgroundSize = "40px 40px";
    playSelectSfx();
  }
});
foodIcon3.addEventListener("mouseleave", () => {
  if (foods[2].discovered == true) {
    foodIcon3.style.backgroundImage = `url("sprite/sprite_spice.png")`;
    foodIcon3.style.backgroundPosition = "2px";
    foodIcon3.style.backgroundSize = "35px 35px";
  }
});
foodIcon3.addEventListener("mousedown", () => {
  if (foods[2].discovered == true) {
    foodIcon3.style.backgroundImage = `url("sprite/sprite_spice.png")`;
    foodIcon3.style.backgroundPosition = "2px";
    foodIcon3.style.backgroundSize = "35px 35px";
    playSelectSfx();
    window.electron.send("consume_food", "spice");
    setTimeout(() => {
      foodIcon3.style.backgroundImage = `url("sprite/sprite_spice_i.png")`;
      foodIcon3.style.backgroundPosition = "0px";
      foodIcon3.style.backgroundSize = "40px 40px";
    }, 150);
  }
});

window.electron.receive("food_popup", (num) => {
  var popupElement = document.createElement("h1");
  popupElement.textContent = `+${num}%`;
  popupElement.className = "popupFood";
  popupElement.id = "popupFood";
  foodBox.appendChild(popupElement);
  // Remove the element after 1.5 seconds
  // Position the element dynamically
  var previousPopups = document.getElementsByClassName("popupFood");
  var totalHeight = 0;
  for (var i = 0; i < previousPopups.length; i++) {
    totalHeight += previousPopups[i].offsetHeight + 10; // 10px spacing between popups
  }
  popupElement.style.position = "absolute";
  popupElement.style.top = totalHeight + "px";

  var audioElement = document.createElement("audio");
  audioElement.src = "sfx/foodPopupSfx.wav"; // Replace "your_sound_effect.mp3" with the path to your sound effect file
  audioElement.autoplay = true;
  audioElement.volume = 0.2; // Adjust the volume as needed
  if (!audioEnabled) {
    audioElement.volume = 0;
  }
  popupElement.appendChild(audioElement);

  setTimeout(function () {
    foodBox.removeChild(popupElement);
    foodBox.removeChild(audioElement);
  }, 1300); // 1500 milliseconds = 1.5 seconds
});

var isWarningFood = false;

window.electron.receive("food_full", () => {
  if (isWarningFood == false) {
    isWarningFood = true;
    foodWarn.style.display = "block";
    setTimeout(() => {
      foodWarn.style.display = "none";
      isWarningFood = false;
    }, 1500);
  }
});

// --------------------
// Inventory system
// --------------------

window.electron.receive("setItems", (itemsObj) => {
  items = itemsObj;
  console.log(`Items object updated:`);
  console.log(itemsObj);
  if (itemsObj[0].discovered == true) {
    invIcon1.style.backgroundImage = `url("sprite/sprite_medkit.png")`;
    invCounter1.innerHTML = items[0].count;
  }
  if (itemsObj[1].discovered == true) {
    invIcon2.style.backgroundImage = `url("sprite/sprite_bulletTime.png")`;
    invCounter2.innerHTML = items[1].count;
  }
  if (itemsObj[2].discovered == true) {
    invIcon3.style.backgroundImage = `url("sprite/sprite_soda.png")`;
    invCounter3.innerHTML = items[2].count;
  }
  if (itemsObj[3].discovered == true) {
    invIcon4.style.backgroundImage = `url("sprite/sprite_sword.png")`;
    invCounter4.innerHTML = items[3].count;
  }
  if (itemsObj[4].discovered == true) {
    invIcon5.style.backgroundImage = `url("sprite/sprite_lootbox.png")`;
    invCounter5.innerHTML = items[4].count;
  }
  if (itemsObj[5].discovered == true) {
    invIcon6.style.backgroundImage = `url("sprite/sprite_heartchain.png")`;
    invCounter6.innerHTML = items[5].count;
  }
});
invIcon1.addEventListener("mouseover", () => {
  if (items[0].discovered == true) {
    invIcon1.style.backgroundImage = `url("sprite/sprite_medkit_i.png")`;
    invIcon1.style.backgroundPosition = "0px";
    invIcon1.style.backgroundSize = "40px 40px";
    playSelectSfx();
  }
});
invIcon1.addEventListener("mouseleave", () => {
  if (items[0].discovered == true) {
    invIcon1.style.backgroundImage = `url("sprite/sprite_medkit.png")`;
    invIcon1.style.backgroundPosition = "2px";
    invIcon1.style.backgroundSize = "35px 35px";
  }
});
invIcon1.addEventListener("mousedown", () => {
  if (items[0].discovered == true) {
    invIcon1.style.backgroundImage = `url("sprite/sprite_medkit.png")`;
    invIcon1.style.backgroundPosition = "2px";
    invIcon1.style.backgroundSize = "35px 35px";
    window.electron.send("consume_item", "medkit");
    playSelectSfx();
    setTimeout(() => {
      invIcon1.style.backgroundImage = `url("sprite/sprite_medkit_i.png")`;
      invIcon1.style.backgroundPosition = "0px";
      invIcon1.style.backgroundSize = "40px 40px";
    }, 150);
  }
});
invIcon2.addEventListener("mouseover", () => {
  if (items[1].discovered == true) {
    invIcon2.style.backgroundImage = `url("sprite/sprite_bulletTime_i.png")`;
    invIcon2.style.backgroundPosition = "0px";
    invIcon2.style.backgroundSize = "40px 40px";
    playSelectSfx();
  }
});
invIcon2.addEventListener("mouseleave", () => {
  if (items[1].discovered == true) {
    invIcon2.style.backgroundImage = `url("sprite/sprite_bulletTime.png")`;
    invIcon2.style.backgroundPosition = "2px";
    invIcon2.style.backgroundSize = "35px 35px";
  }
});
invIcon2.addEventListener("mousedown", () => {
  if (items[1].discovered == true) {
    invIcon2.style.backgroundImage = `url("sprite/sprite_bulletTime.png")`;
    invIcon2.style.backgroundPosition = "2px";
    invIcon2.style.backgroundSize = "35px 35px";
    window.electron.send("consume_item", "bullettime");
    playSelectSfx();
    setTimeout(() => {
      invIcon2.style.backgroundImage = `url("sprite/sprite_bulletTime_i.png")`;
      invIcon2.style.backgroundPosition = "0px";
      invIcon2.style.backgroundSize = "40px 40px";
    }, 150);
  }
});
invIcon3.addEventListener("mouseover", () => {
  if (items[2].discovered == true) {
    invIcon3.style.backgroundImage = `url("sprite/sprite_soda_i.png")`;
    invIcon3.style.backgroundPosition = "0px";
    invIcon3.style.backgroundSize = "40px 40px";
    playSelectSfx();
  }
});
invIcon3.addEventListener("mouseleave", () => {
  if (items[2].discovered == true) {
    invIcon3.style.backgroundImage = `url("sprite/sprite_soda.png")`;
    invIcon3.style.backgroundPosition = "2px";
    invIcon3.style.backgroundSize = "35px 35px";
  }
});
invIcon3.addEventListener("mousedown", () => {
  if (items[2].discovered == true) {
    invIcon3.style.backgroundImage = `url("sprite/sprite_soda.png")`;
    invIcon3.style.backgroundPosition = "2px";
    invIcon3.style.backgroundSize = "35px 35px";
    window.electron.send("consume_item", "soda");
    playSelectSfx();
    setTimeout(() => {
      invIcon3.style.backgroundImage = `url("sprite/sprite_soda_i.png")`;
      invIcon3.style.backgroundPosition = "0px";
      invIcon3.style.backgroundSize = "40px 40px";
    }, 150);
  }
});
invIcon4.addEventListener("mouseover", () => {
  if (items[3].discovered == true) {
    invIcon4.style.backgroundImage = `url("sprite/sprite_sword_i.png")`;
    invIcon4.style.backgroundPosition = "0px";
    invIcon4.style.backgroundSize = "40px 40px";
    playSelectSfx();
  }
});
invIcon4.addEventListener("mouseleave", () => {
  if (items[3].discovered == true) {
    invIcon4.style.backgroundImage = `url("sprite/sprite_sword.png")`;
    invIcon4.style.backgroundPosition = "2px";
    invIcon4.style.backgroundSize = "35px 35px";
  }
});
invIcon4.addEventListener("mousedown", () => {
  if (items[3].discovered == true) {
    invIcon4.style.backgroundImage = `url("sprite/sprite_sword.png")`;
    invIcon4.style.backgroundPosition = "2px";
    invIcon4.style.backgroundSize = "35px 35px";
    window.electron.send("consume_item", "sword");
    playSelectSfx();
    setTimeout(() => {
      invIcon4.style.backgroundImage = `url("sprite/sprite_sword_i.png")`;
      invIcon4.style.backgroundPosition = "0px";
      invIcon4.style.backgroundSize = "40px 40px";
    }, 150);
  }
});
invIcon5.addEventListener("mouseover", () => {
  if (items[4].discovered == true) {
    invIcon5.style.backgroundImage = `url("sprite/sprite_lootbox_i.png")`;
    invIcon5.style.backgroundPosition = "0px";
    invIcon5.style.backgroundSize = "40px 40px";
    playSelectSfx();
  }
});
invIcon5.addEventListener("mouseleave", () => {
  if (items[4].discovered == true) {
    invIcon5.style.backgroundImage = `url("sprite/sprite_lootbox.png")`;
    invIcon5.style.backgroundPosition = "2px";
    invIcon5.style.backgroundSize = "35px 35px";
  }
});
invIcon5.addEventListener("mousedown", () => {
  if (items[4].discovered == true) {
    invIcon5.style.backgroundImage = `url("sprite/sprite_lootbox.png")`;
    invIcon5.style.backgroundPosition = "2px";
    invIcon5.style.backgroundSize = "35px 35px";
    window.electron.send("consume_item", "lootbox");
    playSelectSfx();
    setTimeout(() => {
      invIcon5.style.backgroundImage = `url("sprite/sprite_lootbox_i.png")`;
      invIcon5.style.backgroundPosition = "0px";
      invIcon5.style.backgroundSize = "40px 40px";
    }, 150);
  }
});
invIcon6.addEventListener("mouseover", () => {
  if (items[5].discovered == true) {
    invIcon6.style.backgroundImage = `url("sprite/sprite_heartchain_i.png")`;
    invIcon6.style.backgroundPosition = "0px";
    invIcon6.style.backgroundSize = "40px 40px";
    playSelectSfx();
  }
});
invIcon6.addEventListener("mouseleave", () => {
  if (items[5].discovered == true) {
    invIcon6.style.backgroundImage = `url("sprite/sprite_heartchain.png")`;
    invIcon6.style.backgroundPosition = "2px";
    invIcon6.style.backgroundSize = "35px 35px";
  }
});
invIcon6.addEventListener("mousedown", () => {
  if (items[5].discovered == true) {
    invIcon6.style.backgroundImage = `url("sprite/sprite_heartchain.png")`;
    invIcon6.style.backgroundPosition = "2px";
    invIcon6.style.backgroundSize = "35px 35px";
    window.electron.send("consume_item", "heartchain");
    playSelectSfx();
    setTimeout(() => {
      invIcon6.style.backgroundImage = `url("sprite/sprite_heartchain_i.png")`;
      invIcon6.style.backgroundPosition = "0px";
      invIcon6.style.backgroundSize = "40px 40px";
    }, 150);
  }
});

// ---------------------
//     Attack window
// ---------------------

// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let attackSoundBuffer;

// Load the audio file
fetch("sfx/attack_sfx.wav")
  .then((response) => response.arrayBuffer())
  .then((data) => audioContext.decodeAudioData(data))
  .then((buffer) => {
    attackSoundBuffer = buffer;
  })
  .catch((e) => console.error("Error with decoding audio data", e));

// Function to play attack sfx
// Function to play attack sfx with pitch variation
function playAttackSfx() {
  if (!attackSoundBuffer) {
    console.error("Audio buffer not loaded yet");
    return;
  }

  const source = audioContext.createBufferSource();
  source.buffer = attackSoundBuffer;

  // Randomly vary the playback rate between 0.8 and 1.2
  source.playbackRate.value = 0.8 + Math.random() * 0.2;
  // Create a gain node for volume control
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.5; // Set volume to 0.5

  // Connect the nodes: source -> gainNode -> destination
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Start the sound
  if (audioEnabled) {
    source.start(0);
  }
}

function playDeathSfx() {
  if (audioEnabled) {
    const source = audioContext.createBufferSource();
    source.buffer = deathSfxBuffer;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.8; // Set volume to 60%
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start(audioContext.currentTime, 0, 1);
  }
}

function popupItem(name, rand, bl) {
  var popupElement = document.createElement("h1");
  if (bl) {
    popupElement.textContent = `${name}`;
  } else {
    if (rand == 1) {
      popupElement.textContent = `+${name}`;
    } else {
      popupElement.textContent = `+${rand} ${name}`;
    }
  }
  popupElement.className = "popupItem";
  popupElement.id = "popupItem";
  battleBox.appendChild(popupElement);
  // Remove the element after 1.5 seconds
  // Position the element dynamically
  var previousPopups = document.getElementsByClassName("popupItem");
  var totalHeight = 64;
  for (var i = 0; i < previousPopups.length; i++) {
    totalHeight += previousPopups[i].offsetHeight + 10; // 10px spacing between popups
  }
  popupElement.style.position = "absolute";
  popupElement.style.top = totalHeight + "px";

  var audioElement = document.createElement("audio");
  if (bl) {
    audioElement.src = "sfx/ne_sfx.wav"; // Replace "your_sound_effect.mp3" with the path to your sound effect file
    audioElement.volume = 1.0; // Adjust the volume as needed
  } else {
    audioElement.src = "sfx/foodPopupSfx.wav"; // Replace "your_sound_effect.mp3" with the path to your sound effect file
    audioElement.volume = 0.2; // Adjust the volume as needed
  }
  if (!audioEnabled) {
    audioElement.volume = 0;
  }
  audioElement.autoplay = true;
  popupElement.appendChild(audioElement);

  setTimeout(function () {
    //battleBox.removeChild(popupElement);
    battleBox.removeChild(audioElement);
  }, 1500); // 1500 milliseconds = 1.5 seconds
}

window.electron.receive("setLevel", (levelData) => {
  console.log("setLevel", levelData);
  if (!levelData.level) {
    levelData.level = 1;
  }
  level.innerHTML = `lvl: ${levelData.level}`;
  levelIndicator.style.width = `${levelData.levelProgress}px`;
});

/* 
  Settings box stuff
*/

moveBtn.addEventListener("mouseover", () => {
  moveBtn.style.backgroundImage = `url("sprite/sprite_move_i.png")`;
  playSelectSfx();
});
moveBtn.addEventListener("mouseleave", () => {
  moveBtn.style.backgroundImage = `url("sprite/sprite_move.png")`;
});
moveBtn.addEventListener("mousedown", () => {
  moveBtn.style.backgroundImage = `url("sprite/sprite_move.png")`;
  playSelectSfx();
  createMoveModeBorder();
  setTimeout(() => {
    moveBtn.style.backgroundImage = `url("sprite/sprite_move_i.png")`;
  }, 150);
});

muteBtn.addEventListener("mouseover", () => {
  if (audioEnabled) {
    muteBtn.style.backgroundImage = `url("sprite/sprite_volume_i.png")`;
  } else {
    muteBtn.style.backgroundImage = `url("sprite/sprite_mute_i.png")`;
  }
  playSelectSfx();
});
muteBtn.addEventListener("mouseleave", () => {
  if (audioEnabled) {
    muteBtn.style.backgroundImage = `url("sprite/sprite_volume.png")`;
  } else {
    muteBtn.style.backgroundImage = `url("sprite/sprite_mute.png")`;
  }
});
muteBtn.addEventListener("mousedown", () => {
  if (audioEnabled) {
    muteBtn.style.backgroundImage = `url("sprite/sprite_mute_i.png")`;
  } else {
    muteBtn.style.backgroundImage = `url("sprite/sprite_volume_i.png")`;
  }
  playSelectSfx();
  audioEnabled = !audioEnabled;
  setTimeout(() => {
    if (!audioEnabled) {
      muteBtn.style.backgroundImage = `url("sprite/sprite_mute.png")`;
    } else {
      muteBtn.style.backgroundImage = `url("sprite/sprite_volume.png")`;
    }
  }, 150);
});

sacrificeBtn.addEventListener("mouseover", () => {
  sacrificeBtn.style.backgroundImage = `url("sprite/sprite_sacrifice_i.png")`;
  playSelectSfx();
});
sacrificeBtn.addEventListener("mouseleave", () => {
  sacrificeBtn.style.backgroundImage = `url("sprite/sprite_sacrifice.png")`;
});
sacrificeBtn.addEventListener("mousedown", () => {
  sacrificeBtn.style.backgroundImage = `url("sprite/sprite_sacrifice_i.png")`;
  if (!sacking) {
    window.electron.send("startSacrifice");
    sacking = true;
  }
});

window.electron.receive("sacrificePal", (sacObj) => {
  popupItem("Sacrifice", 1, true);
  setTimeout(() => {
    sacrificeBtn.style.backgroundImage = `url("sprite/sprite_sacrifice.png")`;
    setTimeout(() => {
      sacrificeBtn.style.visibility = "hidden";
      playAttackSfx();
      setTimeout(() => {
        sidebar.style.visibility = "hidden";
        playAttackSfx();
        setTimeout(() => {
          infoBox.style.visibility = "hidden";
          playAttackSfx();
          setTimeout(() => {
            dedpal_glitch_div.style.display = "block";
            nullEventVid.currentTime = 0;
            nullEventVid.volume = 0.7;
            nullEventVid.play();
            nullEventSfx.currentTime = 0;
            nullEventSfx.volume = 0.7;
            nullEventSfx.play();
            setTimeout(() => {
              // Blank out the screen and display pals level popup.
              bPal.style.display = "none";
              dedpal_glitch_div.style.display = "none";
              setTimeout(() => {
                var popupElement = document.createElement("h1");
                popupElement.className = "popupLvl";
                popupElement.id = "popupLvl";
                popupElement.textContent = `-${level.innerHTML
                  .split(":")[1]
                  .trim()}Lvl`; // TODO: MAKE THIS REFLECT THE CORRECT LEVEL.
                scanlines.appendChild(popupElement);
                var audioElement = document.createElement("audio");
                audioElement.src = "sfx/foodPopupSfx.wav"; // Replace "your_sound_effect.mp3" with the path to your sound effect file
                audioElement.volume = 0.2; // Adjust the volume as needed
                audioElement.autoplay = true;
                popupElement.appendChild(audioElement);
                setTimeout(function () {
                  console.log("removing popup.");
                  scanlines.removeChild(popupElement);
                  setTimeout(() => {
                    console.log("resetting stage");
                    sidebar.style.visibility = "visible";
                    playSelectSfx();
                    setTimeout(() => {
                      bFace.src = "faces/default_idle.png";
                      bFace.style.visibility = "visible";
                      bPal.style.display = "block";
                      battleBoxDead.style.visibility = "hidden";
                      battleBoxSplashCont.style.display = "block";
                      firstSetEnemy = true;
                      playSelectSfx();
                      window.electron.send("endSacrifice");
                    }, 2500);
                  }, 500);
                }, 1500); // 1500 milliseconds = 1.5 seconds
              }, 500);
            }, 7000);
          }, 5000);
        }, 1500);
      }, 1000);
    }, 500);
  }, 150);
});

var isWarningFoodDead = false;

window.electron.receive("food_dead", () => {
  if (isWarningFoodDead == false) {
    isWarningFoodDead = true;
    foodWarn2.style.display = "block";
    playSelectSfx();
    setTimeout(() => {
      foodWarn2.style.display = "none";
      isWarningFoodDead = false;
    }, 2500);
  }
});

window.electron.receive("alertItem", (name, failBool) => {
  console.log("alerting item", name);
  if (failBool) {
    switch (name) {
      case "Medkit":
        itemWarn.innerHTML = "Health full!";
        itemWarn.style.left = "42px";
        break;
      case "BulletTime":
        itemWarn.innerHTML = "BulletTime active!";
        itemWarn.style.left = "8px";
        break;
      case "Soda":
        itemWarn.innerHTML = "Energy full!";
        itemWarn.style.left = "42px";
        break;
      case "Heartchain":
        itemWarn.innerHTML = "Heartchain active!";
        itemWarn.style.left = "10px";
        break;
    }
  } else {
    itemWarn.innerHTML = `${name} consumed`;
    switch (name) {
      case "Medkit":
        itemWarn.style.left = "26px";
        break;
      case "BulletTime":
        itemWarn.style.left = "4px";
        break;
      case "Soda":
        itemWarn.style.left = "36px";
        break;
      case "Sword":
        itemWarn.style.left = "32px";
        break;
      case "Lootbox":
        itemWarn.style.left = "20px";
        break;
      case "Heartchain":
        itemWarn.style.left = "4px";
        break;
    }
  }
  itemWarnCont.style.display = "block";
  var audioElement = document.createElement("audio");
  audioElement.src = "sfx/foodPopupSfx.wav"; // Replace "your_sound_effect.mp3" with the path to your sound effect file
  audioElement.volume = 0.2; // Adjust the volume as needed
  if (!audioEnabled) {
    audioElement.volume = 0;
  }
  audioElement.autoplay = true;
  itemWarnCont.appendChild(audioElement);

  setTimeout(function () {
    itemWarnCont.removeChild(audioElement);
    itemWarn.innerHTML = "";
    itemWarnCont.style.display = "none";
  }, 1500); // 1500 milliseconds = 1.5 seconds
});

/**
 * @param {int} ms the time left in milliseconds
 * @returns a string formatted to "XX:XX(s/h/m)"
 */
function formatTimeLeft(ms) {
  // Calculate time units
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  let formattedTime;

  if (hours > 0) {
    // Format as hours:minutes
    formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}h`;
  } else if (minutes > 0) {
    // Format as minutes:seconds
    formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}m`;
  } else {
    // Format as seconds
    formattedTime = `${String(seconds).padStart(2, "0")}s`;
  }

  return formattedTime;
}

function countdown(ms) {
  let intervalId = setInterval(() => {
    if (ms <= 0) {
      clearInterval(intervalId);
      bullettimeTimer.innerHTML = "00:00s";
      return;
    }

    bullettimeTimer.innerHTML = formatTimeLeft(ms);
    ms -= 1000;
  }, 1000);
}

// Displays the BulletTime graphics and timer.
window.electron.receive("startBulletTime", (ms) => {
  bullettimeTimer.innerHTML = formatTimeLeft(ms);
  bullettimeGlitch.style.display = "block";
  bullettimeCont.style.display = "block";
  countdown(ms);
});

// Removes the BulletTime graphics and timer.
window.electron.receive("stopBulletTime", () => {
  bullettimeGlitch.style.display = "none";
  bullettimeCont.style.display = "none";
});

window.electron.receive("activate_heartchain", () => {
  heartchain.style.display = "block";
});

window.electron.receive("disable_heartchain", () => {
  heartchainSfx.currentTime = 0;
  heartchainSfx.play();
  heartchain.style.display = "none";
  setTimeout(() => {
    heartchainSfx2.currentTime = 0;
    heartchainSfx2.play();
    bPal.style.animation = "fade_in 3s 1";
    setTimeout(() => {
      playSelectSfx();
    }, 2200);
  }, 1000);
});

// ---------------------
//    Lootbox Visuals
// ---------------------

window.electron.receive("roll_lootbox", (vars) => {
  var id = vars[0]; // 0-8 int that determines the item/food to display as the reward. (0-5 = items, 6-8 = foods)
  var quantity = vars[1];

  const items = [
    "Orange",
    "Sweets",
    "Spice",
    "Medkit",
    "BulletTime",
    "Soda",
    "Sword",
    "Lootbox",
  ];

  function generateRandomItems() {
    const randomItems = [];
    for (let i = 0; i < 20; i++) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      randomItems.push(randomItem);
    }
    return randomItems;
  }
  console.log(vars, id);
  lootboxBG.style.display = "block";
  spinLootbox(id);

  function spinLootbox(landingIndex) {
    const lootboxItems = document.getElementById("lootboxItems");
    const itemDisplay = document.getElementById("itemDisplay");
    const landedItemDiv = document.getElementById("landedItem");
    const itemText = document.getElementById("itemText");
    const itemCount = document.getElementById("itemCount");

    // Resetting display elements for new spin
    lootboxItems.innerHTML = "";
    itemDisplay.style.display = "none";
    lootboxItems.style.display = "flex";
    lootbox.style.display = "block";
    lootboxPointer.style.display = "block";

    const randomItems = generateRandomItems();
    const predeterminedItem = items[landingIndex];

    const additionalItemsBefore = 5; // Number of items to pad before the predetermined item
    const additionalItemsAfter = 10; // Number of items to pad after the predetermined item

    // Adding items before the predetermined item
    for (let i = 0; i < additionalItemsBefore; i++) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      randomItems.unshift(randomItem);
    }

    randomItems.push(predeterminedItem);

    // Adding items after the predetermined item
    for (let i = 0; i < additionalItemsAfter; i++) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      randomItems.push(randomItem);
    }

    randomItems.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "lootbox-item";
      itemDiv.style.backgroundImage = `url(sprite/sprite_${item}.png)`;
      lootboxItems.appendChild(itemDiv);
    });
    console.log(randomItems);

    const itemWidth = 50;
    const totalItems = randomItems.length;
    const totalWidth = (totalItems - 10) * itemWidth;
    const spinTimes = 3;
    const spinDistance = -(totalWidth - itemWidth * 2); // Distance to spin before final landing
    const finalPosition = -(landingIndex + additionalItemsBefore) * itemWidth; // Adjust final position to land on predetermined item

    // Add pixelated effect
    lootboxItems.classList.add("pixelated");

    lootboxItems.style.transition = "none";
    lootboxItems.style.transform = `translateX(0px)`;

    setTimeout(() => {
      lootboxItems.style.transition = `transform ${spinTimes + 1
        }s cubic-bezier(0.33, 1, 0.68, 1)`;
      lootboxItems.style.transform = `translateX(${spinDistance}px)`;
    }, 50);

    setTimeout(() => {
      lootbox.style.display = "none";
      lootboxPointer.style.display = "none";
      lootboxItems.style.display = "none";
      landedItemDiv.style.backgroundImage = `url(sprite/sprite_${predeterminedItem}.png)`;
      itemCount.innerText = `+${quantity}`;
      itemText.innerHTML = predeterminedItem;
      itemDisplay.style.display = "flex";
    }, (spinTimes + 2) * 1000);
  }
});

lootboxNextBtn.onmousedown = () => {
  lootboxBG.style.display = "none";
  playSelectSfx();
};

// -------------------------
//      Tutorial mechanics
// -------------------------

var username;
var tutCt = -1;
var tutClick = false;

tutorialNxtBtn.addEventListener("mouseover", () => {
  tutorialNxtBtn.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
});
tutorialNxtBtn.addEventListener("mouseleave", () => {
  tutorialNxtBtn.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
});
tutorialNxtBtn.addEventListener("mousedown", () => {
  tutorialNxtBtn.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
  if (!tutClick) {
    tutClick = true;
    setTimeout(() => {
      tutorialNxtBtn.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
      tutCt++;
      tutAdvance();
      tutorialNxtBtn.style.display = "none";
      tutClick = false;
    }, 150);
  }
});

function playTutorialBackground() {
  tutorialBackgroundSfx.currentTime = 0;
  tutorialBackgroundSfx.play();
}

function stopTutorialBackground() {
  tutorialBackgroundSfx.pause();
}

window.electron.receive("startTutorial", (name) => {
  username = name;
  setTimeout(() => {
    sidebar.style.display = "none";
    tutorialH1.style.display = "block";
    tutorialCont.style.display = "block";
    playSelectSfx();
    window.electron.send("tutorialAdvanced");
    setTimeout(() => {
      tutorialNxtBtn.style.display = "block";
    }, 1500);
  }, 500);
});

function tutAdvance() {
  var tutorials = [
    tut1,
    tut2,
    tut3,
    tut35,
    tut4,
    tut5,
    tut6,
    tut7,
    tut8,
    tut9,
    tut10,
    tut11,
    tut12,
    tut13,
    tut14,
    tut15,
    tut16,
    tut17,
    tut18,
    tut19,
    tut20,
    tut21,
  ]; // tutorial series script.
  tutorials[tutCt]();
  window.electron.send("tutorialAdvanced", tutCt);
}

function tut1() {
  playSelectSfx();
  tutorialH1.innerHTML = "I don't recognize you?";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 1500);
}

function tut2() {
  playSelectSfx();
  tutorialH1.innerHTML = "";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}

function tut3() {
  playSelectSfx();
  tutorialH1.innerHTML = `${username}...`;
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
  bFace.src = "faces/tutorial_1.png";
  bFace.style.left = "24px";
}
function tut35() {
  tutorialH1.innerHTML = "";
  tutCt++;
  setTimeout(() => {
    tutAdvance();
  }, 2500);
}

function tut4() {
  playSelectSfx();
  playTutorialBackground();
  tutorialH1.innerHTML = `Well Hi there!!!`;
  bFace.src = "faces/default_happy_2.png";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}

function tut5() {
  playSelectSfx();
  tutorialH1.style.top = "2px";
  tutorialH1.style.left = "28px";
  tutorialH1.style.width = "210px";
  tutorialH1.innerHTML = `I'm your Bullegachi, Your PC BulletPal companion!`;
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}

function tut6() {
  playSelectSfx();
  tutorialNxtBtn.style.top = "112px";
  tutorialH1.innerHTML = `Before you can start keeping me alive there are a few things you should know..`;
  tutorialH1.style.top = "2px";
  tutorialH1.style.left = "22px";
  tutorialH1.style.width = "220px";
  tutorialH1.style.fontSize = "18px";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}
function tut7() {
  playSelectSfx();
  infoBox.style.visibility = "";
  tutorialNxtBtn.style.top = "92px";
  tutorialH1.style.fontSize = "14px";
  tutorialH1.style.left = "22px";
  tutorialH1.style.top = "142px";
  tutorialH1.style.width = "220px";
  tutorialH1.innerHTML = `1. Health, If it gets to 0 I will die shortly after.`;
  tutorialArrow.style.display = "block";
  bFace.src = "faces/default_dead.png";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}

function tut8() {
  playSelectSfx();
  tutorialH1.innerHTML = `2. Food, If it gets to 0 I will lose health slowly.`;
  bFace.src = "faces/default_sad_2.png";
  tutorialArrow.style.top = "13px";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}
function tut9() {
  playSelectSfx();
  tutorialH1.innerHTML = `3. Energy, Used to fight enemies to gain loot, everytime I eat my Energy will refill`;
  bFace.src = "faces/default_angry.png";
  tutorialArrow.style.top = "28px";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}
function tut10() {
  playSelectSfx();
  tutorialH1.innerHTML = `4. Level, How long you have kept me alive!`;
  tutorialArrow.style.top = "43px";
  bFace.src = "faces/default_happy_2.png";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}
function tut11() {
  playSelectSfx();
  infoBox.style.visibility = "hidden";
  tutorialNxtBtn.style.top = "92px";
  tutorialH1.style.fontSize = "14px";
  tutorialH1.style.left = "22px";
  tutorialH1.style.top = "142px";
  tutorialH1.style.width = "220px";
  tutorialH1.innerHTML = `Now last thing that you need to know!`;
  tutorialArrow.style.display = "none";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}

function tut12() {
  playSelectSfx();
  sidebar.style.display = "flex";
  tutorialArrow.innerHTML = "<-";
  tutorialArrow.style.left = "46px";
  tutorialArrow.style.top = "117px";
  tutorialArrow.style.display = "block";
  tutorialNxtBtn.style.left = "193px";
  tutorialNxtBtn.style.top = "90px";
  tutorialH1.style.top = "2px";
  tutorialH1.style.left = "50px";
  tutorialH1.style.width = "200px";
  tutorialH1.innerHTML = `Battles, This is how you get new food and items for me!`;
  tutorialSidebar.style.display = "block";
  battleBtn.style.backgroundImage = "url(sprite/sprite_battle_i.png)";
  battleClickBtn.style.display = "none";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}

function tut13() {
  playSelectSfx();
  battleBox.style.display = "block";
  tutorialNxtBtn.style.top = "132px";
  tutorialNxtBtn.style.left = "193px";
  tutorialArrow.style.top = "28px";
  tutorialArrow.style.left = "80px";
  tutorialArrow.style.transform = "rotate(270deg)";
  tutorialH1.innerHTML = "This is me, if my HP hits 0 I will die.";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}

function tut14() {
  playSelectSfx();
  tutorialArrow.style.top = "36px";
  tutorialArrow.style.left = "128px";
  tutorialArrow.style.transform = "rotate(180deg)";
  tutorialH1.innerHTML = "This is the enemy, if their HP hits 0 they die!";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}

function tut15() {
  playSelectSfx();
  battleClickBtn.style.display = "block";
  tutorialArrow.style.top = "94px";
  tutorialArrow.style.left = "137px";
  tutorialArrow.style.transform = "rotate(270deg)";
  tutorialH1.innerHTML =
    "This is the attack btn, click it to deal damage to the enemy!";
  tutorialSidebar.style.width = "180px";
  battleEnemyName.style.color = "#100c00";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}

function tut16() {
  playSelectSfx();
  battleEnemyName.style.color = "#ffcc00";
  tutorialArrow.style.top = "76px";
  tutorialArrow.style.left = "138px";
  tutorialArrow.style.transform = "rotate(180deg)";
  tutorialH1.innerHTML = "Each time you kill an enemy, something will drop!";
  battleEnemyHP.innerHTML = "HP: 0";
  battleEnemyName.innerHTML = "D E A D";
  battleEnemy.style.display = "none";
  battleClickBtn.style.display = "none";
  playDeathSfx();
  setTimeout(() => {
    popupItem("Sweets", 1, false);
    setTimeout(() => {
      tutorialNxtBtn.style.display = "block";
    }, 2500);
  }, 2500);
}

function tut17() {
  playSelectSfx();
  tutorialArrow.style.display = "none";
  tutorialH1.innerHTML = "Some things are rarer than others..";
  battleClickBtn.style.display = "none";
  setTimeout(() => {
    popupItem("?", 1, true);
    setTimeout(() => {
      tutorialNxtBtn.style.display = "block";
    }, 2500);
  }, 1500);
}

function tut18() {
  playSelectSfx();
  battleBox.style.display = "none";
  battleBtn.style.backgroundImage = "sprite/sprite_battle.png";
  sidebar.style.display = "none";
  tutorialSidebar.style.display = "none";
  tutorialNxtBtn.style.top = "92px";
  tutorialNxtBtn.style.left = "36px";
  tutorialH1.style.fontSize = "14px";
  tutorialH1.style.left = "22px";
  tutorialH1.style.top = "142px";
  tutorialH1.style.width = "220px";
  tutorialH1.innerHTML = "That seems to be everything!";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}

function tut19() {
  playSelectSfx();
  tutorialH1.innerHTML = "I hope you enjoy this adventure with me :D";
  bFace.src = "faces/default_happy_2_blink_1.png";
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 2500);
}

function tut20() {
  playSelectSfx();
  stopTutorialBackground();
  bFace.src = "faces/tutorial_1.png";
  tutorialH1.innerHTML = `Don't let me die ${username}.`;
  setTimeout(() => {
    tutorialNxtBtn.style.display = "block";
  }, 4500);
}

function tut21() {
  playSelectSfx();
  // End tutorial and initialize main game.
  tutorialCont.style.display = "none";
  setTimeout(() => {
    bPal.style.display = "none";
    setTimeout(() => {
      sidebar.style.visibility = "visible";
      sidebar.style.display = "flex";
      playSelectSfx();
      setTimeout(() => {
        bFace.src = "faces/default_idle.png";
        bPal.style.display = "block";
        battleClickBtn.style.display = "block";
        playSelectSfx();
        window.electron.send("tutorialEnded", true);
      }, 500);
    });
  }, 2500);
}

window.electron.receive("wipeTutorial", () => {
  tutorialCont.style.display = "none";
  sidebar.style.display = "flex";
});

var resetSave = false; // Whether or not to reset the save file after updating.

window.electron.receive("update-available", (info) => {
  playSelectSfx();
  window.electron
    .getAppVersion()
    .then((version) => {
      updateVer.innerHTML = `<span style="color: #b28e00"><del>V${version}</del></span> -> V${info.version}`;
      updateCont.style.display = "block";
      if (version[0] != info.version[0]) {
        resetSave = true;
        updateResetSave.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error fetching app version:", error);
    });
});

updateNotes.addEventListener("mousedown", () => {
  window.electron.openExternal("https://github.com/Eveeko/bullegachi/releases");
});

updateBtn.addEventListener("mouseover", () => {
  playSelectSfx();
  updateBtn.style.backgroundImage = `url("sprite/sprite_update_btn_i.png")`;
});
updateBtn.addEventListener("mouseleave", () => {
  updateBtn.style.backgroundImage = `url("sprite/sprite_update_btn.png")`;
});
updateBtn.addEventListener("mousedown", () => {
  window.electron.send("updateConfirmed", resetSave);
  updateBtn.style.display = "none";
  updateBtnSkip.style.display = "none";
  updateLoading.style.display = "block";
});

updateBtnSkip.addEventListener("mouseover", () => {
  playSelectSfx();
  updateBtnSkip.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
});
updateBtnSkip.addEventListener("mouseleave", () => {
  updateBtnSkip.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
});
updateBtnSkip.addEventListener("mousedown", () => {
  window.electron.send("updateDeclined");
  updateBtn.style.display = "none";
  updateBtnSkip.style.display = "none";
  updateCont.style.display = "none";
});

window.electron.receive("updateProgress", (info) => {
  if (info.percent < 14) {
    updateLoading.innerHTML = "█";
  } else if (info.percent < 28) {
    updateLoading.innerHTML = "█ █";
  } else if (info.percent < 42) {
    updateLoading.innerHTML = "█ █ █";
  } else if (info.percent < 56) {
    updateLoading.innerHTML = "█ █ █ █";
  } else if (info.percent < 70) {
    updateLoading.innerHTML = "█ █ █ █ █";
  } else if (info.percent < 84) {
    updateLoading.innerHTML = "█ █ █ █ █ █";
  } else {
    updateLoading.innerHTML = "█ █ █ █ █ █ █";
  }
});

// ---------------------
// Bullenomicon Skeleton
// ----------0.0--------

// ---------------------

// -------------------------------------------------------------------------
// ┌───────────────────────────────────────────────────────────────────────┐
// │██████╗  █████╗ ████████╗████████╗██╗     ███████╗    ██╗   ██╗██████╗ │
// │██╔══██╗██╔══██╗╚══██╔══╝╚══██╔══╝██║     ██╔════╝    ██║   ██║╚════██╗│
// │██████╔╝███████║   ██║      ██║   ██║     █████╗      ██║   ██║ █████╔╝│
// │██╔══██╗██╔══██║   ██║      ██║   ██║     ██╔══╝      ╚██╗ ██╔╝██╔═══╝ │
// │██████╔╝██║  ██║   ██║      ██║   ███████╗███████╗     ╚████╔╝ ███████╗│
// │╚═════╝ ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝      ╚═══╝  ╚══════╝│
// └───────────────────────────────────────────────────────────────────────┘
// -------------------------------------------------------------------------
// This is the *NEW* battle mechanics, all visual and user input are defined
// and handled within this block. call 1-800-battle2 for more information™
// -------------------------------------------------------------------------

var levelObj = null;
var playerObj = null;

battleBoxSplashStart.addEventListener("mouseover", () => {
  playSelectSfx();
  battleBoxSplashStart.style.backgroundColor = "#ffcc00";
  battleBoxSplashH1_1.style.color = "#110d00";
});
battleBoxSplashStart.addEventListener("mouseout", () => {
  battleBoxSplashStart.style.backgroundColor = "#110d00";
  battleBoxSplashH1_1.style.color = "#ffcc00";
});
battleBoxSplashStart.addEventListener("mousedown", () => {
  playSelectSfx();
  battleBoxSplashStart.style.backgroundColor = "#110d00";
  battleBoxSplashH1_1.style.color = "#ffcc00";
  setTimeout(() => {
    battleBoxSplashStart.style.backgroundColor = "#ffcc00";
    battleBoxSplashH1_1.style.color = "#110d00";
    battleBoxSplashResume.style.visibility = "hidden";
    battleBoxSplashStart.style.visibility = "hidden";
    setTimeout(() => {
      window.electron.send("cave_debug_skip");
      //battleBoxIntroStart();
      //window.electron.send("intro_vignette_overlayCreate");
    }, 500);
    //window.electron.send("battleBoxStart");
  }, 150);
});

battleBoxSplashResume.addEventListener("mouseover", () => {
  playSelectSfx();
  battleBoxSplashResume.style.backgroundColor = "#ffcc00";
  battleBoxSplashH1_2.style.color = "#110d00";
});
battleBoxSplashResume.addEventListener("mouseout", () => {
  battleBoxSplashResume.style.backgroundColor = "#110d00";
  battleBoxSplashH1_2.style.color = "#ffcc00";
});
battleBoxSplashResume.addEventListener("mousedown", () => {
  playSelectSfx();
  battleBoxSplashResume.style.backgroundColor = "#110d00";
  battleBoxSplashH1_2.style.color = "#ffcc00";
  setTimeout(() => {
    battleBoxSplashResume.style.backgroundColor = "#ffcc00";
    battleBoxSplashH1_2.style.color = "#110d00";
    battleBoxSplashResume.style.visibility = "hidden";
    battleBoxSplashStart.style.visibility = "hidden";
    battleBoxResumeFromLeftStart();
    //window.electron.send("battleBoxResume");
  }, 150);
});
/**
 * Starts the battleBox intro sequence and begins the game state.
 */
function battleBoxIntroStart() {
  battleBox_intro_h1.style.visibility = "visible";
  typewriterEffect(battleBox_intro_h1, "Now descending..", 1000);
  setTimeout(() => {
    battleBox_intro_h1_2.style.visibility = "visible";
    typewriterEffect(battleBox_intro_h1_2, ". . .", 3000);
    setTimeout(() => {
      //window.electron.send("battleBoxStart"); // load the level while displaying starting animation.
      battleBox_intro_h1.style.visibility = "hidden";
      battleBox_intro_h1_2.style.visibility = "hidden";

      battleBox_intro_sprite_1.style.visibility = "visible";
      battleBox_intro_lineFlasher.style.visibility = "visible";
      let delayCt = 850;
      let topOffset = 0;
      for (let x = 0; x < 15; x++) {
        setTimeout(() => {
          battleBox_intro_lineFlasher.style.backgroundColor = "#110d00";
          setTimeout(() => {
            battleBox_intro_lineFlasher.style.backgroundColor = "#ffcc00";
            battleBox_intro_lineFlasher.style.top = `${topOffset + (10 * x)}px`;
            if (x == 14) { battleBox_intro_lineFlasher.style.visibility = "hidden" }
          }, 200)
        }, (delayCt * x))
      }
      introCaveSfx.currentTime = 0;
      introCaveSfx.play();
      setTimeout(() => {
        introCaveSfx.pause();
        playSelectSfx();
        battleBox_intro_sprite_1.style.visibility = "hidden";
        setTimeout(() => {
          battleBox_intro_h1.innerHTML = "";
          battleBox_intro_h1.style.fontSize = "12px";
          battleBox_intro_h1.style.visibility = "visible";
          typewriterEffect(battleBox_intro_h1, "You enter the caves entrance by foot.", 1000);
          setTimeout(() => {
            intro_cave_start_btn.style.visibility = "visible";
          }, 1500)
        }, 500);
      }, 13500);
    }, 4500)
  }, 1500);
};
intro_cave_start_btn.addEventListener("mousedown", () => {
  intro_cave_start_btn.style.visibility = "hidden";
  battleBox_intro_h1.style.visibility = "hidden";
  playSelectSfx();
  window.electron.send("intro_vignette_overlayCreate");
});
/**
 * Starts the battleBox from the last saved state.
 */
function battleBoxResumeFromLeftStart() { }

function typewriterEffect(h1Element, text, timeToComplete) {
  const totalChars = text.length;
  const delay = timeToComplete / totalChars;
  let currentIndex = 0;
  if (timeToComplete > 1000) {
    if ((text.length / timeToComplete) < 10) {
      typeNextChar(true);
    } else {
      speechSfx.play();
      h1Element.textContent = ""; // Clear any existing text
      typeNextChar();
    }
  } else {
    speechSfx.play();
    h1Element.textContent = ""; // Clear any existing text
    typeNextChar();
  }
  function typeNextChar(flag) {
    if (currentIndex < totalChars) {
      if (flag) {
        if (text[currentIndex] != " ") { playRandomSlice(); }
        setTimeout(() => { typeNextChar(true) }, delay);
      } else { setTimeout(typeNextChar, delay); }
      h1Element.textContent += text[currentIndex];
      currentIndex++;
    } else {
      speechSfx.pause();
      speechSfx.currentTime = 0;
    }
  }
  function playRandomSlice() {
    if (!speechAudioSlices.length) {
      console.error('No preloaded slices available');
      return;
    }
    // Get the current slice offset and increment the index
    const offset = speechAudioSlices[currentSpeechSliceIndex];
    currentSpeechSliceIndex = (currentSpeechSliceIndex + 1) % speechAudioSlices.length; // Wrap around when reaching the end
    // Play the slice
    const source = audioContext.createBufferSource();
    source.buffer = speechAudioBuffer;
    source.connect(audioContext.destination);
    source.start(audioContext.currentTime, offset, sliceDuration);
  }
}
window.electron.receive("battleBoxStart_cave_sequence", () => {
  playSelectSfx();
  battleBoxSplash.style.visibility = "hidden";
  window.electron.send("battleBoxStart");
  // TODO: THE INTRO CINEMATIC SEQUENCE GOES HERE
  // MAKE A CAVE FALLING IN ANIMATION ON THE LEFT SIDE OF THE BATTLEBOX SO IT LOOKS LIKE THE ENTRANCE CAVED IN AND NOW YOU HAVE TO PROGRESS FOWARDS.
  // THIS IS NOT THAT HARD IM JUST TRYING NOT TO SPEND TEN YILL MAKING THE COSMETICS OF THE GAME AND I NEED TO GET BACK TO THE GAMEPLAY BEFORE THIS UPDATE TAKES FOREVER.
});
window.electron.receive("battleBoxStart_levelSync", (syncObjs) => {
  console.log("received new level payload.");
  console.log(syncObjs[0]);
  levelObj = syncObjs[0];
  playerObj = syncObjs[1];
  var startingHeightOffset = levelObj.gridHeight * 10;
  if (startingHeightOffset == 10) startingHeightOffset = 0;
  for (x = 0; x < levelObj.tiles.length; x++) {
    for (z = 0; z < levelObj.tiles[x].length; z++) {
      const newTile = document.createElement("div");
      newTile.className = "battle_tile";
      if (!levelObj.tiles[x][z].walkable) {
        newTile.style.backgroundImage = `url("sprite/sprite_tile_rock_1.png")`;
        newTile.className = "battle_tile_empty";
      }
      if (levelObj.tiles[x][z].enemy) {
        newTile.className = "battle_tile";
        const enemyFrame = document.createElement("div")
        enemyFrame.className = "battle_tile_enemy";
        enemyFrame.style.backgroundImage = `url("sprite/sprite_enemy_1.png")`;
        newTile.appendChild(enemyFrame);
      }
      newTile.style.top = `${90 - startingHeightOffset + z * 10}px`;
      newTile.style.left = `${112 + x * 28 - z * 3}px`;
      playfield_grid.appendChild(newTile);
    }
  }
  // Align players origin tile with the map start.
  origin_tile_style = window.getComputedStyle(battle_tile_origin);
  battle_tile_origin.style.top = `${(Number(origin_tile_style.getPropertyValue('top').slice(0, -2)) - 20) + (Number(levelObj.startAddress[1]) * 10)}px`;
  const startAddressY = Number(levelObj.startAddress[1]);
  battle_tile_origin.style.left = `${(Number(origin_tile_style.getPropertyValue('left').slice(0, -2)) + 4.5) - (Number(levelObj.startAddress[1]) * 2)}px`;
  playfield_player_style = window.getComputedStyle(playfield_player);
  playfield_player.style.top = `${(Number(playfield_player_style.getPropertyValue('top').slice(0, -2)) - 20) + (Number(levelObj.startAddress[1]) * 10)}px`;
  playfield_player.style.left = `${(Number(playfield_player_style.getPropertyValue('left').slice(0, -2)) + 4) - (Number(levelObj.startAddress[1]) * 2)}px`;
});

// TODO: Add an inactivity timer that adds the class pf_player_idle to the player div to play an idle animation.

function shake(selector, isBattleField) {
  var enemy;
  if (isBattleField) {
    if (!selector) {
      enemy = playfield_encounterPlayer;
    } else { enemy = playfield_encounterEnemy }
  } else {
    if (!selector) {
      enemy = playfield_player;
    } else {
      enemy = battleEnemy;
    }
  }
  const shakeFrames = [
    { transform: "translate(0, 0)" },
    { transform: "translate(-10px, 0)" },
    { transform: "translate(10px, 0)" },
    { transform: "translate(-10px, 0)" },
    { transform: "translate(10px, 0)" },
    { transform: "translate(-5px, 0)" },
    { transform: "translate(5px, 0)" },
    { transform: "translate(0, 0)" },
  ];

  let frame = 0;

  function animate() {
    enemy.style.transform = shakeFrames[frame].transform;
    frame++;

    if (frame < shakeFrames.length) {
      setTimeout(animate, 50); // Adjust the timing as needed
    } else {
      // Reset to the original position
      enemy.style.transform = "translate(0, 0)";
    }
  }

  animate();
}

// Player map controls
// -------------------
controlsHalted = false;
playerPosition = [0, 0]; // TODO: make this determinate based on the origin tiles coords as the origin tile will eventually be able to move randomly on the Y axis.

// -------------------

map_controls_left.addEventListener("mousedown", () => {
  if (!controlsHalted) {
    playSelectSfx();
    controllsHalted = true;
    map_controls_left.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
    setTimeout(() => {
      map_controls_left.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
      map_controls_mask.style.visibility = "visible";
      window.electron.send("attemptMove", "left");
    }, 150);
  }
});
map_controls_left.addEventListener("mouseover", () => {
  playSelectSfx();
  map_controls_left.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
});
map_controls_left.addEventListener("mouseleave", () => {
  map_controls_left.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
});
map_controls_right.addEventListener("mousedown", () => {
  if (!controlsHalted) {
    playSelectSfx();
    controllsHalted = true;
    map_controls_right.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
    setTimeout(() => {
      map_controls_right.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
      map_controls_mask.style.visibility = "visible";
      window.electron.send("attemptMove", "right");
    }, 150);
  }
});
map_controls_right.addEventListener("mouseover", () => {
  playSelectSfx();
  map_controls_right.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
});
map_controls_right.addEventListener("mouseleave", () => {
  map_controls_right.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
});
map_controls_up.addEventListener("mousedown", () => {
  if (!controlsHalted) {
    playSelectSfx();
    controllsHalted = true;
    map_controls_up.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
    setTimeout(() => {
      map_controls_up.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
      map_controls_mask.style.visibility = "visible";
      window.electron.send("attemptMove", "up");
    }, 150);
  }
});
map_controls_up.addEventListener("mouseover", () => {
  playSelectSfx();
  map_controls_up.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
});
map_controls_up.addEventListener("mouseleave", () => {
  map_controls_up.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
});
map_controls_down.addEventListener("mousedown", () => {
  if (!controlsHalted) {
    playSelectSfx();
    controllsHalted = true;
    map_controls_down.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
    setTimeout(() => {
      map_controls_down.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
      map_controls_mask.style.visibility = "visible";
      window.electron.send("attemptMove", "down");
    }, 150);
  }
});
map_controls_down.addEventListener("mouseover", () => {
  playSelectSfx();
  map_controls_down.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
});
map_controls_down.addEventListener("mouseleave", () => {
  map_controls_down.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
});

var hasScrolledOnce = false;
var curEnemyObj = null;
var curEnemyTile = null;
var isPlayerTurn = true; // Whether or not the player can attack / true = players move, false = AI's move.
var isDefending = false; // Whether or not the player is defending.
var movementDirection = null; // The direction the player is moving in.
var isAIMoveCharging = false; // Whether or not the AI is charging a move. if the AI is this value is the amount of turns to wait. 0 = immediately on next turn.
var chargingAIMoveObj = null; // The move the AI is charging, if any.
const AIMoveDict = {
  "pop": {
    name: "Pop",
    value: 13,
    type: "attack",
    charge: true,
    chargeTime: 1,
    chargeAnimation: move_anim_popCharge,
    attackAnimation: move_anim_pop
  }, // TODO: Refactor all moves to use this new structure above.
  "whip": {
    name: "Whip",
    value: 5,
    type: "attack",
    charge: false,
    chargeTime: 0,
    chargeAnimation: null,
    attackAnimation: move_anim_whip
  },
  "spray": {
    name: "Spray",
    value: 5,
    type: "attack",
    animation: move_anim_spray,
  },
  "crack open": {
    name: "Crack Open",
    value: 5,
    type: "attack",
    animation: move_anim_crackOpen,
  },
  "hold": {
    name: "Hold",
    value: 5,
    type: "defence",
    animation: move_anim_hold,
  }
};

window.electron.receive("battleBox_updatePlayerPosition", (position) => {
  console.log('updatePlayerPosition received: ', position);
  STYLE = window.getComputedStyle(playfield_player);
  var transitionDiv;
  var transitionStep = 0;
  movementDirection = position[2];
  if (position) {
    // Player was able to move, handle visuals.
    if (levelObj.tiles[position[0]][position[1]].enemy) {
      curEnemyTile = levelObj.tiles[position[0]][position[1]];
      var enemyObj = levelObj.tiles[position[0]][position[1]].enemy;
      playAttackSfx();
      console.log("Enemy detected, starting move sequence.");
      switch (position[2]) {
        case "right":
          playfield_player.style.left = `${Number(STYLE.getPropertyValue('left').slice(0, -2)) + enemyObj.encounterOffsetX}px`;
          break;
        case "left":
          playfield_player.style.left = `${Number(STYLE.getPropertyValue('left').slice(0, -2)) - enemyObj.encounterOffsetX}px`;
          break;
        case "up":
          playfield_player.style.top = `${Number(STYLE.getPropertyValue('top').slice(0, -2)) + enemyObj.encounterOffsetY}px`;
          break;
        case "down":
          playfield_player.style.top = `${Number(STYLE.getPropertyValue('top').slice(0, -2)) - enemyObj.encounterOffsetY}px`;
          break;
        default:
          break;
      };
      playfield_player.style.zIndex = "1";
      shake();
      setTimeout(() => {
        const source = audioContext.createBufferSource();
        source.buffer = encounterStartAudioBuffer;
        source.connect(audioContext.destination);
        source.start(audioContext.currentTime, 0, 1);
        transitionDiv = document.createElement("div");
        const crtLine = document.createElement("div");
        transitionDiv.className = "pf_transitionDiv";
        crtLine.className = "crt-lines";
        transitionDiv.appendChild(crtLine);
        battleBox.appendChild(transitionDiv);
        let interval = setInterval(() => {
          transitionStep++;
          let scaleX = 1 + (10.5 - 1) * (transitionStep / 11);
          let scaleY = 1 + (9.4 - 1) * (transitionStep / 11);
          transitionDiv.style.transform = `matrix3d(${scaleX}, 0, 0, 0, 0, ${scaleY}, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`;
          if (transitionStep >= 11) {
            clearInterval(interval);
            p2();
          };
        }, 75); // Adjust the interval time as needed
      }, 1500);
      function p2() {
        // blanking out the battleBox for the encounterBox.
        playfield_grid.style.visibility = "hidden";
        playfield_player.style.visibility = "hidden";
        map_controls_left.style.visibility = "hidden";
        map_controls_right.style.visibility = "hidden";
        map_controls_up.style.visibility = "hidden";
        map_controls_down.style.visibility = "hidden";
        map_controls_mask.style.visibility = "hidden";
        battle_tile_origin.style.visibility = "hidden";
        // Starting the encounterBox.
        playfield_encounterDiv.style.visibility = "visible";
        // Bootstrapping the player.
        playfield_encounterPlayer_health.innerHTML = `♥${playerObj.health}`;
        // Bootstrapping the enemy.
        playfield_encounterEnemy_name.innerHTML = enemyObj.name;
        playfield_encounterEnemy_sprite.style.backgroundImage = `url("${enemyObj.sprite}")`;
        playfield_encounterEnemy_health.innerHTML = `♥${enemyObj.health}`;
        curEnemyObj = enemyObj;

        setTimeout(() => {
          transitionStep = 0;
          let interval = setInterval(() => {
            transitionStep++;
            let scaleX = 10.5 - (10.5 - 1) * (transitionStep / 11);
            let scaleY = 9.4 - (9.4 - 1) * (transitionStep / 11);
            transitionDiv.style.transform = `matrix3d(${scaleX}, 0, 0, 0, 0, ${scaleY}, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`;
            if (transitionStep >= 11) {
              clearInterval(interval);
              transitionDiv.style.visibility = "hidden";
              window.electron.send("encounter_started");
            };
          }, 75); // Adjust the interval time as needed
        }, 1500);
      };
    }
    else {
      switch (position[2]) {
        case "right":
          console.log('t', STYLE.getPropertyValue('left'))
          map_controls_right.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
          if (position[0] % 4 === 0 && position[0] !== 0) {
            // Player was about to move out of the viewport, adjust viewport and player to reflect.
            playfield_grid.style.left = `${Number(window.getComputedStyle(playfield_grid).getPropertyValue('left').slice(0, -2)) - 112}px`;
            playfield_player.style.left = `${Number(STYLE.getPropertyValue('left').slice(0, -2)) - 112}px`;
            hasScrolledOnce = true;
          };
          playfield_player.style.left = `${Number(STYLE.getPropertyValue('left').slice(0, -2)) + 28}px`;
          break;
        case "left":
          map_controls_left.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
          if (hasScrolledOnce && position[0] % 2 === 0) {
            // Player was about to move out of the viewport, adjust viewport and player to reflect.
            playfield_grid.style.left = `${Number(window.getComputedStyle(playfield_grid).getPropertyValue('left').slice(0, -2)) + 56}px`;
            playfield_player.style.left = `${Number(STYLE.getPropertyValue('left').slice(0, -2)) + 56}px`;
          };
          playfield_player.style.left = `${Number(STYLE.getPropertyValue('left').slice(0, -2)) - 28}px`;
          break;
        case "up":
          map_controls_up.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
          playfield_player.style.top = `${Number(STYLE.getPropertyValue('top').slice(0, -2)) - 10}px`;
          break;
        case "down":
          map_controls_down.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
          playfield_player.style.top = `${Number(STYLE.getPropertyValue('top').slice(0, -2)) + 10}px`;
          break;
        default:
          map_controls_right.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
          map_controls_left.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
          map_controls_up.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
          map_controls_down.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
          break;
      }
      playSelectSfx();
      setTimeout(() => { map_controls_mask.style.visibility = "hidden"; }, 500);
    }
  } else {
    // Player did not move, closing control block overlay.
    playAttackSfx();
    map_controls_mask.style.visibility = "hidden";
  }
});

window.electron.receive("battleBox_startEncounter", (enemyTile) => {
  let curBtnIndex = 0;
  let btnList = [playfield_encounterControls_btn1, playfield_encounterControls_btn2, playfield_encounterControls_btn3, playfield_encounterControls_btn4];
  // Attack button logic.
  // --------------------
  playfield_encounterControls_btn1.addEventListener("mouseover", () => {
    playfield_encounterControls_btn1.style.backgroundColor = "#ffcc00";
    playfield_encounterControls_btn1_h1.style.color = "#110d00";
  });
  playfield_encounterControls_btn1.addEventListener("mouseleave", () => {
    playfield_encounterControls_btn1.style.backgroundColor = "";
    playfield_encounterControls_btn1_h1.style.color = "#ffcc00";
  });
  playfield_encounterControls_btn1.addEventListener("mousedown", () => {
    playfield_encounterControl_mask.style.visibility = "visible";
    playSelectSfx();
    // Attack button.
    if (curEnemyObj.health > 0 && isPlayerTurn) {
      // Process the damage.
      let baseDamage = 5;
      baseDamage += Math.floor(playerObj.xp / 100) * 1.5; // Add level scaling to the damage.
      baseDamage = Math.ceil(baseDamage * playerObj.attackCo); // Add attack co-efficient to the damage.
      console.log("Base damage: ", baseDamage);
      curEnemyObj.health -= baseDamage;
      if (curEnemyObj.health <= 0) {
        playfield_encounterEnemy_sprite.style.backgroundImage = `url()`;
      };
      const source = audioContext.createBufferSource();
      source.buffer = movePlayerPunchSfxBuffer;
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.8; // Set volume to 60%
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      source.start(audioContext.currentTime, 0, 1);
      playfield_encounterEnemy_health.innerHTML = `♥${curEnemyObj.health}`;
      shake(true, true);
      setTimeout(() => {
        queueAIturn();
      }, 1000);
    } else {
      // No damage to deal. ignore the press.
    }
  });
  // Special button logic.
  // ---------------------
  playfield_encounterControls_btn2.addEventListener("mouseover", () => {
    playfield_encounterControls_btn2.style.backgroundColor = "#ffcc00";
    playfield_encounterControls_btn2_h1.style.color = "#110d00";
  });
  playfield_encounterControls_btn2.addEventListener("mouseleave", () => {
    playfield_encounterControls_btn2.style.backgroundColor = "";
    playfield_encounterControls_btn2_h1.style.color = "#ffcc00";
  });
  playfield_encounterControls_btn2.addEventListener("mousedown", () => { });
  // Defense button logic.
  // ---------------------
  playfield_encounterControls_btn3.addEventListener("mouseover", () => {
    playfield_encounterControls_btn3.style.backgroundColor = "#ffcc00";
    playfield_encounterControls_btn3_h1.style.color = "#110d00";
  });
  playfield_encounterControls_btn3.addEventListener("mouseleave", () => {
    playfield_encounterControls_btn3.style.backgroundColor = "";
    playfield_encounterControls_btn3_h1.style.color = "#ffcc00";
  });
  playfield_encounterControls_btn3.addEventListener("mousedown", () => {
    playfield_encounterControl_mask.style.visibility = "visible";
    playSelectSfx();
    setTimeout(() => {
      playfield_encounterPlayer_face.style.backgroundImage = `url("sprite/moves/anim_crying_1.gif")`;
      playfield_encounterPlayer_face.style.width = "64px";
      playfield_encounterPlayer_face.style.height = "64px";
      playfield_encounterPlayer_face.style.backgroundSize = "42px 42px";
      playfield_encounterPlayer_face.style.left = "-3px";
      playfield_encounterPlayer_face.style.top = "9px";
      const source = audioContext.createBufferSource();
      source.buffer = crySfxBuffer;
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.2; // Set volume to 60%
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      source.start(audioContext.currentTime, 0, 1);
      setTimeout(() => {
        isDefending = true;
        queueAIturn(); // We are defending, set flag to true.
      }, 1500)
    }, 1000);
  });
  // Flee button logic.
  // ------------------
  playfield_encounterControls_btn4.addEventListener("mouseover", () => {
    playfield_encounterControls_btn4.style.backgroundColor = "#ffcc00";
    playfield_encounterControls_btn4_h1.style.color = "#110d00";
  });
  playfield_encounterControls_btn4.addEventListener("mouseleave", () => {
    playfield_encounterControls_btn4.style.backgroundColor = "";
    playfield_encounterControls_btn4_h1.style.color = "#ffcc00";
  });
  playfield_encounterControls_btn4.addEventListener("mousedown", () => {
    playfield_encounterControl_mask.style.visibility = "visible";
    playSelectSfx();
    setTimeout(() => {
      // attempt to flee.
      var fleeChance = Math.floor(Math.random() * 100);
      if (fleeChance > 70) {
        // Flee success!
        playfield_encounterPlayer_health.style.visibility = "hidden";
        playfield_encounterPlayer_name.style.visibility = "hidden";
        playfield_encounterPlayer.style.animation = "flee-success 3s forwards";
        setTimeout(() => {
          playSelectSfx();
          playfield_encounterPlayer_flee_h1.style.visibility = "visible";
          setTimeout(() => {
            const source = audioContext.createBufferSource();
            source.buffer = fleeGlitchSfxBuffer;
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 0.6; // Set volume to 60%
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            source.start(audioContext.currentTime, 0, 1);
            playfield_encounterPlayer_flee_h1.style.visibility = "hidden";
            playfield_encounterPlayer.style.animation = "";
            playfield_encounterDiv.style.visibility = "hidden";
            playfield_grid.style.visibility = "visible";
            playfield_player.style.visibility = "visible";
            map_controls_left.style.visibility = "visible";
            map_controls_right.style.visibility = "visible";
            map_controls_up.style.visibility = "visible";
            map_controls_down.style.visibility = "visible";
            map_controls_mask.style.visibility = "hidden";
            battle_tile_origin.style.visibility = "visible";
            playfield_encounterControl_mask.style.visibility = "hidden";
            playfield_encounterPlayer.style.animation = "";
            let direction = null;
            let STYLE = window.getComputedStyle(playfield_player);
            switch (movementDirection) {
              case "left":
                direction = "right";
                playfield_player.style.left = `${Number(STYLE.getPropertyValue('left').slice(0, -2)) + 56}px`;
                break;
              case "right":
                direction = "left";
                playfield_player.style.left = `${Number(STYLE.getPropertyValue('left').slice(0, -2)) - 112}px`;
                break;
              case "up":
                direction = "down";
                playfield_player.style.top = `${Number(STYLE.getPropertyValue('top').slice(0, -2)) - 10}px`; break;
              case "down":
                direction = "up";
                playfield_player.style.top = `${Number(STYLE.getPropertyValue('top').slice(0, -2)) + 10}px`;
                break;
            }
            window.electron.send("attemptMove", direction);
          }, 5000); // let linger for 5 seconds that exit encounter.
        }, 3000);
      } else {
        // Flee failed.
        playfield_encounterPlayer_health.style.visibility = "hidden";
        playfield_encounterPlayer_name.style.visibility = "hidden";
        playfield_encounterPlayer.style.animation = "flee-fail 3s forwards";
        setTimeout(() => {
          playfield_encounterPlayer_health.style.visibility = "visible";
          playfield_encounterPlayer_name.style.visibility = "visible";
          playfield_encounterPlayer.style.animation = "";
          isPlayerTurn = false;
          queueAIturn();
        }, 3000);
      }
    }, 1000);
  });
});

function clearPlayerCrying() {
  playfield_encounterPlayer_face.style.backgroundImage = `url("faces/default_idle.png")`;
  playfield_encounterPlayer_face.style.width = "";
  playfield_encounterPlayer_face.style.height = "";
  playfield_encounterPlayer_face.style.backgroundSize = "";
  playfield_encounterPlayer_face.style.left = "";
  playfield_encounterPlayer_face.style.top = "";
}

function move_anim_popCharge(callback) {
  setTimeout(() => {
    const source = audioContext.createBufferSource();
    source.buffer = movePopChargeSfxBuffer;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.6; // Set volume to 60%
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start(audioContext.currentTime, 0, 1);
    playfield_encounterEnemy_sprite.style.backgroundImage = `url("sprite/moves/sprite_enemy_1_1_1.png")`;
    setTimeout(() => {
      playfield_encounterEnemy_sprite.style.backgroundImage = `url("sprite/moves/sprite_enemy_1_1_2.png")`;
      setTimeout(() => {
        playfield_encounterEnemy_sprite.style.backgroundImage = `url("sprite/moves/sprite_enemy_1_1_3.png")`;
        source.stop(); // Stop the sound after the animation is done.
        isAIMoveCharging--; // Decrement the charge counter.
        callback();
      }, 100)
    }, 100)
  }, 100)
}; // Done
function move_anim_pop(callback) {
  setTimeout(() => {
    const source = audioContext.createBufferSource();
    source.buffer = movePopSfxBuffer;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.2; // Set volume to 60%
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start(audioContext.currentTime, 0, 1);
    let damage = Math.floor(AIMoveDict["pop"].value + (curEnemyObj.lvl * 1.5));
    if (isDefending) {
      damage = Math.ceil(damage * .80); // Reduces damage by 80% if defending.
    };
    console.log(playerObj.health, damage);
    playerObj.health -= damage;
    playfield_encounterEnemy_sprite.style.backgroundImage = `url("sprite/moves/sprite_enemy_1_1_4.png")`;
    playfield_encounterPlayer_health.innerHTML = `♥${playerObj.health}`;
    playAttackSfx();
    shake(false, true);
    setTimeout(() => {
      playfield_encounterEnemy_sprite.style.backgroundImage = `url("sprite/moves/sprite_enemy_1_1_5.png")`;
      setTimeout(() => {
        playfield_encounterEnemy_sprite.style.backgroundImage = `url("sprite/moves/sprite_enemy_1_1_6.png")`;
        setTimeout(() => {
          isAIMoveCharging = false; // Reset the charging state.
          chargingAIMoveObj = null; // Reset the charging move object.
          callback();
        }, 1000)
      }, 100)
    }, 100)
  }, 100)
}; // Done
function move_anim_whip(callback) {
  setTimeout(() => {
    const source = audioContext.createBufferSource();
    source.buffer = moveWhipSfxBuffer;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.8; // Set volume to 80%
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    let damage = Math.floor(AIMoveDict["whip"].value + (curEnemyObj.lvl * 1.5));
    if (isDefending) {
      damage = Math.ceil(damage * .80); // Reduces damage by 80% if defending.
    };
    console.log(playerObj.health, damage);
    playerObj.health -= damage;
    playfield_encounterEnemy_sprite.style.width = "84px";
    playfield_encounterEnemy_sprite.style.height = "47px";
    playfield_encounterEnemy_sprite.style.left = "-49px";
    playfield_encounterEnemy_sprite.style.backgroundImage = `url("sprite/moves/sprite_enemy_1_2_1.png")`;
    playfield_encounterPlayer_health.innerHTML = `♥${playerObj.health}`;
    setTimeout(() => {
      playfield_encounterEnemy_sprite.style.backgroundImage = `url("sprite/moves/sprite_enemy_1_2_2.png")`;
      setTimeout(() => {
        playfield_encounterEnemy_sprite.style.backgroundImage = `url("sprite/moves/sprite_enemy_1_2_3.png")`;
        setTimeout(() => {
          source.start(audioContext.currentTime, 0, 1);
          playfield_encounterEnemy_sprite.style.backgroundImage = `url("sprite/moves/sprite_enemy_1_2_4.png")`;
          playAttackSfx();
          shake(false, true);
          setTimeout(() => {
            playfield_encounterEnemy_sprite.style.width = "";
            playfield_encounterEnemy_sprite.style.height = "";
            playfield_encounterEnemy_sprite.style.left = "";
            playfield_encounterEnemy_sprite.style.backgroundImage = `url("sprite/sprite_enemy_1.png")`;
            callback();
          }, 100)
        }, 100);
      }, 100);
    }, 100);
  }, 100);
};
function move_anim_spray(callback) {
};
function move_anim_crackOpen(callback) {
};
function move_anim_hold(callback) {
};

function queueAIturn() {
  isPlayerTurn = false;
  if (curEnemyObj.health <= 0) {
    // If enemy is dead, add player XP relative to overkill damage dealt.
    let overkillDamage = Math.abs(curEnemyObj.health);
    playerObj.xp += (overkillDamage * 5) + (curEnemyObj.health);
    console.log("Overkill XP Bonus: ", (overkillDamage * 5));
    console.log("AI defeated, player XP: ", playerObj.xp);
    playDeathSfx();
    setTimeout(() => {
      playfield_encounterEnemy_sprite.style.backgroundImage = `url(sprite/sprite_enemy_dead_1.png)`;
      setTimeout(() => {
        playfield_encounterEnemy_sprite.style.backgroundImage = `url()`;
        playfield_encounterEnemy_health.innerHTML = ``;
        playfield_encounterEnemy_name.innerHTML = "";
        var popupElement = document.createElement("h1");
        popupElement.className = "popupLvl popupKillLvl";
        popupElement.id = "popupLvl";
        popupElement.textContent = `+${5}xp`; // TODO: MAKE THIS REFLECT THE CORRECT LEVEL.
        scanlines.appendChild(popupElement);
        var audioElement = document.createElement("audio");
        audioElement.src = "sfx/foodPopupSfx.wav"; // Replace "your_sound_effect.mp3" with the path to your sound effect file
        audioElement.volume = 0.2; // Adjust the volume as needed
        audioElement.autoplay = true;
        popupElement.appendChild(audioElement);
        setTimeout(function () {
          console.log("removing popup.");
          scanlines.removeChild(popupElement);
          playfield_encounterControls_exitBtn.style.visibility = "visible";
        }, 1500);
      }, 1000);
    }, 1500);
  } else {
    if (isAIMoveCharging !== false) {
      if (isAIMoveCharging == 0) {
        // AI move is ready.
        chargingAIMoveObj.attackAnimation(() => {
          playfield_encounterEnemy_sprite.style.backgroundImage = `url("${curEnemyObj.sprite}")`;
          isPlayerTurn = true;
          playfield_encounterControl_mask.style.visibility = "hidden";
          if (isDefending) {
            clearPlayerCrying();
            isDefending = false;
          };
          playSelectSfx();
        });
      } else {
        // AI move is still charging.
        // TODO: add a text popup like "passed" or something above the enemy to indicate to the player that the AI is still charging their attack.
        isAIMoveCharging--; // Decrement the charge counter.
        isPlayerTurn = true;
        playfield_encounterControl_mask.style.visibility = "hidden";
        if (isDefending) {
          clearPlayerCrying();
          isDefending = false;
        };
        playSelectSfx();
      }
    }
    else {
      setTimeout(() => {
        // AI move sequence.
        let AIattacksAmount = 1; // The amount of attacks to fill the choice pool with.
        let AIdefenceAmount = 1; // The amount of defences to fill the choice pool with.
        let AIchoicePool = []; // The pool of possible choices the AI can make. randomly filled with attacks and defences.
        let AIfleeChance = 10; // 1% chance to flee.
        /* Basically the AI logic will pick a move to make whether it is defence, attack, or even flee
         based on a random length pool filled with a semi-determinate amount of choices based on the
         unit(ie, enemy1 might only have 2 attacks 1 defence, while enemy5 might have 9 attacks 1 defence)
         enemy1,2,etc is based on the `face` property of the Enemy. a random number generator will then
         pick a move inside the choicePool after it has been fully populated and the AI will make its move. */
        switch (curEnemyObj.id) {
          case 1:
            AIfleeChance = 25;
            AIdefenceAmount = 0;
            AIattacksAmount = 3;
            break;
          case 2:
            AIfleeChance = 10;
            AIdefenceAmount = 1;
            AIattacksAmount = 4;
            break;
          case 3:
            AIfleeChance = 0;
            AIdefenceAmount = 4;
            AIattacksAmount = 3;
            break;
          case 4:
            AIfleeChance = 0;
            AIdefenceAmount = 5;
            AIattacksAmount = 2;
            break;
          case 5:
            AIfleeChance = 25;
            AIdefenceAmount = 2;
            AIattacksAmount = 5;
            break;
          case 6:
            AIfleeChance = 15;
            AIattacksAmount = 7;
            AIdefenceAmount = 3;
            break;
        }
        // Populate the pool with attacks.
        for (let x = 0; x < AIattacksAmount; x++) {
          let randomIndex;
          do {
            randomIndex = Math.ceil(Math.random() * (AIattacksAmount + AIdefenceAmount));
          } while (AIchoicePool[randomIndex] !== undefined);
          AIchoicePool[randomIndex] = curEnemyObj.attacks[Math.ceil(Math.random() * curEnemyObj.attacks.length - 1)];
        }
        // Populate the pool with defences.
        for (let x = 0; x < AIdefenceAmount; x++) {
          let randomIndex;
          do {
            randomIndex = Math.ceil(Math.random() * (AIattacksAmount + AIdefenceAmount));
          } while (AIchoicePool[randomIndex] !== undefined);
          AIchoicePool[randomIndex] = curEnemyObj.defences[Math.ceil(Math.random() * curEnemyObj.defences.length - 1)];
        }
        // Prune out any empty values from the array.
        let tempPool = [];
        for (let x = 0; x < AIchoicePool.length; x++) {
          if (AIchoicePool[x] !== undefined) {
            tempPool.push(AIchoicePool[x]);
          };
        };
        AIchoicePool = tempPool;
        console.log("AIchoicePool: ", AIchoicePool);
        // Check if AI is below 40% and if a flee chance is a success.
        // TODO: overhaul the flee chance.
        if (curEnemyObj.health < (curEnemyObj.health * 0.40) && (Math.random() * 100 < AIfleeChance)) {
          console.log("AI fled the battle!");
          window.electron.send("encounter_enemy_fled");
        } else {
          // AI failed the flee chance, proceed to executing a move
          let choiceIndex = Math.ceil(Math.random() * AIchoicePool.length - 1);
          console.log("AI choice index: ", choiceIndex);
          console.log("AIMoveDict: ", AIMoveDict);
          let move = AIMoveDict[AIchoicePool[choiceIndex]];
          console.log("AI move: ", move);
          if (move.charge) {
            isAIMoveCharging = move.chargeTime; // Set the AI move to charge.
            chargingAIMoveObj = move; // Set the charging move object
            console.log("AI move is charging: ", move);
            move.chargeAnimation(() => {
              isPlayerTurn = true;
              playfield_encounterControl_mask.style.visibility = "hidden";
              if (isDefending) {
                clearPlayerCrying();
                isDefending = false;
              };
              playSelectSfx();
            });
          } else {
            move.attackAnimation(() => {
              playfield_encounterEnemy_sprite.style.backgroundImage = `url("${curEnemyObj.sprite}")`;
              isPlayerTurn = true;
              playfield_encounterControl_mask.style.visibility = "hidden";
              if (isDefending) {
                clearPlayerCrying();
                isDefending = false;
              };
              playSelectSfx();
            });
          };
        };
      }, 1000);
    }
  }
}

playfield_encounterControls_exitBtn.addEventListener("mouseover", () => {
  playSelectSfx();
  playfield_encounterControls_exitBtn.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
})
playfield_encounterControls_exitBtn.addEventListener("mouseleave", () => {
  playfield_encounterControls_exitBtn.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
})
playfield_encounterControls_exitBtn.addEventListener("mousedown", () => {
  playSelectSfx();
  playfield_encounterControls_exitBtn.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
  setTimeout(() => {
    playfield_encounterControls_exitBtn.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
    playfield_encounterControl_mask.style.visibility = "hidden";
    playfield_encounterControls_exitBtn.style.visibility = "hidden";
    playfield_encounterControls_btn1.style.visibility = "hidden";
    playfield_encounterControls_btn2.style.visibility = "hidden";
    playfield_encounterControls_btn3.style.visibility = "hidden";
    playfield_encounterControls_btn4.style.visibility = "hidden";
    playfield_encounterPlayer_health.innerHTML = ``;
    setTimeout(() => {
      // Remove the enemy element since hes been defeated.
      playfield_grid.style.visibility = "visible";
      playfield_encounterDiv.style.visibility = "hidden";
      console.log(curEnemyObj, "curenemyojb");
      console.log("enemyTileDeleteIndex", (curEnemyTile.coordX * (levelObj.gridHeight - 1) + curEnemyTile.coordY) + 1);
      playfield_grid.children.item((curEnemyTile.coordX * levelObj.gridHeight + curEnemyTile.coordY) + 1).children.item(0).remove();
      levelObj.tiles[curEnemyTile.coordX][curEnemyTile.coordY].enemy = null;
      map_controls_down.style.visibility = "visible";
      map_controls_up.style.visibility = "visible";
      map_controls_left.style.visibility = "visible";
      map_controls_right.style.visibility = "visible";
      battle_tile_origin.style.visibility = "visible";
      let STYLE = window.getComputedStyle(playfield_player);
      switch (movementDirection) {
        case "right":
          playfield_player.style.left = `${Number(STYLE.getPropertyValue('left').slice(0, -2)) + 28}px`;
          break;
        case "left":
          playfield_player.style.left = `${Number(STYLE.getPropertyValue('left').slice(0, -2)) - 28}px`;
          break;
        case "up":
          playfield_player.style.top = `${Number(STYLE.getPropertyValue('top').slice(0, -2)) - 10}px`;
          break;
        case "down":
          playfield_player.style.top = `${Number(STYLE.getPropertyValue('top').slice(0, -2)) + 10}px`;
          break;
      }
      window.electron.send("encounter_enemy_defeated");
      // TODO: Implement the grid updating when a enemy is killed
    }, 1000);
  }, 150);
})

window.electron.receive("battleBox_endEncounter", () => {
  // Clear out the encounter screen and restore the battleBox playfield/controls
  playfield_encounterDiv.style.visibility = "hidden";
  playfield_grid.style.visibility = "visible";
  playfield_player.style.visibility = "visible";
});