const path = window.electronRequire("path");

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
const battleEnemy = document.getElementById("battleEnemy");
const battleEnemyName = document.getElementById("battle_enemy_name");
const battleEnemyHP = document.getElementById("battle_enemy_hp");
const battleEnemyStatbox = document.getElementById("battle_enemy_statbox");
const battleClickBtn = document.getElementById("battle_click_btn");
const battlePal = document.getElementById("battlePal");
const battlePalName = document.getElementById("battle_pal_name");
const battlePalHP = document.getElementById("battle_pal_hp");
const deathSound = document.getElementById("deathSound");
const battleTimer = document.getElementById("battleTimer");
const battleNextBtn = document.getElementById("battle_next_btn");
const battleBossBanner = document.getElementById("bossBanner");
const bossAlertSound = document.getElementById("bossAlertSound");
const battlePalStat = document.getElementById("battle_pal_stat");
const battleBoxDead = document.getElementById("battle_box_dead");
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
const heartchainSfx2 = document.getElementById("heartchainSound2")
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
const battleBoxSplashCont = document.getElementById("battleBoxSplashCont");
const battleBoxSplashBtn = document.getElementById("battleBoxSplashBtn");
const updateNotes = document.getElementById("updateNotes");
const updateBtn = document.getElementById("updateBtn");
const updateBtnSkip = document.getElementById("updateBtnSkip");
const updateCont = document.getElementById("updateCont");
const updateLoading = document.getElementById("updateLoading");
const updateVer = document.getElementById("updateH1_1");

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

function moveFace() {
  var left = bFace.style.getPropertyValue("left");
  // Move the div
  if (left == "24px") {
    bFace.style.left = "18px";
  } else if (left == "18px") {
    bFace.style.left = "24px";
  } else if (left == "30px") {
    bFace.style.left = "24px";
  } else {
    bFace.style.left = "30px";
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
    case 0:
      foodBox.style.visibility = "hidden";
      foodBtn.style.backgroundImage = "";
      invBox.style.visibility = "hidden";
      invBtn.style.backgroundImage = "";
      battleBox.style.visibility = "hidden";
      battleBtn.style.backgroundImage = "";
    case 1:
      infoBox.style.visibility = "hidden";
      infoBtn.style.backgroundImage = "";
      invBox.style.visibility = "hidden";
      invBtn.style.backgroundImage = "";
      battleBox.style.visibility = "hidden";
      battleBtn.style.backgroundImage = "";
      break;
    case 2:
      infoBox.style.visibility = "hidden";
      infoBtn.style.backgroundImage = "";
      foodBox.style.visibility = "hidden";
      foodBtn.style.backgroundImage = "";
      battleBox.style.visibility = "hidden";
      battleBtn.style.backgroundImage = "";
      break;
    case 3:
      infoBox.style.visibility = "hidden";
      infoBtn.style.backgroundImage = "";
      invBox.style.visibility = "hidden";
      invBtn.style.backgroundImage = "";
      foodBox.style.visibility = "hidden";
      foodBtn.style.backgroundImage = "";
      break;
    case 4:
      infoBox.style.visibility = "hidden";
      infoBtn.style.backgroundImage = "";
      foodBox.style.visibility = "hidden";
      foodBtn.style.backgroundImage = "";
      invBox.style.visibility = "hidden";
      invBtn.style.backgroundImage = "";
      battleBox.style.visibility = "hidden";
      battleBtn.style.backgroundImage = "";
      break;
    default:
      foodBox.style.visibility = "hidden";
      foodBtn.style.backgroundImage = "";
      invBox.style.visibility = "hidden";
      invBtn.style.backgroundImage = "";
      battleBox.style.visibility = "hidden";
      battleBtn.style.backgroundImage = "";
  }
}
infoBtn.onmouseover = () => {
  if (!infoOpen) {
    playSelectSfx();
    infoBox.style.visibility = "visible";
    infoBtn.style.backgroundImage = `url("sprite/sprite_info_i.png")`;
  }
};
infoBtn.onmouseout = () => {
  if (!infoOpen) {
    infoBox.style.visibility = "hidden";
    infoBtn.style.backgroundImage = `url("sprite/sprite_info.png")`;
  }
};
infoBtn.onmousedown = () => {
  closeAnyOpenPanels(0);
  if (infoOpen) {
    infoOpen = false;
    infoBox.style.visibility = "hidden";
  } else {
    infoOpen = true;
    infoBox.style.visibility = "visible";
  }
  if (infoBox.style.visibility == "visible") {
    infoBtn.style.backgroundImage = `url("sprite/sprite_info.png")`;
    setTimeout(() => {
      infoBtn.style.backgroundImage = `url("sprite/sprite_info_i.png")`;
    }, 150);
  } else {
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
  if (foodBox.style.visibility == "visible") {
    foodBox.style.visibility = "hidden";
    foodBtn.style.backgroundImage = `url("sprite/sprite_food.png")`;
    setTimeout(() => {
      foodBtn.style.backgroundImage = "";
    }, 150);
  } else {
    foodBox.style.visibility = "visible";
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
  if (invBox.style.visibility == "visible") {
    invBox.style.visibility = "hidden";
    invBtn.style.backgroundImage = `url("sprite/sprite_inv.png")`;
    setTimeout(() => {
      invBtn.style.backgroundImage = "";
    }, 150);
  } else {
    invBox.style.visibility = "visible";
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
  if (battleBox.style.visibility == "visible") {
    battleBox.style.visibility = "hidden";
    battleBtn.style.backgroundImage = `url("sprite/sprite_battle.png")`;
    setTimeout(() => {
      battleBtn.style.backgroundImage = "";
    }, 150);
  } else {
    battleBox.style.visibility = "visible";
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
  if (settingsBox.style.visibility == "visible") {
    settingsBox.style.visibility = "hidden";
    settingsBtn.style.backgroundImage = `url("sprite/sprite_settings.png")`;
    setTimeout(() => {
      settingsBtn.style.backgroundImage = "";
    }, 150);
  } else {
    settingsBox.style.visibility = "visible";
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
  battleBoxDead.style.visibility = "";
  sacrificeBtn.style.visibility = "";
}); // Kill the pal.

window.electron.receive("alivePal", (bool) => {
  console.log("pal alived.");
  bFace.setAttribute("src", "faces/default_idle.png");
  moveFace();
  battleBoxDead.style.visibility = "hidden";
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

function shake(selector) {
  var enemy;
  if (selector) {
    enemy = battlePal;
  } else {
    enemy = battleEnemy;
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

battleClickBtn.addEventListener("mouseover", () => {
  battleClickBtn.style.backgroundImage = `url("sprite/sprite_battle_i.png")`;
  playSelectSfx();
});
battleClickBtn.addEventListener("mouseleave", () => {
  battleClickBtn.style.backgroundImage = `url("sprite/sprite_battle.png")`;
});
battleClickBtn.addEventListener("mousedown", () => {
  playAttackSfx();
  window.electron.send("battle-click");
  battleClickBtn.style.backgroundImage = `url("sprite/sprite_battle.png")`;
  shake();
  setTimeout(() => {
    battleClickBtn.style.backgroundImage = `url("sprite/sprite_battle_i.png")`;
  }, 50);
  // send a click event to the main script.
});

function playDeathSfx() {
  if (audioEnabled) {
    deathSound.currentTime = 0; // Rewind the sound to the beginning
    deathSound.play(); // Play the sound
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
    };
  };
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
    battleBox.removeChild(popupElement);
    battleBox.removeChild(audioElement);
  }, 1500); // 1500 milliseconds = 1.5 seconds
}

battleNextBtn.addEventListener("mouseover", () => {
  battleNextBtn.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
  playSelectSfx();
});
battleNextBtn.addEventListener("mouseleave", () => {
  battleNextBtn.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
});
battleNextBtn.addEventListener("mousedown", () => {
  battleNextBtn.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
  playSelectSfx();
  setTimeout(() => {
    battleNextBtn.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
    window.electron.send("advanceEnemy");
  }, 150);
});

var killingEnemy = false;
var battleSplashClick = false;

battleBoxSplashBtn.addEventListener("mouseover", () => {
  battleBoxSplashBtn.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
});
battleBoxSplashBtn.addEventListener("mouseleave", () => {
  battleBoxSplashBtn.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
});
battleBoxSplashBtn.addEventListener("mousedown", () => {
  battleBoxSplashBtn.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
  if (!battleSplashClick) {
    battleBoxSplashClick = true;
    setTimeout(() => {
      battleBoxSplashBtn.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
      window.electron.send("battleBoxStarted");
      battleBoxSplashClick = false;
      battleBoxSplashCont.style.display = "none";
    }, 150);
  }
});

window.electron.receive("initBattlebox", () => {
  // Adds a splash infront of battlebox to allow the user to start the first battle(instead of it auto starting).
  battleBoxSplashCont.style.display = "block";
});

window.electron.receive("setEnemy", (enemyObj) => {
  enemy = enemyObj;
  if (enemy.health == 0 && firstSetEnemy == true) {
    // enemy was dead on startup.
    firstSetEnemy = false;
    battleClickBtn.style.visibility = "hidden";
    battleEnemyHP.innerHTML = `D E A D`;
    battleEnemyName.innerHTML = `${enemyObj.name}`;
    battleEnemy.style.visibility = "hidden";
    battleTimer.innerHTML = `--`;
    battleNextBtn.style.visibility = "";
    console.log("Enemy loaded as dead.");
  } else {
    // enemy still alive, process.
    battleEnemyHP.innerHTML = `HP: ${enemyObj.health}`;
    battleEnemyName.innerHTML = `${enemyObj.name}`;
    battleEnemy.style.backgroundImage = `url("sprite/sprite_enemy_${enemyObj.face}.png")`;
    battleTimer.innerHTML = `${enemyObj.ttk}s`;
    console.log("Enemy updated.");
  }
});

window.electron.receive("killEnemy", (enemyObj) => {
  console.log("window killing enemy.");
  battleNextBtn.style.visibility = "hidden";
  // Enemy dead, process.
  killingEnemy = true;
  enemy = enemyObj;
  battleClickBtn.style.visibility = "hidden";
  battleEnemyHP.innerHTML = `D E A D`;
  battleEnemy.style.visibility = "hidden";
  battleTimer.innerHTML = "--";
  playDeathSfx();
  setTimeout(() => {
    battleEnemy.style.backgroundImage = `url("sprite/sprite_enemy_dead_1.png")`;
    battleEnemy.style.visibility = "";
    setTimeout(() => {
      // Wrap up current enemy and generate new.
      battleEnemy.style.visibility = "hidden";
      // Drop random item.
      var itemId = weightedRandom();
      var itemName = "err";
      // -------------------------------------------------------------------------------|
      //                       |ITEM ID TABLE|                                          |
      //                       ---------------                                          |
      // 1 = orange, 2 = sweets, 3 = spice, 4 = BulletTime, 5 = lootbox, 6 = heartchain |
      // -------------------------------------------------------------------------------|
      switch (itemId) {
        case 1:
          itemName = "Orange";
          break;
        case 2:
          itemName = "Sweets";
          break;
        case 3:
          itemName = "Spice";
          break;
        case 4:
          itemName = "BulletTime";
          break;
        case 5:
          itemName = "Lootbox";
          break;
        case 6:
          itemName = "HeartChain";
          break;
      }
      var rand = Math.random(); // item drop quantity.
      if (rand < 0.80) {
        rand = 1;
      } else if (rand < 0.92) {
        rand = 2;
      } else {
        rand = 3;
      };
      if (enemyObj.boss == true) {
        rend = Math.random(); // item drop quantity.
        if (rend < 0.80) {
          rand += 3;
        } else if (rend < 0.92) {
          rand += 5;
        } else {
          rand += 7;
        };
      };
      popupItem(itemName, rand);
      window.electron.send("itemDropped", [itemId, rand]);
      battleNextBtn.style.visibility = "";
    }, 1500);
  }, 1000);
});

function weightedRandom() {
  // Define the weights for each number
  const weights = [
    { number: 1, weight: 20 }, // Higher chance
    { number: 2, weight: 50 }, // Highest chance
    { number: 3, weight: 10 }, // Higher chance
    { number: 4, weight: 5 },
    { number: 5, weight: 10 },
    { number: 6, weight: 5 },
  ];

  // Calculate the total weight
  const totalWeight = weights.reduce((total, item) => total + item.weight, 0);

  // Get a random number between 0 and totalWeight
  const randomWeight = Math.random() * totalWeight;

  // Determine which number corresponds to the random weight
  let cumulativeWeight = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulativeWeight += weights[i].weight;
    if (randomWeight < cumulativeWeight) {
      return weights[i].number;
    }
  }
}

window.electron.receive("timerDamage", (currentHealth) => {
  // Timer expired and needs to deal damage to pal.
  console.log("timerDamage triggered", currentHealth);
  health = currentHealth;
  if (health == 0) {
    // Out of health, kill it.
  } else {
    // Healthy enough, ruin it.
    health--;
    battlePalHP.innerHTML = `HP: ${health}`;
    battleClickBtn.style.visibility = "hidden";
    shake(true); // Shakes the bulletPal.
    playDeathSfx(); // Play sfx.
    setTimeout(() => {
      battleEnemyHP.innerHTML = "FLED";
      battleEnemyName.innerHTML = "";
      battleTimer.innerHTML = "--";
      battleEnemy.style.visibility = "hidden";
      playSelectSfx();
      battleNextBtn.style.visibility = "";
    }, 2500);
  }
});

window.electron.receive("neEnergy", (str) => {
  popupItem(str, 1, true);
});

window.electron.receive("nextEnemy", (enemyObj) => {
  enemy = enemyObj;
  console.log("nxtEnemy", enemy);
  console.log("generating next enemy and reseting battleBox");
  battleNextBtn.style.visibility = "hidden";
  setTimeout(() => {
    battleEnemyStatbox.style.visibility = "hidden";
    battleEnemyName.style.visibility = "hidden";
    setTimeout(() => {
      battlePalHP.style.visibility = "hidden";
      battlePalName.style.visibility = "hidden";
      battlePal.style.visibility = "hidden";
      battlePalStat.style.visibility = "hidden";
      setTimeout(() => {
        battleTimer.innerHTML = "";
        setTimeout(() => {
          p1();
        }, 1500);
      }, 500);
    }, 500);
  }, 500);
  function p1() {
    // Modify all elements to comply with new enemy.
    battleEnemyHP.innerHTML = `HP: ${enemy.health}`;
    battleEnemyName.innerHTML = enemy.name;
    battleEnemy.style.backgroundImage = `url("sprite/sprite_enemy_${enemy.face}.png")`;
    // Reshow all elements.
    battleEnemyStatbox.style.visibility = "";
    battleEnemyName.style.visibility = "";
    battleEnemy.style.visibility = "";
    battlePalHP.style.visibility = "";
    battlePalName.style.visibility = "";
    battlePal.style.visibility = "";
    battlePalStat.style.visibility = "";
    battleTimer.innerHTML = "--";
    playSelectSfx();
    if (enemy.boss == true) {
      battleBossBanner.style.display = "";
      bossAlertSound.currentTime = 0; // Rewind the sound to the beginning
      bossAlertSound.play(); // Play the sound
      setTimeout(() => {
        battleBossBanner.style.display = "none";
        p2();
      }, 7000);
    } else {
      p2();
    }
  }
  function p2() {
    setTimeout(() => {
      battleTimer.innerHTML = `${enemy.ttk}s`;
      killingEnemy = false;
      battleClickBtn.style.visibility = "";
      window.electron.send("startTTK");
    }, 500);
  }
});

window.electron.receive("setLevel", (levelData) => {
  console.log("setLevel", levelData);
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
                popupElement.textContent = "-Lvl 23";
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
  console.log('alerting item', name);
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
    };
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
    };
  };
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
    formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}h`;
  } else if (minutes > 0) {
    // Format as minutes:seconds
    formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}m`;
  } else {
    // Format as seconds
    formattedTime = `${String(seconds).padStart(2, '0')}s`;
  }

  return formattedTime;
};

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
  ;
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
    bPal.style.animation = "fade_in 3s 1"
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

  const items = ['Orange', 'Sweets', 'Spice', 'Medkit', 'BulletTime', 'Soda', 'Sword', 'Lootbox'];

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
    const lootboxItems = document.getElementById('lootboxItems');
    const itemDisplay = document.getElementById('itemDisplay');
    const landedItemDiv = document.getElementById('landedItem');
    const itemText = document.getElementById('itemText');
    const itemCount = document.getElementById('itemCount');

    // Resetting display elements for new spin
    lootboxItems.innerHTML = '';
    itemDisplay.style.display = 'none';
    lootboxItems.style.display = 'flex';
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

    randomItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'lootbox-item';
      itemDiv.style.backgroundImage = `url(sprite/sprite_${item}.png)`;
      lootboxItems.appendChild(itemDiv);
    });
    console.log(randomItems)

    const itemWidth = 50;
    const totalItems = randomItems.length;
    const totalWidth = (totalItems - 10) * itemWidth;
    const spinTimes = 3;
    const spinDistance = -(totalWidth - itemWidth * 2); // Distance to spin before final landing
    const finalPosition = -(landingIndex + additionalItemsBefore) * itemWidth; // Adjust final position to land on predetermined item

    // Add pixelated effect
    lootboxItems.classList.add('pixelated');

    lootboxItems.style.transition = 'none';
    lootboxItems.style.transform = `translateX(0px)`;

    setTimeout(() => {
      lootboxItems.style.transition = `transform ${spinTimes + 1}s cubic-bezier(0.33, 1, 0.68, 1)`;
      lootboxItems.style.transform = `translateX(${spinDistance}px)`;
    }, 50);


    setTimeout(() => {
      lootbox.style.display = "none";
      lootboxPointer.style.display = "none";
      lootboxItems.style.display = 'none';
      landedItemDiv.style.backgroundImage = `url(sprite/sprite_${predeterminedItem}.png)`;
      itemCount.innerText = `+${quantity}`;
      itemText.innerHTML = predeterminedItem;
      itemDisplay.style.display = 'flex';
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
};

function stopTutorialBackground() {
  tutorialBackgroundSfx.pause();
};

window.electron.receive("startTutorial", (name) => {
  username = name;
  setTimeout(() => {
    sidebar.style.display = "none";
    tutorialH1.style.display = "block";
    tutorialCont.style.display = "block";
    playSelectSfx();
    setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 1500)
  }, 500)
});

function tutAdvance() {
  var tutorials = [tut1, tut2, tut3, tut35, tut4, tut5, tut6, tut7, tut8, tut9, tut10, tut11, tut12, tut13, tut14, tut15, tut16, tut17, tut18, tut19, tut20, tut21]; // tutorial series script.
  tutorials[tutCt]();
};

function tut1() {
  playSelectSfx();
  tutorialH1.innerHTML = "I don't recognize you?";
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 1500)
};

function tut2() {
  playSelectSfx();
  tutorialH1.innerHTML = "";
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
};

function tut3() {
  playSelectSfx();
  tutorialH1.innerHTML = `${username}...`
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
  bFace.src = "faces/tutorial_1.png";
  bFace.style.left = "24px";
};
function tut35() {
  tutorialH1.innerHTML = "";
  tutCt++;
  setTimeout(() => { tutAdvance() }, 2500)
}

function tut4() {
  playSelectSfx();
  playTutorialBackground();
  tutorialH1.innerHTML = `Well Hi there!!!`;
  bFace.src = "faces/default_happy_2.png";
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
};

function tut5() {
  playSelectSfx();
  tutorialH1.style.top = "2px";
  tutorialH1.style.left = "28px";
  tutorialH1.style.width = "210px";
  tutorialH1.innerHTML = `I'm your Bullegachi, Your PC BulletPal companion!`;
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
};

function tut6() {
  playSelectSfx();
  tutorialNxtBtn.style.top = "112px"
  tutorialH1.innerHTML = `Before you can start keeping me alive there are a few things you should know..`
  tutorialH1.style.top = "2px";
  tutorialH1.style.left = "22px";
  tutorialH1.style.width = "220px";
  tutorialH1.style.fontSize = "18px";
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
}
function tut7() {
  playSelectSfx();
  infoBox.style.visibility = "";
  tutorialNxtBtn.style.top = "92px";
  tutorialH1.style.fontSize = "14px";
  tutorialH1.style.left = "22px";
  tutorialH1.style.top = "142px";
  tutorialH1.style.width = "220px";
  tutorialH1.innerHTML = `1. Health, If it gets to 0 I will die shortly after.`
  tutorialArrow.style.display = "block";
  bFace.src = "faces/default_dead.png"
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
}

function tut8() {
  playSelectSfx();
  tutorialH1.innerHTML = `2. Food, If it gets to 0 I will lose health slowly.`
  bFace.src = "faces/default_sad_2.png"
  tutorialArrow.style.top = "13px";
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
}
function tut9() {
  playSelectSfx();
  tutorialH1.innerHTML = `3. Energy, Used to fight enemies to gain loot, everytime I eat my Energy will refill`
  bFace.src = "faces/default_angry.png"
  tutorialArrow.style.top = "28px";
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
}
function tut10() {
  playSelectSfx();
  tutorialH1.innerHTML = `4. Level, How long you have kept me alive!`;
  tutorialArrow.style.top = "43px";
  bFace.src = "faces/default_happy_2.png";
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
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
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
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
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
};

function tut13() {
  playSelectSfx();
  battleBox.style.visibility = "";
  tutorialNxtBtn.style.top = "132px";
  tutorialNxtBtn.style.left = "193px";
  tutorialArrow.style.top = "28px";
  tutorialArrow.style.left = "80px";
  tutorialArrow.style.transform = "rotate(270deg)";
  tutorialH1.innerHTML = "This is me, if my HP hits 0 I will die.";
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
};

function tut14() {
  playSelectSfx();
  tutorialArrow.style.top = "36px";
  tutorialArrow.style.left = "128px";
  tutorialArrow.style.transform = "rotate(180deg)";
  tutorialH1.innerHTML = "This is the enemy, if their HP hits 0 they die!";
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
};

function tut15() {
  playSelectSfx();
  battleClickBtn.style.display = "block";
  tutorialArrow.style.top = "94px";
  tutorialArrow.style.left = "137px";
  tutorialArrow.style.transform = "rotate(270deg)";
  tutorialH1.innerHTML = "This is the attack btn, click it to deal damage to the enemy!";
  tutorialSidebar.style.width = "180px";
  battleEnemyName.style.color = "#100c00";
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
};

function tut16() {
  playSelectSfx();
  battleEnemyName.style.color = "#ffcc00";
  tutorialArrow.style.top = "76px";
  tutorialArrow.style.left = "138px";
  tutorialArrow.style.transform = "rotate(180deg)";
  tutorialH1.innerHTML = "Each time you kill an enemy, something will drop!";
  battleEnemyHP.innerHTML = "HP: 0"
  battleEnemyName.innerHTML = "D E A D"
  battleEnemy.style.display = "none";
  battleClickBtn.style.display = "none";
  playDeathSfx();
  setTimeout(() => {
    popupItem("Sweets", 1, false);
    setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
  }, 2500)
};

function tut17() {
  playSelectSfx();
  tutorialArrow.style.display = "none";
  tutorialH1.innerHTML = "Some things are rarer than others..";
  battleClickBtn.style.display = "none";
  setTimeout(() => {
    popupItem("?", 1, true);
    setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500)
  }, 1500);
};

function tut18() {
  playSelectSfx();
  battleBox.style.visibility = "hidden";
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
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500);
};

function tut19() {
  playSelectSfx();
  tutorialH1.innerHTML = "I hope you enjoy this adventure with me :D";
  bFace.src = "faces/default_happy_2_blink_1.png";
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 2500);
};

function tut20() {
  playSelectSfx();
  stopTutorialBackground();
  bFace.src = "faces/tutorial_1.png";
  tutorialH1.innerHTML = `Don't let me die ${username}.`;
  setTimeout(() => { tutorialNxtBtn.style.display = "block"; }, 4500);
};

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
  }, 2500)
};

window.electron.receive("wipeTutorial", () => {
  tutorialCont.style.display = "none";
  sidebar.style.display = "flex";
  battleEnemy.display = "block";
});

window.electron.receive("update-available", (info)=>{
  playSelectSfx();
  window.electron.getAppVersion().then(version => {
    updateVer.innerHTML = `<span style="color: #b28e00"><del>V${version}</del></span> -> V${info.version}`;
    updateCont.style.display = "block";
  }).catch(error => {
    console.error('Error fetching app version:', error);
  });
});

updateNotes.addEventListener('mousedown', () => {
  window.electron.openExternal("https://github.com/Eveeko/bullegachi/releases");
});

updateBtn.addEventListener('mouseover', () => {
  playSelectSfx();
  updateBtn.style.backgroundImage = `url("sprite/sprite_update_btn_i.png")`;
})
updateBtn.addEventListener('mouseleave', () => {
  updateBtn.style.backgroundImage = `url("sprite/sprite_update_btn.png")`;
})
updateBtn.addEventListener('mousedown', () =>{
  window.electron.send("updateConfirmed");
  updateBtn.style.display = "none";
  updateBtnSkip.style.display = "none";
  updateLoading.style.display = "block";
})

updateBtnSkip.addEventListener('mouseover', () => {
  playSelectSfx();
  updateBtnSkip.style.backgroundImage = `url("sprite/sprite_next_btn_i.png")`;
})
updateBtnSkip.addEventListener('mouseleave', () => {
  updateBtnSkip.style.backgroundImage = `url("sprite/sprite_next_btn.png")`;
})
updateBtnSkip.addEventListener('mousedown', () =>{
  window.electron.send("updateDeclined");
  updateBtn.style.display = "none";
  updateBtnSkip.style.display = "none";
  updateCont.style.display = "none";
})

window.electron.receive("updateProgress", (info)=>{
  if(info.percent < 14){
    updateLoading.innerHTML = "█";
  }else if (info.percent < 28){
    updateLoading.innerHTML = "█ █";
  }else if (info.percent < 42){
    updateLoading.innerHTML = "█ █ █";
  } else if (info.percent < 56){
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

