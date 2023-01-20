let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    initLevel1();
    document.getElementById('startScreenContainer').classList.add('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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
    document.getElementById('canvas').classList.remove('canvasFullScreen');
    document.getElementById('title').classList.remove('d-none');
    document.getElementById('instruction').classList.remove('d-none');

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}








// let canvas;
// let world;
// let keyboard = new Keyboard();
// let gameOver = false;
// let intervalIds = []; // hier drin werden alle intervalle gespeichert
// let stopGameVariable = function stopGame() {
//   // in variable um es in die world.js im constructor zu übergeben
//   intervalIds.forEach(clearInterval);
// };

// function init() {
//     bindTouchBtns();
//     initLevel();
//     removeClasses();
//     canvas = document.getElementById("canvas");
//     world = new World(canvas, keyboard, stopGameVariable, gameOver);  
//   }


// function setStoppableInterval(fn, time) {
//   let id = setInterval(fn, time);
//   intervalIds.push(id);
// }

// function stopGame() {
//   intervalIds.forEach(clearInterval);
// }

// function mute() {
//   if (!world.character.mute) {
//     world.character.mute = true;
//   } 
//   else {
//     world.character.mute = false;
//   } 
// }

// function bgMusic() {
//   if (!world.character.muteBg) world.character.muteBg = true;
//   else world.character.muteBg = false;
// }

// function showFullscreen() {
//   canvas.requestFullscreen();
// }

// function openControls() {
//   if (document.getElementById("instructions").classList.contains("d-none")) {
//     document.getElementById("instructions").classList.remove("d-none");
//   } else {
//     document.getElementById("instructions").classList.add("d-none");
//   }
// }

// function closeControls() {
//   document.getElementById("instructions").classList.add("d-none");
// }

// function removeClasses() {
//   document.getElementById("startScreenContainer").style.display = "none";
//   document.getElementById("endScreenContainer").style.display = "none";
//   document.getElementById("fullscreenBtn").classList.remove("d-none")
//   document.getElementById("btn-left").classList.remove("d-none")
//   document.getElementById("btn-right").classList.remove("d-none")
//   document.getElementById("btn-jump").classList.remove("d-none")
//   document.getElementById("btn-throw").classList.remove("d-none")
// }

// window.addEventListener("keydown", (event) => {
//   if (event.keyCode == 37) {
//     keyboard.left = true;
//   }
//   if (event.keyCode == 38) {
//     keyboard.up = true;
//   }
//   if (event.keyCode == 39) {
//     keyboard.right = true;
//   }
//   if (event.keyCode == 40) {
//     keyboard.down = true;
//   }
//   if (event.keyCode == 32) {
//     keyboard.space = true;
//   }
//   if (event.keyCode == 68) {
//     keyboard.d = true;
//   }
// });

// window.addEventListener("keyup", (event) => {
//   if (event.keyCode == 37) {
//     keyboard.left = false;
//   }
//   if (event.keyCode == 38) {
//     keyboard.up = false;
//   }
//   if (event.keyCode == 39) {
//     keyboard.right = false;
//   }
//   if (event.keyCode == 40) {
//     keyboard.down = false;
//   }
//   if (event.keyCode == 32) {
//     keyboard.space = false;
//   }
//   if (event.keyCode == 68) {
//     keyboard.d = false;
//   }
// });

// // einbindung von touchbtns
// function bindTouchBtns() {
//   document.getElementById("btn-left").addEventListener("touchstart", (e) => {
//     e.preventDefault();
//     keyboard.left = true;
//   });

//   document.getElementById("btn-left").addEventListener("touchend", (e) => {
//     e.preventDefault();
//     keyboard.left = false;
//   });

//   document.getElementById("btn-right").addEventListener("touchstart", (e) => {
//     e.preventDefault();
//     keyboard.right = true;
//   });

//   document.getElementById("btn-right").addEventListener("touchend", (e) => {
//     e.preventDefault();
//     keyboard.right = false;
//   });

//   document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
//     e.preventDefault();
//     keyboard.space = true;
//   });

//   document.getElementById("btn-jump").addEventListener("touchend", (e) => {
//     e.preventDefault();
//     keyboard.space = false;
//   });

//   document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
//     e.preventDefault();
//     keyboard.d = true;
//   });

//   document.getElementById("btn-throw").addEventListener("touchend", (e) => {
//     e.preventDefault();
//     keyboard.d = false;
//   });
// }