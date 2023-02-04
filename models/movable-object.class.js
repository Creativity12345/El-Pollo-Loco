class MovableObject extends DrawableObject {
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    offsetLeft = 0;
    offsetRight = 0;
    offsetTop = 0;
    offsetBottom = 0;


    /**
    * Calculates and applies gravity to the object's y-coordinate.
    */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
    * Check if the object is above the ground.
    *
    * @returns {boolean} Whether the object is above the ground.
    */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 230;
        }
    }

    /**
    * Check if the object is colliding with another movable object.
    *
    * @param {MovableObject} mo The other movable object.
    * @returns {boolean} Whether the object is colliding with the other object.
    */
    isColliding(mo) {
        return this.x + this.width - (this.offsetRight - this.offsetLeft) > mo.x + mo.offsetLeft &&
            this.y + this.height - (this.offsetBottom - this.offsetTop) > mo.y + mo.offsetTop &&
            this.x + this.offsetLeft < mo.x + mo.width - (mo.offsetRight - mo.offsetLeft) &&
            this.y + this.offsetTop < mo.y + mo.height - (mo.offsetBottom - mo.offsetTop);
    }

    /**
    * Check if the object is colliding with a chicken object.
    *
    * @param {MovableObject} mo The chicken object.
    * @returns {boolean} Whether the object is colliding with the chicken.
    */
    isCollidingChicken(mo) {
        return this.x + this.width - (this.offsetRight - this.offsetLeft) > mo.x + mo.offsetLeft &&
        this.y + this.height - (this.offsetBottom - this.offsetTop) > mo.y + mo.offsetTop &&
        this.x + this.offsetLeft < mo.x + mo.width - (mo.offsetRight - mo.offsetLeft) &&
        this.y + this.offsetTop < mo.y + mo.height - (mo.offsetBottom - mo.offsetTop);
    }

    /**
    * Check if the object is colliding with a collectable object.
    *
    * @param {MovableObject} mo The collectable object.
    * @returns {boolean} Whether the object is colliding with the collectable.
    */
    isCollidingCollectables(mo) {
        return this.x + this.width - (this.offsetRight - this.offsetLeft) > mo.x + mo.offsetLeft &&
        this.y + this.height - (this.offsetBottom - this.offsetTop) > mo.y + mo.offsetTop &&
        this.x + this.offsetLeft < mo.x + mo.width - (mo.offsetRight - mo.offsetLeft) &&
        this.y + this.offsetTop < mo.y + mo.height - (mo.offsetBottom - mo.offsetTop);
    }

    /**
    * Apply a hit to the object, reducing its energy by 20.
    */
    hit() {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * Check if the object is hurt (hit within the last 0.4 seconds).
    *
    * @returns {boolean} Whether the object is hurt.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.4;
    }

    /**
    * Check if the object is dead (energy is 0).
    *
    * @returns {boolean} Whether the object is dead.
    */
    isDead() {
        return this.energy == 0;
    }

    /**
    * Play an animation by cycling through an array of image paths.
    *
    * @param {string[]} images The array of image paths.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = 0 % 6; => 0, Rest 0     bei  let i = 6 % 6; => 1, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    * Move the object to the right by the object's speed.
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
    * Move the object to the left by the object's speed.
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * Apply a jump to the object, setting its speedY to 20.
    */
    jump() {
        this.speedY = 20;
    }

    /**
    * Check if the object is on top of another movable object.
    *
    * @param {MovableObject} mo The other movable object.
    * @returns {boolean} Whether the object is on top of the other object.
    */
    isOnTop(mo) {
      return (
        this.y + this.height &&
        this.x + this.width >= mo.y + mo.height &&
        mo.x + mo.width
      );
    }

    /**
    * Show the game over screen.
    */
    gameOver() {
        document.getElementById('endScreenContainer').classList.remove('d-none');
    }
}