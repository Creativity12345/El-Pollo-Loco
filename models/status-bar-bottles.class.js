class StatusBarBottles extends DrawableObject {
    percentage = 100;
    BOTTLE_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', //Bild 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png', //Bild 1
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png', //Bild 2
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png', //Bild 3
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png', //Bild 4
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png', //Bild 5
    ];


    constructor() {
        super();
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 70;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => Bild 0 bis Bild 5
        let path = this.BOTTLE_IMAGES[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

    getImageIndex() {
        if (this.percentage >= 5) return 5;
        else if (this.percentage == 4) return 4;
        else if (this.percentage == 3) return 3;
        else if (this.percentage == 2) return 2;
        else if (this.percentage == 1) return 1;
        else return 0;
      }
    }