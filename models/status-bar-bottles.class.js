class StatusBarBottles extends DrawableObject {
    percentage = 100;
    BOTTLE_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];


    constructor() {
        super();
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = 40;
        this.y = 120;
        this.width = 200;
        this.height = 70;
        this.setPercentage(0);
    }

    /**
    * Sets the percentage of the status bar bottle.
    * @param {number} percentage - The percentage to set the status bar bottle to.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.BOTTLE_IMAGES[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Gets the index of the image to be used for the current percentage of the status bar bottle.
    * @return {number} - The index of the image to be used.
    */
    getImageIndex() {
        if (this.percentage >= 5) return 5;
        else if (this.percentage == 4) return 4;
        else if (this.percentage == 3) return 3;
        else if (this.percentage == 2) return 2;
        else if (this.percentage == 1) return 1;
        else return 0;
      }
    }