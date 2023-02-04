class StatusBarHealth extends DrawableObject {
    percentage = 100;
    HEALTH_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];


    constructor() {
        super();
        this.loadImages(this.HEALTH_IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 70;
        this.setPercentage(100);
    }

    /**
    * Sets the percentage of the health bar.
    * @param {Number} percentage - The new percentage of the health bar
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = Math.floor(this.percentage / 20);
        let path = this.HEALTH_IMAGES[index];
        this.img = this.imageCache[path];
    }

    /**
    * Resolves the image index for the health bar
    * @returns {Number} The index of the image for the current percentage of the health bar
    */
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