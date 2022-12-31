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


    moveRight() {
        console.log('Moving Right');
    }


    moveLeft() {
            setInterval(() => {
                this.x -= this.speed;
            }, 1000 / 60);
    }
}