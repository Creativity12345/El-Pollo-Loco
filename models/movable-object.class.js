class MovableObject {
    x = 120;
    y = 325;
    img;
    height = 100;
    width = 100;
    imageCache = [];
    currentImage = 0;
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 230;
    }

    // loadImage ('img/test.png');
    loadImage(path) {
        this.img = new Image(); // ist das selbe wie: this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue'; 
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
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

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 0 % 6; => 0, Rest 0     bei  let i = 6 % 6; => 1, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
    }
}