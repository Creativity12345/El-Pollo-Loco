class MovableObject {
    x;
    y;
    img;


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