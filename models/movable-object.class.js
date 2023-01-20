class MovableObject extends DrawableObject {
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    offsetLeft = 25;
    offsetRight = 70;
    offsetTop = 150;
    offsetBottom = 168;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 230;
        }
    }

    isColliding(mo) {
        return this.x + this.width - (this.offsetRight - this.offsetLeft) > mo.x + mo.offsetLeft &&
            this.y + this.height - (this.offsetBottom - this.offsetTop) > mo.y + mo.offsetTop &&
            this.x + this.offsetLeft < mo.x + mo.width - (mo.offsetRight - mo.offsetLeft) &&
            this.y + this.offsetTop < mo.y + mo.height - (mo.offsetBottom - mo.offsetTop);
    }

    hit() {
        this.energy -= 1;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.4;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 0 % 6; => 0, Rest 0     bei  let i = 6 % 6; => 1, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
    }
}





  
  
//     gameOver() {
//       let endScreen = document.getElementById("endScreenContainer");
//       endScreen.style.display = "block";
//     }
  
//     isOnTop(mo) {
//       return (
//         this.y + this.height &&
//         this.x + this.width >= mo.y + mo.height &&
//         mo.x + mo.width
//       );
//     }
  
//     isCollidingCollectables(mo) {
//       return (
//         this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
//         this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
//         this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
//         this.y + this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
//       );
//     }
  
//     isCollidingChicken(mo) {
//       return (
//         this.x + this.width - this.offset.left > mo.x &&
//         this.y + this.height > mo.y &&
//         this.x < mo.x - this.offset.left + mo.width &&
//         this.y < mo.y + mo.height
//       );
//     }
  
//     hit() {
//       this.energy -= 20;
//       if (this.energy < 0) {
//         this.energy = 0;
//       } else {
//         this.lastHit = new Date().getTime();
//       }
//     }
  
//     isDead() {
//       return this.energy == 0;
//     }
  
  
//     applyGravity() {
//       setStoppableInterval(() => {
//         if (this.isAboveGround() || this.speedY > 0) {
//           this.y -= this.speedY;
//           this.speedY -= this.acceleration;
//         }
//       }, 1000 / 25);
//     }
  
//   }