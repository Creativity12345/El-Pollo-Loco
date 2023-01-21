class CollectableBottle extends MovableObject {
    images_collectableBottle = [
      'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    height = 80;
    width = 80;
    offsetLeft = 10;
    offsetRight = 20;
    offsetTop = 10;
    offsetBottom = 20;
  
    constructor(x) {
      super();
      this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
      this.x = x;
      this.y = 350;
    }
  }