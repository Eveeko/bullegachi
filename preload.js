const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

contextBridge.exposeInMainWorld(
  'electron', {
    send: (channel, data) => {
      // Whitelist channels
      let validChannels = ['move-mode', 'drag-window', 'get-base-dir', 'consume_food', 'alivePal', 'killPal', 'battle-click', 'itemDropped', 'advanceEnemy', 'startTTK', 'startSacrifice', 'endSacrifice', 'consume_item', 'tutorialEnded', 'battleBoxStarted', 'updateConfirmed', 'updateDeclined', 'tutorialAdvanced'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    openExternal: (url) => ipcRenderer.send('open-external', url),
    getAppVersion: () => ipcRenderer.invoke('get-app-version')
  }
);

// Expose require function to the window object
contextBridge.exposeInMainWorld('electronRequire', require);

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })