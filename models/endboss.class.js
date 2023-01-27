class Endboss extends MovableObject{
    height = 400;
    width = 250;
    y = 55;
    offsetLeft = 25;
    offsetRight = 60;
    offsetTop = 90;
    offsetBottom = 110;
    activated = false;
    x = 719 * 5;
    energy = 3;
    speed = 7.5;
    otherDirection = false;

    audio_dying = new Audio("audio/win.mp3");

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
    ];

    IMAGES_DYING = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT );
        this.x = 2500;
        this.animate();
    }

    animate(){
        // if (this.x > 2400) {
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 150);        
        // }
    }

    checkCondition() {
        if (this.energy == 3) this.playAnimation(this.IMAGES_ALERT);
        if (this.energy < 3 && !this.otherDirection) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.moveLeft();
            this.changeDirectionRight();
        }
        if (this.energy < 3 && this.otherDirection) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.moveRight();
            this.changeDirectionLeft();
        }
        this.checkIsDead();
    }

    hitted() {
        this.playAnimation(this.IMAGES_HURT);
        this.energy--;
    }

    checkIsDead() {
        if (this.energy == 0) {
            this.speed = 0;
            this.playAnimation(this.IMAGES_DYING);
        // if(!world.character.mute) {
        //     this.audio_dying.play();
        // }
        }
    }

    changeDirectionRight() {
        setTimeout(() => {
            this.otherDirection = true;
        }, 7500);
    }

    changeDirectionLeft() {
        setTimeout(() => {
            this.otherDirection = false;
        }, 6000);
    }
}