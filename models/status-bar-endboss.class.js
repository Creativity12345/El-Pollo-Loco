class StatusBarEndboss extends DrawableObject {
    percentage = 100;
    ENDBOSS_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];


    constructor() {
        super();
        this.loadImages(this.ENDBOSS_IMAGES);
        this.x = 400;
        this.y = 0;
        this.width = 200;
        this.height = 70;
        this.setPercentage(100);
    }

    /**
    * Sets the percentage of the end boss's health.
    * @param {number} percentage - The new percentage of the end boss's health.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.ENDBOSS_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Resolves the index of the image for the end boss's health status bar.
    * @returns {number} - The index of the image for the end boss's health status bar.
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