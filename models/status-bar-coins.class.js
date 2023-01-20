class StatusBarCoins extends DrawableObject {
    percentage = 100;
    COINS_IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png', //Bild 0
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png', //Bild 1
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png', //Bild 2
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png', //Bild 3
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png', //Bild 4
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png', //Bild 5
    ];


    constructor() {
        super();
        this.loadImages(this.COINS_IMAGES);
        this.x = 40;
        this.y = 60;
        this.width = 200;
        this.height = 70;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => Bild 0 bis Bild 5
        let path = this.COINS_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}