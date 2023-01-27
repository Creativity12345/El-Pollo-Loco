class ThrowableObject extends MovableObject {
    IMAGES_BOTTLEROTATION = [
      'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_BOTTLESPLASH = [
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
  
    constructor(x, y) {
      super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
      this.loadImages(this.IMAGES_BOTTLEROTATION);
      this.loadImages(this.IMAGES_BOTTLESPLASH);
      this.x = x;
      this.y = y - 70;
      this.height = 80;
      this.width = 80;
      this.animate();
      this.throw();
    }
  
    animate() {
      setStoppableInterval(() => {
        if (this.y > 300) this.playAnimation(this.images_bottleSplash);
        else this.playAnimation(this.images_bottleRotation);
      }, 100);
    }
  
    throw() {
      this.speedY = 20;
      this.applyGravity();
      setStoppableInterval(() => {
        this.x += 20;
      }, 50);
    }
  }