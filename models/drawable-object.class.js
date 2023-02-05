class DrawableObject {
    x = 120;
    y = 0;
    height = 100;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;


    /**
    * loadImage - loads a single image into the object
    * @param {string} path - path to the image
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * loadImages - loads multiple images into the object
    * @param {Array} arr - array of image paths ['img/image1.png', 'img/image2.png', ...]
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
    * draw - draws the object onto a canvas
    * @param {CanvasRenderingContext2D} ctx - 2D rendering context of the canvas
    */
    draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * drawFrame - draws a blue frame around the object if conditions are met
    * @param {CanvasRenderingContext2D} ctx - 2D rendering context of the canvas
    */
    drawFrame(ctx) {
      if (this.canDrawFrame()) {
        ctx.beginPath();
        ctx.lineWidth = '3';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + this.offsetLeft, this.y + this.offsetTop, this.width - this.offsetRight, this.height - this.offsetBottom);
        ctx.stroke();
      }
    }
  
    /**
    * canDrawFrame - checks if the conditions are met to draw a frame
    * @returns {boolean} - true if conditions are met, false otherwise
    */
    canDrawFrame() {
     return this instanceof Character ||
      this instanceof Chicken ||
      this instanceof CollectableObject ||
      this instanceof CollectableBottle ||
      this instanceof ThrowableObject ||
      this instanceof smallChicken ||
      this instanceof Endboss
    }
}