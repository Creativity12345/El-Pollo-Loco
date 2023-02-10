class Endboss extends MovableObject{
    height = 400;
    width = 250;
    y = 55;
    offsetLeft = 25;
    offsetRight = 60;
    offsetTop = 90;
    offsetBottom = 110;
    activated = false;
    x = 2500;
    energy = 100;
    dead = false;
    speed = 7.5;
    otherDirection = false;

    audio_dying = new Audio('audio/win.mp3');

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
    ];

    IMAGES_DYING = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
    }

    /**
    * Checks the Endboss's condition and plays the appropriate animation.
    */
    checkCondition() {
        if (this.energy == 100) this.playAnimation(this.IMAGES_ALERT);
        if (this.energy < 100 && !this.otherDirection) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.moveLeft();
            this.changeDirectionRight();
        }
        if (this.energy < 100 && this.otherDirection) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.moveRight();
            this.changeDirectionLeft();
        }
        this.checkIsDead();
    }

    /**
    * Plays the hurt animation and decreases the Endboss's energy.
    */
    hitted() {
        this.playAnimation(this.IMAGES_HURT);
        this.energy -= 20;
    }

    /**
    * Checks if the Endboss's energy has reached 0 and plays the dying animation.
    */
    checkIsDead() {
        if (this.energy <= 0) {
            this.dead = true;
            this.speed = 0;
            this.playAnimation(this.IMAGES_DYING);
        if(!world.character.mute) {
            this.audio_dying.play();
        }
        }
    }

    /**
    * Changes the Endboss's direction to the right.
    */
    changeDirectionRight() {
        setTimeout(() => {
            this.otherDirection = true;
        }, 7500);
    }

    /**
    * Changes the Endboss's direction to the left.
    */
    changeDirectionLeft() {
        setTimeout(() => {
            this.otherDirection = false;
        }, 6000);
    }
}