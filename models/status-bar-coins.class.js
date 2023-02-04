class StatusBarCoins extends DrawableObject {
    percentage = 100;
    COINS_IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
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

    /**
    * Set the percentage of coins
    * @param {number} percentage - The percentage of coins
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.COINS_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Resolves the image index based on the percentage of coins
    * @return {number} - The image index
    */
    resolveImageIndex() {
        if (this.percentage >= 10) return 5;
        else if (this.percentage > 8) return 4;
        else if (this.percentage > 6) return 3;
        else if (this.percentage > 4) return 2;
        else if (this.percentage > 2) return 1;
        else return 0;
    }
}