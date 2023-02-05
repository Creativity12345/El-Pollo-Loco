class ThrowableObject extends MovableObject {
  offsetLeft = 15;
  offsetRight = 35;
  offsetTop = 15;
  offsetBottom = 35;
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

  audio_throw = new Audio('audio/throw.mp3');
  audio_smashingBottle = new Audio('audio/bottleSmash.mp3');

  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_BOTTLEROTATION);
    this.loadImages(this.IMAGES_BOTTLESPLASH);
    if (world.character.otherDirection) {
      this.x = x - world.character.width + world.character.offsetLeft - world.character.offsetRight + this.offsetRight;
    } else {
      this.x = x - this.offsetLeft;
    }
    this.y = y - this.height + this.offsetBottom;
    this.height = 80;
    this.width = 80;
    this.throw();
    this.animate();
  }

  /**
  * Animate the throwable object
  */
  animate() {
    let bottleSmashed = false;
    setStoppableInterval(() => {
      if (this.y > 300 && !bottleSmashed) {
        this.playAnimation(this.IMAGES_BOTTLESPLASH);
        if (!world.character.muteSounds) {
          this.audio_smashingBottle.play();
        } else {
          this.audio_smashingBottle.volume = 0;
        }
        bottleSmashed = true;
      } else {
        this.playAnimation(this.IMAGES_BOTTLEROTATION);
      }
    }, 100);
  }

  /**
  * Throw the object
  */
  throw() {
    this.speedY = 20;
    this.applyGravity();

    if (!world.character.muteSounds) {
      this.audio_throw.play();
    } else {
      this.audio_throw.volume = 0;
    }

    setStoppableInterval(() => {
      if (world.character.otherDirection) {
        this.x -= 20;
      } else {
        this.x += 20;
      }
    }, 50);
  }
}