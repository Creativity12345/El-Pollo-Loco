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

    walking_sound = new Audio('audio/running.m4a');
    snore_sound = new Audio('audio/snore.mp3');
    audio_collectCoin = new Audio('audio/coinCollect1.mp3');
    audio_jump = new Audio('audio/jump.mp3');
    audio_collectBottle = new Audio('audio/collectBottle.mp3');
    audio_smashingBottle = new Audio('audio/bottleSmash.mp3');
    audio_bonusHP = new Audio('audio/chickenHitted.mp3');
    audio_hurt = new Audio('audio/hurt.mp3');
    audio_background = new Audio('audio/backgroundMusic.mp3');
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

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }
            if (this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
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

    playCharacterAnimations() {
      if (this.idle) this.playAnimation(this.IMAGES_IDLE);
      if (this.longIdle) this.playAnimation(this.IMAGES_LONGIDLE);
      if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
      else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
      else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
      else if (this.characterIsWalkingOnGround())
        this.playAnimation(this.IMAGES_WALKING);
    }

    jump() {
        this.speedY = 20;
    }

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
            this.snore_sound.play();
            this.audio_background.pause();
          }
        }
      }, 1000);
    }

    inactive() {
      return (
        !this.world.keyboard.right ||
        !this.world.keyboard.left ||
        !this.world.keyboard.space
      );
    }

    deactivateIdleMode() {
      this.idle = false;
      this.longIdle = false;
      this.snore_sound.pause();
      this.snore_sound.currentTime = 0;
    }

    moveCharacter() {
      if (this.canMoveRight()) this.moveRight();
      if (this.canMoveLeft()) this.moveLeft();
      if (this.canJump()) {
        if (!this.mute) this.audio_jump.play();
        this.jump();
      }
      this.moveCamera();
    }
  
    canMoveRight() {
      return this.world.keyboard.right && this.x < this.world.level.level_end_x;
    }
  
    moveRight() {
      super.moveRight();
      this.deactivateIdleMode();
      this.otherDirection = false;
      this.lastInteraction = new Date().getTime();
    }
  
    canMoveLeft() {
      return this.world.keyboard.left && this.x > 0;
    }
  
    moveLeft() {
      super.moveLeft();
      this.deactivateIdleMode();
      this.otherDirection = true;
      this.lastInteraction = new Date().getTime();
    }
  
    canJump() {
      return this.world.keyboard.space && !this.isAboveGround();
    }
  
    jump() {
      super.jump();
      this.deactivateIdleMode();
      this.lastInteraction = new Date().getTime();
    }
  
    moveCamera() {
      return (this.world.camera_x = -this.x + 100);
    }
  
    characterIsWalkingOnGround() {
      return (
        this.world.keyboard.right ||
        (this.world.keyboard.left && !this.isAboveGround())
      );
    }
}