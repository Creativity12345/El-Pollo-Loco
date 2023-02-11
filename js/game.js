let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let gameOver = false;
let stopGameVariable = function stopGame() {
  intervalIds.forEach(clearInterval);
};
let muteState = false;
let muteStateBg = false;


/**
 * Initializes the game by initializing level 1, binding touch buttons, removing classes and setting up the world.
 */
function init() {
  initLevel1();
  bindTouchBtns();
  document.getElementById('startScreenContainer').classList.add('d-none');
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard, stopGameVariable, gameOver);
}


/**
 * Stops the game by clearing all intervals.
 */
function stopGame() {
  intervalIds.forEach(clearInterval);
}


/**
 * restart the game after clicking restart button
 */
function reload() {
  window.location.reload();
}


/**
 * @param {function} fn - The function to be executed repeatedly.
 * @param {number} time - The time interval between each execution in milliseconds.
 * Sets an interval that can be stopped later.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}


/**
 * Event handler to set the keyboard keys when they are pressed.
 */
window.addEventListener("keydown", (e) => {
  if (!gameOver) {
    if (e.keyCode == 39) {
      keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
      keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
      keyboard.UP = true;
    }

    if (e.keyCode == 40) {
      keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
      keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
      keyboard.D = true;
    }
  }
});


/**
 * Event handler to unset the keyboard keys when they are released.
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});


/**
 * Toggles fullscreen mode for the document.
 */
function fullscreen() {
  let isInFullScreen =
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement &&
      document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);

  let docElm = document.getElementById('showFullscreen');
  if (!isInFullScreen) {
    openFullscreen(docElm);
    document.getElementById('content').style.width = '100%';
  } else {
    closeFullscreen();
    document.getElementById('content').style.width = '720px';
  }
}


/**
 * Opens fullscreen mode for the given element.
 * @param {Element} docElm - The element to open fullscreen mode for.
 */
function openFullscreen(docElm) {
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen();
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen();
  }
}


/**
 * Closes fullscreen mode.
 */
function closeFullscreen() {
  if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}


/**
 * Mutes or unmutes the audio for world.character.
 * Toggles the image of sound button.
 * Toggles the volume for audio_background, audio_snore, audio_walking, audio_jump and audio_lose between 0 and 1 based on world.character.mute value.
 */
function mute() {
  let img1 = "./img/unmuted.png",
    img2 = "./img/muted.png";
  let imgElement = document.getElementById("muteImg");

  muteState = !muteState;
  imgElement.src = muteState ? img2 : img1;

  world.character.muteSounds = muteState;

  world.character.audio_walking.volume = muteState ? 0 : 1;
  world.character.audio_snore.volume = muteState ? 0 : 1;
  world.character.audio_collectCoin.volume = muteState ? 0 : 1;
  world.character.audio_jump.volume = muteState ? 0 : 1;
  world.character.audio_collectBottle.volume = muteState ? 0 : 1;
  world.character.audio_bonusHP.volume = muteState ? 0 : 1;
  world.character.audio_hurt.volume = muteState ? 0 : 1;
}


/**
 * Mutes or unmutes background music.
 * Toggles the image of background music button.
 * Toggles the value of world.character.muteBg.
 */
function bgMusic() {
  let img1 = "./img/unmutedBg.png",
    img2 = "./img/mutedBg.png";
  let imgElement = document.getElementById("muteBgImg");

  muteStateBg = !muteStateBg;
  imgElement.src = muteStateBg ? img2 : img1;

  world.character.muteBg = muteStateBg;

  world.character.audio_background.volume = muteStateBg ? 0 : 1;
  world.character.audio_lose.volume = muteStateBg ? 0 : 1;
  world.endboss.audio_dying.volume = muteStateBg ? 0 : 1;
}


/**
 * Binds touch buttons to control keyboard events.
 * Adds touchstart and touchend event listeners to elements with id 'btn-left', 'btn-right', 'btn-jump', 'btn-throw'.
 * Sets keyboard.LEFT, keyboard.RIGHT, keyboard.SPACE and keyboard.D to true or false based on touch events.
 */
function bindTouchBtns() {
  document.getElementById('btn-left').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById('btn-left').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById('btn-right').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById('btn-right').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById('btn-jump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById('btn-throw').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}