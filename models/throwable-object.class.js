class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x - 70;
        this.y = y - 50;
        this.width = 80;
        this.height = 80;
        this.throw();
    }


    throw(){
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 20;
        }, 50);
    }
}