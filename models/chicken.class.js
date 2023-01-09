class Chicken extends MovableObject {
    height = 70;
    width = 70;
    y = 355;
    x = 400 + Math.random() * 3000; // Math random = zufällige Zahl zwischen 0 und 1
    images_walking = [
      "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];
    image_dead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
    offset = {
      top: 10,
      left: 0,
      right: 0,
      bottom: 10,
    };
    hitted = false;
    audio_hitted = new Audio("audio/chickenHitted.mp3");
  
    constructor() {
      super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
      this.loadImages(this.images_walking);
      this.loadImages(this.image_dead);
      this.animate();
      this.speed = 0.15 + Math.random() * 0.25;
    }
  
    animate() {
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);
  
      setInterval(() => {
        if (!this.hitted) this.playAnimation(this.images_walking);
        else {
          this.playAnimation(this.image_dead);
          this.speed = 0;
        }
      }, 100);
    }
  }


// class Chicken extends MovableObject{
//     y = 360;
//     width = 70;
//     height = 70;
//     IMAGES_WALKING = [
//         'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
//         'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
//         'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
//     ];

//     constructor(){
//         super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
//         this.loadImages(this.IMAGES_WALKING);

//         this.x = 200 + Math.random() * 500; //Zahl zwischen 200 und 500
//         this.speed = 0.75 + Math.random() * 0.25;
//         this.animate();
//     }

//     animate() {
//         setInterval(() => {
//             this.moveLeft();
//         }, 1000 / 60);

//         setInterval(() => {
//             this.playAnimation(this.IMAGES_WALKING);
//         }, 150);
//     }
// }  