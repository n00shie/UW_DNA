function Walker() {
   "use strict";
    this.x = 200;
    this.y = 50;
    this.width = 140;
    this.height = 120;
    this.img = new Image();
    this.collisionBuffer = 10;
    this.mouseControl = false;
    this.img.src = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/80/SierpinskiTriangle.svg/200px-SierpinskiTriangle.svg.png';
    
    this.checkWallCollision = walkerCollidedWithWall;
    this.draw = draw;
    
    function walkerCollidedWithWall() {
      if(this.x + this.width + this.collisionBuffer > canvas.width || this.x - this.collisionBuffer < 0 
      || this.y - this.collisionBuffer < 0 || this.y + this.height + this.collisionBuffer > canvas.height) {
        return true;
      }
      return false;
    }
    
     /**
      * Draws to screen.
      */
    function draw(ctx) {
        clear();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
          
        if(this.mouseControl){
            return;
        }
          
        if(this.walkerCollidedWithWall()) {
            if(coinToss()){
                delta.x *= -1;
            }
            if(coinToss()){
                delta.y *= -1;
            }
          }
        
          this.x += delta.x;
          this.y += delta.y;
    }
}

var delta = {
    x: 1,
    y: 1
};

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function coinToss(){
  return Math.floor( Math.random() * 2 ) == 1;
}
