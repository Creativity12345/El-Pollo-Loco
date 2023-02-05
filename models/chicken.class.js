class Chicken extends MovableObject {
    energy = 20;
    height = 70;
    width = 70;
    y = 355;
    x = 400 + Math.random() * 3000;
    IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    offsetLeft = 10;
    offsetRight = 20;
    offsetTop = 10;
    offsetBottom = 20;
    hitted = false;
    audio_hitted = new Audio('audio/chickenHitted.mp3');
  
    constructor() {
      super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGE_DEAD);
      this.animate();
      this.speed = 0.15 + Math.random() * 0.25;
    }
  
    /**
    * animate the chickens
    */
    animate() {
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
  
      setInterval(() => {
        if (!this.hitted) this.playAnimation(this.IMAGES_WALKING);
        else {
          this.playAnimation(this.IMAGE_DEAD);
          this.speed = 0;
        }
      }, 100);
    }

    /**
    * Checks if the enemys energy has reached 0 and plays the dying animation.
    */
    checkIsDead() {
      if (this.energy == 0) {
          this.speed = 0;
          this.playAnimation(this.IMAGE_DEAD);
      if(!world.character.muteSounds) {
          this.audio_dying.play();
      }
      }
    }
  }