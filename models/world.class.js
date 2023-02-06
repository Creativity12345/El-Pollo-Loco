class World {
  character = new Character();
  endboss = new Endboss();
  chicken = new Chicken();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBarHealth();
  statusBarBottle = new StatusBarBottles();
  statusBarCoins = new StatusBarCoins();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];
  doAnimation = true;
  clearIntervals;
  collectedCoinsStorage = [];

  audio_hittedBoss = new Audio('audio/hittedBoss.mp3');
  audio_hitted = new Audio('audio/chickenHitted.mp3');

  constructor(canvas, keyboard, clearIntervals, gameOver) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.clearIntervals = clearIntervals;
    this.gameOver = gameOver;

    this.draw();
    this.setWorld();
    this.run();
  }

  /**
  * Sets the world object for the character object
  */
  setWorld() {
    this.character.world = this;
  }

  /**
  * Runs the intervals for the world
  */
  run() {
    setStoppableInterval(() => {
      this.checkThrow();
    }, 300);
    setStoppableInterval(() => {
      this.endboss.checkCondition();
      this.chicken.checkIsDead();
    }, 150);
    setStoppableInterval(() => {
      this.checkEnemyKilled();
    }, 1000 / 60);
    setStoppableInterval(() => {
      this.checkEndbossKilled();
    }, 600);
    setStoppableInterval(() => {
      this.checkSomeActivitiesOfGame();
    }, 50);
  }

  /**
  * Checks for various activities in the game
  */
  checkSomeActivitiesOfGame() {
    this.checkOnTopOfEnemy();
    this.checkCollisions();
    this.checkCollectingCoins();
    this.checkCollectingBottles();
    this.checkBonusHP(); // collect yellow chicken
    this.checkBackgroundMusic();
    this.character.checkIdleMode();
    this.stopGame();
  }

  /**
  * Plays or pauses the background music based on certain conditions
  */
  checkBackgroundMusic() {
    if (this.bgMusicWanted()) {
      this.character.audio_background.play();
      this.character.audio_background.volume = 0.05;
    } else this.character.audio_background.pause();
  }

  /**
  * Returns whether background music should be played or not
  * @returns {Boolean}
  */
  bgMusicWanted() {
    return gameOver === false && !this.character.mute && !this.character.muteBg;
  }

  /**
  * Checks if the character is colliding with any enemies
  */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.characterCanCollide(enemy)) {
        this.character.hit();
        let hurtsound = this.character.audio_hurt;
        if (!this.character.mute) hurtsound.play();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  /**
  * Returns whether the character can collide with the given enemy object
  * @param {Enemy} enemy - The enemy object to check collisions with
  * @returns {Boolean}
  */
  characterCanCollide(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !enemy.hitted &&
      this.characterCanBeHurt()
    );
  }

  /**
  * Returns whether the character can be hurt or not
  * @returns {Boolean}
  */
  characterCanBeHurt() {
    return (
      !this.character.isAboveGround() &&
      !this.character.isHurt()
    );
  }

  /**
  * Checks if the character is collecting any yellow chickens (bonus HP)
  */
  checkBonusHP() {
    for (let i = 0; i < this.level.smallChicken.length; i++) {
      const chicken = this.level.smallChicken[i];
      if (this.character.isColliding(chicken)) {
        let collectedChicken = this.level.smallChicken.indexOf(chicken);
        if (!this.character.mute) this.character.audio_bonusHP.play();
        this.level.smallChicken.splice(collectedChicken, 1);
        if (this.character.energy <= 100) this.character.energy += 20;
        if (this.character.energy > 100) this.character.energy = 100;
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    }
  }

  /**
  * Checks if the character is collecting any bottles
  */
  checkCollectingBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        if (!this.character.mute) this.character.audio_collectBottle.play();
        this.character.collectedBottles++;
        this.statusBarBottle.setPercentage(this.character.collectedBottles);
        this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
      }
    });
  }

  /**
  * Checks if the character is collecting any coins
  */
  checkCollectingCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        if (!this.character.mute) this.character.audio_collectCoin.play();
        this.character.collectedCoins++;
        this.collectedCoinsStorage.push(coin);
        this.statusBarCoins.setPercentage(this.character.collectedCoins);
        this.level.coins.splice(coin, 1);
      }
    });
  }

  /**
  * Checks if the character is on top of an enemy.
  */
  checkOnTopOfEnemy() {
    for (let i = 0; i < this.level.enemies.length; i++) {
      const enemy = this.level.enemies[i];
      if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
        let hittedChicken = this.level.enemies.indexOf(enemy);
        if (!this.level.enemies[hittedChicken].hitted && !this.character.muteSounds)
          this.level.enemies[hittedChicken].audio_hitted.play();
        this.level.enemies[hittedChicken].hitted = true;
      }
    }
  }

  /**
  * Checks if the character can throw a bottle.
  */
  checkThrow() {
    if (this.keyboard.D && this.character.collectedBottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + this.character.width + this.character.offsetLeft - this.character.offsetRight,
        this.character.y + this.character.offsetTop,
      );
      this.throwableObjects.push(bottle);
      this.character.collectedBottles--;
      this.statusBarBottle.setPercentage(this.character.collectedBottles);
    }
  }

  /**
  * Checks if the endboss was killed.
  */
  checkEndbossKilled() {
    this.throwableObjects.forEach((tO) => {
      if (this.endboss.isColliding(tO)) {
        let hittedsound = this.audio_hittedBoss;
        if (!this.character.muteSounds) hittedsound.play();
        this.endboss.hitted();
        this.statusBarEndboss.setPercentage(this.endboss.energy);
      } else if (this.endboss.isColliding(this.character)) {
        this.character.hit();
        let hurtsound = this.character.audio_hurt;
        if (!this.character.muteSounds) hurtsound.play();
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  /**
  * Checks if the enemy was killed.
  */
  checkEnemyKilled() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObjects.forEach((tO) => {
        if (enemy.isColliding(tO)) {
          enemy.energy = 0;
          enemy.hitted = true;
          let hittedsound = this.audio_hitted;
          if (!this.character.muteSounds) hittedsound.play();
          enemy.energy = 0;
        }
      })
    });
  }

  /**
  * Draws the game world on the canvas.
  */
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    if (this.character.doAnimation) {
      this.addToMap(this.character);
      this.addToMap(this.endboss);
      this.ctx.translate(-this.camera_x, 0);
      this.addStatusbars();
      this.ctx.translate(this.camera_x, 0);
      this.addAllObjects();
      this.ctx.translate(-this.camera_x, 0);
      let self = this;
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
  * Adds the statusbars for health, bottles, coins, and the endboss to the world
  */
  addStatusbars() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoins);
    if (this.character.x > 1900) {
      this.addToMap(this.statusBarEndboss);
    }
  }

  /**
  * Adds objects to the map
  * @param {Array} objects - The array of objects to add to the map
  */
  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }

  /**
  * Adds an object to the map
  * @param {Object} mo - The object to add to the map
  */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx); //show the frame arround the objects

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
  * Flips an image horizontally
  * @param {Object} mo - The object whose image should be flipped
  */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
  * Flips an image back to its original position
  * @param {Object} mo - The object whose image should be flipped back
  */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
  * Stops the game and shows the end screen if either the character or endboss runs out of energy
  */
  stopGame() {
    if (this.character.energy == 0) {
      this.character.playAnimation(this.character.IMAGES_DEAD);
      setTimeout(() => {
        this.showEndscreen();
      }, 450);
    }
    if (this.endboss.energy == 0) {
      setTimeout(() => {
        this.showEndscreen();
      }, 2000);
    }
  }

  /**
  * Shows the end screen and stops all intervals
  */
  showEndscreen() {
    document.getElementById('endScreenContainer').classList.remove('d-none');
    this.clearIntervals();
    this.character.audio_background.pause();
  }

  /**
  * Adds all objects to the map
  */
  addAllObjects() {
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.smallChicken);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
  }
}