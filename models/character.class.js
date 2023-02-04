class Character extends MovableObject {
    world;
    collectedCoins = 0;
    collectedBottles = 0;
    boostHP = false;
    doAnimation = true;
    lastInteraction = 0;
    mute = false;
    muteBg = false;
    idle = false;
    longIdle = false;
    y = 230;
    height = 200;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_IDLE = [
      'img/2_character_pepe/1_idle/idle/I-1.png',
      'img/2_character_pepe/1_idle/idle/I-2.png',
      'img/2_character_pepe/1_idle/idle/I-3.png',
      'img/2_character_pepe/1_idle/idle/I-4.png',
      'img/2_character_pepe/1_idle/idle/I-5.png',
      'img/2_character_pepe/1_idle/idle/I-6.png',
      'img/2_character_pepe/1_idle/idle/I-7.png',
      'img/2_character_pepe/1_idle/idle/I-8.png',
      'img/2_character_pepe/1_idle/idle/I-9.png',
      'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONGIDLE = [
      'img/2_character_pepe/1_idle/long_idle/I-11.png',
      'img/2_character_pepe/1_idle/long_idle/I-12.png',
      'img/2_character_pepe/1_idle/long_idle/I-13.png',
      'img/2_character_pepe/1_idle/long_idle/I-14.png',
      'img/2_character_pepe/1_idle/long_idle/I-15.png',
      'img/2_character_pepe/1_idle/long_idle/I-16.png',
      'img/2_character_pepe/1_idle/long_idle/I-17.png',
      'img/2_character_pepe/1_idle/long_idle/I-18.png',
      'img/2_character_pepe/1_idle/long_idle/I-19.png',
      'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGE_DEAD = ['img/2_character_pepe/5_dead/D-57.png'];

    audio_walking = new Audio('audio/running.m4a');
    audio_snore = new Audio('audio/snore.mp3');
    audio_collectCoin = new Audio('audio/coinCollect1.mp3');
    audio_jump = new Audio('audio/jump.mp3');
    audio_collectBottle = new Audio('audio/collectBottle.mp3');
    audio_bonusHP = new Audio('audio/chickenHitted.mp3');
    audio_hurt = new Audio('audio/hurt.mp3');
    audio_background = new Audio('audio/backgroundMusic.mp3');
    audio_lose = new Audio('audio/lose.mp3');
    offsetLeft = 20;
    offsetRight = 50;
    offsetTop = 90;
    offsetBottom = 100;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    /**
    * Sets up interval methods for the character's movement, animations, and audio, including walking, jumping, and idling. 
    */
    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.audio_walking.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.audio_walking.play();
            }
            if (this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.audio_jump.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.audio_snore.pause();
            } else if (this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }}
        }, 100);

        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.playCharacterAnimations(), 60);
    }

    /**
    * Plays the appropriate animations for the character depending on their state (dead, hurt, jumping, or walking) 
    */
    playCharacterAnimations() {
      if (this.idle) this.playAnimation(this.IMAGES_IDLE);
      if (this.longIdle) this.playAnimation(this.IMAGES_LONGIDLE);
      if (this.isDead()) this.playAnimation(this.IMAGES_DEAD), this.audio_lose.play();
      else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
      else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
      else if (this.characterIsWalkingOnGround())
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
    * Makes the character jump by setting its speed in the Y direction
    */
    jump() {
        this.speedY = 20;
    }

    /**
    * The `checkIdleMode` function sets an interval that checks the time elapsed since the last interaction with the game.
    * If the time elapsed is greater than 3 seconds, it sets the `idle` property to `true`.
    * If the time elapsed is greater than 6 seconds, it sets the `idle` property to `false`, `longIdle` property to `true`, and plays the `audio_snore` and pauses the `audio_background`.
    */
    checkIdleMode() {
      setStoppableInterval(() => {
        if (this.inactive()) {
          let timepassed = new Date().getTime() - this.lastInteraction;
          timepassed = timepassed / 1000;
          if (timepassed > 3) {
            this.idle = true;
          }
          if (timepassed > 6) {
            this.idle = false;
            this.longIdle = true;
            this.audio_snore.play();
            this.audio_background.pause();
          }
        }
      }, 1000);
    }

    /**
    * The `inactive` function returns `true` if none of the right, left or space keys on the keyboard are active.
    * @returns {boolean}
    */
    inactive() {
      return (
        !this.world.keyboard.right ||
        !this.world.keyboard.left ||
        !this.world.keyboard.space
      );
    }

    /**
    * The `deactivateIdleMode` function sets the `idle` property to `false`, `longIdle` property to `false`, pauses the `audio_snore`, and resets its current time to 0.
    */
    deactivateIdleMode() {
      this.idle = false;
      this.longIdle = false;
      this.audio_snore.pause();
      this.audio_snore.currentTime = 0;
    }

    /**
    * The `moveCharacter` function moves the character based on the active keys.
    * If the right key is active, it moves the character to the right.
    * If the left key is active, it moves the character to the left.
    * If the space key is active, it makes the character jump.
    * It also moves the camera.
    */
    moveCharacter() {
      if (this.canMoveRight()) this.moveRight();
      if (this.canMoveLeft()) this.moveLeft();
      if (this.canJump()) this.jump();
      this.moveCamera();
    }
  
    /**
    * The `canMoveRight` function returns `true` if the right key on the keyboard is active and the character's x position is less than the level end x position.
    * @returns {boolean}
    */
    canMoveRight() {
      return this.world.keyboard.right && this.x < this.world.level.level_end_x;
    }
  
    /**
    * The `moveRight` function moves the character to the right, deactivates the idle mode, sets the `otherDirection` property to `false`, and updates the `lastInteraction` time.
    */
    moveRight() {
      super.moveRight();
      this.deactivateIdleMode();
      this.otherDirection = false;
      this.lastInteraction = new Date().getTime();
    }
  
    /**
    * The `canMoveLeft` function returns `true` if the left key on the keyboard is active and the character's x position is greater than 0.
    * @returns {boolean}
    */
    canMoveLeft() {
      return this.world.keyboard.left && this.x > 0;
    }
  
    /**
    * The `moveLeft` function moves the character to the left, deactivates the idle mode, sets the `otherDirection` property to `true`, and updates the `lastInteraction` time.
    */
    moveLeft() {
      super.moveLeft();
      this.deactivateIdleMode();
      this.otherDirection = true;
      this.lastInteraction = new Date().getTime();
    }
  
    /**
    * The `canJump` function returns `true` if the space key on the keyboard is active and the character is not above the ground.
    * @returns {boolean}
    */
    canJump() {
      return this.world.keyboard.space && !this.isAboveGround();
    }
  
    /**
    * The `jump` function makes the character jump, deactivates the idle mode, and updates the `lastInteraction` time.
    */
    jump() {
      super.jump();
      this.deactivateIdleMode();
      this.lastInteraction = new Date().getTime();
    }
  
    /**
    * The `moveCamera` function sets the camera's x position to the character's x position minus 100.
    * @returns {number}
    */
    moveCamera() {
      return (this.world.camera_x = -this.x + 100);
    }
  
    /**
    * The `characterIsWalkingOnGround` function returns `true` if either the right or left keys on the keyboard are active and the character is not above the ground.
    */
    characterIsWalkingOnGround() {
      return (
        this.world.keyboard.right ||
        (this.world.keyboard.left && !this.isAboveGround())
      );
    }
}        