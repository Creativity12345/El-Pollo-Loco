class MovableObject {
    x = 120;
    y = 330;
    img;
    height = 100;
    width = 100;


    // loadImage ('img/test.png');
    loadImage(path){
        this.img = new Image(); // ist das selbe wie: this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    }


    moveRight() {
        console.log('Moving Right');
    }


    moveLeft(){
        
    }
}