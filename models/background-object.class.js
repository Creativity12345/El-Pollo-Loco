class BackgroundObject extends MovableObject{
    width = 720;
    height = 480;


    /**
    * Create a BackgroundObject.
    * @param {string} imagePath - The path to the image.
    * @param {number} x - The x-coordinate of the object.
    */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}