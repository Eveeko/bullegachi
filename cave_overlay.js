const mainh1 = document.getElementById("mainh1");
const speechSfx = document.getElementById("speechSfx");
const footstep_Sfx = document.getElementById("footstep_Sfx");
const vignette = document.getElementById("vignette-overlay");
var speechAudioBuffer;
let speechAudioSlices = [];
let currentSpeechSliceIndex = 0;
const sliceDuration = 0.16;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let attackSoundBuffer;

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

function fadeInVignette() {
  let start = null;
  const duration = 2000; // Duration of the fade in milliseconds

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const opacity1 = 0.2 * progress; // From 0.0 to 0.2
    const opacity2 = 0.5 * progress; // From 0.0 to 0.5

    vignette.style.background = `radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, ${opacity1}) 25%,
      rgba(0, 0, 0, ${opacity2}) 100%
    )`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
function fadeVignette(reverse) {
  let start = null;
  const duration = 2000; // Duration of the fade in milliseconds

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const opacity1 = reverse ? 0.2 * (1 - progress) : 0.2; // From 0.2 to 0.0 if reverse, else 0.2
    const opacity2 = reverse ? 0.9 * (1 - progress) : 0.5 + (0.4 * progress); // From 0.9 to 0.0 if reverse, else 0.5 to 0.9

    vignette.style.background = `radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, ${opacity1}) 25%,
      rgba(0, 0, 0, ${opacity2}) 100%
    )`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
window.electron.receive("start", ()=>{
    console.log('start received')
    fadeInVignette();
    setTimeout(() =>{
        footstep_Sfx.play();
    }, 1000);
    setTimeout(()=>{
        typewriterEffect(mainh1, "The ground shifts as you enter the mouth.", 3000);
        setTimeout(()=>{
            mainh1.innerHTML = "";
            setTimeout(()=>{
                fadeVignette();
                typewriterEffect(mainh1, "Darkness surrounds as you continue foward without light.", 5000);
                setTimeout(() =>{
                  footstep_Sfx.src = "sfx/footsteps_cave_sfx.wav";
                  footstep_Sfx.load();
                  footstep_Sfx.currentTime = 0;
                  footstep_Sfx.play();
                }, 1000);
                setTimeout(() =>{
                    mainh1.innerHTML = "";
                    footstep_Sfx.src = "sfx/footsteps_cave_sfx.wav";
                    footstep_Sfx.load();
                    footstep_Sfx.currentTime = 0;
                    footstep_Sfx.volume = 0.7;
                    footstep_Sfx.play();
                    setTimeout(()=>{
                        typewriterEffect(mainh1, ". . .", 4000);
                        setTimeout(()=>{
                            mainh1.innerHTML = "";
                            setTimeout(()=>{
                                footstep_Sfx.volume = 1;
                                footstep_Sfx.src = "sfx/wall_impact_sfx.wav";
                                footstep_Sfx.load();
                                footstep_Sfx.currentTime = 0;
                                footstep_Sfx.play();
                                setTimeout(() =>{
                                    typewriterEffect(mainh1, "You impact a mostly flat rough surface..", 5000);
                                    setTimeout(() =>{
                                        typewriterEffect(mainh1, " it appears to have an opening.", 3000);
                                        setTimeout(() =>{
                                            mainh1.innerHTML = "";
                                            setTimeout(() =>{
                                                typewriterEffect(mainh1, "You step through.", 5000);
                                                setTimeout(() =>{
                                                    typewriterEffect(mainh1, " . . .", 2000);
                                                    setTimeout(() =>{
                                                        mainh1.innerHTML = "";
                                                        setTimeout(() =>{
                                                            footstep_Sfx.src = "sfx/ember_sfx.wav";
                                                            footstep_Sfx.load();
                                                            footstep_Sfx.currentTime = 0;
                                                            footstep_Sfx.play();
                                                            typewriterEffect(mainh1, "A faint ember burns in the far distance.", 3000);
                                                            setTimeout(() =>{
                                                                mainh1.innerHTML = "";
                                                                setTimeout(() =>{
                                                                    footstep_Sfx.src = "sfx/footsteps_cave_sfx.wav";
                                                                    footstep_Sfx.load();
                                                                    footstep_Sfx.currentTime = 0;
                                                                    footstep_Sfx.play();
                                                                    typewriterEffect(mainh1, "You walk towards it.", 4000);
                                                                    setTimeout(() =>{
                                                                        mainh1.innerHTML = "";
                                                                        setTimeout(() =>{
                                                                            footstep_Sfx.src = "sfx/cave_in_sfx.wav";
                                                                            footstep_Sfx.load();
                                                                            footstep_Sfx.currentTime = 0;
                                                                            footstep_Sfx.play();
                                                                            setTimeout(() =>{
                                                                                typewriterEffect(mainh1, ". . .", 5000);
                                                                                setTimeout(() =>{
                                                                                    fadeVignette(true);
                                                                                    setTimeout(() =>{
                                                                                      window.electron.send("cave_overlay_end");
                                                                                      // Exit out of the cinematic loop and return to the main client.
                                                                                    }, 3000);  
                                                                                }, 7000);
                                                                            }, 12000);
                                                                        }, 2000);
                                                                    }, 7000)
                                                                }, 1000)
                                                            }, 7000);
                                                        }, 1000);
                                                    }, 4000);
                                                }, 7000);
                                            }, 2000);
                                        }, 5000);
                                    }, 7000);
                                }, 500);
                            }, 2000);
                        }, 6000)
                    }, 2000);
                }, 9000); // pause for clearing
            }, 2000); // text2
        }, 7000); // text1
    }, 500);
}); // Starts the main