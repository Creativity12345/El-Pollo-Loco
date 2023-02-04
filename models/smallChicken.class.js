class smallChicken extends MovableObject {
    height = 50;
    width = 50;
    y = 370;
    x = 400 + Math.random() * 3000;
    IMAGES_WALKING = [
      './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
      './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
      './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    offsetLeft = 10;
    offsetRight = 15;
    offsetTop = 5;
    offsetBottom = 10;
  
    constructor() {
      super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
      this.loadImages(this.IMAGES_WALKING);
      this.animate();
      this.speed = 1 + Math.random() * 1.5;
    }
  
    /**
    * animate the small chickens
    */
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
      }, 1000 / 60);
    }
  }