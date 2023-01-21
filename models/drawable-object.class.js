class DrawableObject {
    x = 120;
    y = 0;
    height = 100;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;


    // loadImage ('img/test.png');
    loadImage(path) {
        this.img = new Image(); // ist das selbe wie: this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    }

    /**
    *       
    * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
      if (
        this.canDrawFrame()
      ) {
        ctx.beginPath();
        ctx.lineWidth = '3';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + this.offsetLeft, this.y + this.offsetTop, this.width - this.offsetRight, this.height - this.offsetBottom);
        ctx.stroke();
      }
    }
  
    canDrawFrame() {
     return this instanceof Character ||
      this instanceof Chicken ||
      this instanceof CollectableObject ||
      this instanceof CollectableBottle ||
      this instanceof smallChicken ||
      this instanceof Endboss
    }
}