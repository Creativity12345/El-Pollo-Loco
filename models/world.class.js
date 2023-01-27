class World {
    character = new Character();
    endboss = new Endboss();
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

    setWorld() {
        this.character.world = this;
    }

    run() {
        setStoppableInterval(() => {
          this.checkThrow();
        }, 250);
        setStoppableInterval(() => {
          this.endboss.checkCondition();
        }, 150);
        setStoppableInterval(() => {
          this.checkEndbossKilled();
        }, 600);
        setStoppableInterval(() => {
          this.checkCollisions();
          this.checkCollectingCoins();
          this.checkCollectingBottles();
          this.checkOnTopOfEnemy();
          this.checkBonusHP(); // collect yellow chicken
        //   this.checkUnstoppable();
          this.checkBackgroundMusic();
          this.character.checkIdleMode();
          this.stopGame();
        }, 50);
    }

    checkBackgroundMusic() {
        if (this.bgMusicWanted()) {
          this.character.audio_background.play();
          this.character.audio_background.volume = 0.25;
        } else this.character.audio_background.pause();
    }

    bgMusicWanted() {
      return gameOver === false && !this.character.mute && !this.character.muteBg;
    }

    checkCollisions() {
      this.level.enemies.forEach((enemy) => {
        if (this.characterCanCollide(enemy)) {
          this.character.hit();
          let hurtsound = this.character.audio_hurt;
          hurtsound.playbackRate = 3;
          if (!this.character.mute) hurtsound.play();
          this.statusBarHealth.setPercentage(this.character.energy);
        }
      });
    }

    characterCanCollide(enemy) {
      return (
        this.character.isCollidingChicken(enemy) &&
        !enemy.hitted &&
        this.characterCanBeHurt()
      );
    }

    characterCanBeHurt() {
      return (
        !this.character.isAboveGround() &&
        !this.character.isHurt() &&
        !this.character.unstoppable
      );
    }

    checkBonusHP() {
      for (let i = 0; i < this.level.smallChicken.length; i++) {
        const chicken = this.level.smallChicken[i];
        if (this.character.isCollidingChicken(chicken)) {
          let collectedChicken = this.level.smallChicken.indexOf(chicken);
          if (!this.character.mute) this.character.audio_bonusHP.play();
          this.level.smallChicken.splice(collectedChicken, 1);
          if (this.character.energy <= 100) this.character.energy += 20;
          if (this.character.energy > 100) this.character.energy = 100;
          this.statusBarHealth.setPercentage(this.character.energy);
        }
      }
    }

    checkCollectingBottles() {
      this.level.bottles.forEach((bottle) => {
        if (this.character.isCollidingCollectables(bottle)) {
          if (!this.character.mute) this.character.audio_collectBottle.play();
          this.character.collectedBottles++;
          this.statusBarBottle.setPercentage(this.character.collectedBottles);
          this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
        }
      });
    }
  
    checkCollectingCoins() {
      this.level.coins.forEach((coin) => {
        if (this.character.isCollidingCollectables(coin)) {
          if (!this.character.mute) this.character.audio_collectCoin.play();
          this.character.collectedCoins++;
          this.collectedCoinsStorage.push(coin);
          this.statusBarCoins.setPercentage(this.character.collectedCoins);
          this.level.coins.splice(coin, 1);
        }
      });
    }

    checkOnTopOfEnemy() {
      for (let i = 0; i < this.level.enemies.length; i++) {
        const enemy = this.level.enemies[i];
        if (
          this.character.isCollidingChicken(enemy) &&
          this.character.isAboveGround()
        ) {
          let hittedChicken = this.level.enemies.indexOf(enemy);
          if (!this.level.enemies[hittedChicken].hitted && !this.character.mute)
            this.level.enemies[hittedChicken].audio_hitted.play();
          this.level.enemies[hittedChicken].hitted = true;
        }
      }
    }

    checkThrow() {
      if (this.keyboard.D && this.character.collectedBottles > 0) {
        let bottle = new ThrowableObject(
          this.character.x + 100,
          this.character.y + 100
        );
        this.throwableObjects.push(bottle);
        this.character.collectedBottles--;
        this.statusBarBottle.setPercentage(this.character.collectedBottles);
      }
    }

    checkEndbossKilled() {
      this.throwableObjects.forEach((tO) => {
        if (this.endboss.isCollidingCollectables(tO)) {
          let hittedsound = this.character.audio_smashingBottle;
          hittedsound.playbackRate = 3;
          if (!this.character.mute) hittedsound.play();
          this.endboss.hitted();
          this.StatusBarEndboss.setPercentage(this.endboss.energy);
        } else if (this.endboss.isCollidingCollectables(this.character)) {
          this.character.hit();
          let hurtsound = this.character.audio_hurt;
          hurtsound.playbackRate = 3;
          if (!this.character.mute) hurtsound.play();
          this.StatusBarHealth.setPercentage(this.character.energy);
        }
      });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0); //Standart

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); //Back
        // ----------- Space for fixed objects!!! ----------------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoins);
        if (this.character.x > 2000) {
            this.addToMap(this.statusBarEndboss);
        }
        this.ctx.translate(this.camera_x, 0); // Forward

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.smallChicken);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen 
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo); 
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    endbossAttacking() {
      if (this.character.x >= 3000) {
        this.endboss.attack();
      }
    }

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

    showEndscreen() {
      document.getElementById('endScreenContainer').classList.remove('d-none');
      this.clearIntervals();
      this.resetLvl();
      this.character.audio_background.pause();
    }

    resetLvl() {
      this.resetChickens();
      this.resetEndboss();
      this.resetCoins();
      this.resetBottles();
      this.resetSmallChickens();
    }

    resetChickens() {
      this.level.enemies.forEach((enemie) => {
        enemie.hitted = false;
        enemie.speed = 0.15 + Math.random() * 0.25;
      });
    }
  
    resetEndboss() {
      this.endboss.energy = 3;
    }
  
    resetCoins() {
      this.level.coins.splice(0, this.level.coins.length);
      this.level.coins.push(
        new CollectableObject(400),
        new CollectableObject(400 + 50),
        new CollectableObject(400 + 100),
        new CollectableObject(400 * 2),
        new CollectableObject(400 * 2 + 50),
        new CollectableObject(400 * 2 + 100),
        new CollectableObject(400 * 3),
        new CollectableObject(400 * 3 + 50),
        new CollectableObject(400 * 3 + 100),
        new CollectableObject(400 * 4),
        new CollectableObject(400 * 4 + 50),
        new CollectableObject(400 * 4 + 100),
        new CollectableObject(400 * 5),
        new CollectableObject(400 * 5 + 50),
        new CollectableObject(400 * 5 + 100),
      );
    }
  
    resetBottles() {
      this.level.bottles.splice(0, this.level.bottles.length);
      this.level.bottles.push(
        new CollectableBottle(250),
        new CollectableBottle(300),
        new CollectableBottle(650),
        new CollectableBottle(700),
        new CollectableBottle(1500),
        new CollectableBottle(1550),
      );
    }
  
    resetSmallChickens() {
      this.level.smallChicken.splice(0, this.level.smallChicken.length);
      this.level.smallChicken.push(
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
      );
    }

    addAllObjects() {
      this.addObjectsToMap(this.level.clouds);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.smallChicken);
      this.addObjectsToMap(this.throwableObjects);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.bottles);
    }
}



// class World {
//     levelSize = 100;
  
  
//     checkUnstoppable() {
//       if (this.character.collectedCoins === 12) this.character.unstoppable = true;
//       if (this.character.unstoppable === true) {
//         document.getElementById("unstoppable").classList.remove("d-none");
//         this.character.speed = 6;
//         setTimeout(() => {
//           this.stopUnstoppableMode();
//         }, 3000);
//       }
//     }
  
  
//     draw() {
//       this.ctx.clearRect(0, 0, canvas.width, canvas.height);
//       this.ctx.translate(this.camera_x, 0);
//       this.addObjectsToMap(this.level.backgroundObjects);
//       if (this.character.doAnimation) {
//         this.addToMap(this.character);
//         this.addToMap(this.endboss);
//         this.ctx.translate(-this.camera_x, 0);
//         this.addStatusbars();
//         this.ctx.translate(this.camera_x, 0);
//         this.addAllObjects();
//         this.ctx.translate(-this.camera_x, 0);
//         let self = this;
//         requestAnimationFrame(function () {
//           self.draw();
//         });
//       }
//     }

// stopUnstoppableMode() {
//   this.character.unstoppable = false;
//   this.character.collectedCoins = 0;
//   this.character.speed = 4;
//   document.getElementById("unstoppable").classList.add("d-none");
//   this.StatusBarCoins.setPercentage(this.character.collectedCoins);
// }