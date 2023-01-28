let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = []; // hier drin werden alle intervalle gespeichert
let gameOver = false;
let stopGameVariable = function stopGame() {
  // Variable um es in die world.js im constructor zu übergeben
  intervalIds.forEach(clearInterval);
};


function init() {
    removeClasses();
    initLevel1();
    document.getElementById('startScreenContainer').classList.add('d-none');
    document.getElementById('endScreenContainer').classList.add('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, stopGameVariable, gameOver);
}


function stopGame() {
  intervalIds.forEach(clearInterval);
}


function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}


window.addEventListener("keydown", (e) => {
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
});


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


function enterFullscreen() {
    document.getElementById('enterFullscreenBtn').classList.add('d-none');
    document.getElementById('exitFullscreenBtn').classList.remove('d-none');
    document.getElementById('startScreenImg').classList.add('startScreenImgFullscreen');
    document.getElementById('endScreenImg').classList.add('endScreenImgFullscreen');
    document.getElementById('canvas').classList.add('canvasFullScreen');
    document.getElementById('title').classList.add('d-none');
    document.getElementById('instruction').classList.add('d-none');

    let element = document.getElementById('content');

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


function toSmall() {
    document.getElementById('enterFullscreenBtn').classList.remove('d-none');
    document.getElementById('exitFullscreenBtn').classList.add('d-none');
    document.getElementById('startScreenImg').classList.remove('startScreenImgFullscreen');
    document.getElementById('endScreenImg').classList.remove('endScreenImgFullscreen');
    document.getElementById('canvas').classList.remove('canvasFullScreen');
    document.getElementById('title').classList.remove('d-none');
    document.getElementById('instruction').classList.remove('d-none');

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


function removeClasses() {
    document.getElementById('startScreenContainer').classList.add('d-none');
    document.getElementById('endScreenContainer').classList.add('d-none');
}

function mute() {
  if (!world.character.mute) {
    world.character.mute = true;
  } 
  else {
    world.character.mute = false;
  } 
}

function bgMusic() {
  if (!world.character.muteBg) world.character.muteBg = true;
  else world.character.muteBg = false;
}