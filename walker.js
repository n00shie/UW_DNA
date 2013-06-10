function Walker() {
   "use strict";

   function setMouseControl (mouseCtrl) {
        this.mouseControl = mouseCtrl;
   }

    /**
     * Checks if this particle is colliding with p, and if they are switches their velocities
     */
    function checkCollision(p) {
        "use strict";
        if (dist(this, p) <= (this.rad + p.rad)) {
            this.vx *= -1;
            this.vy *= -1;
            p.vx *= -1;
            p.vy *= -1;
        }
    }

    function checkWallCollision() {
        if (!this.mouseControl) {
            if (this.x - (this.width / 2) <= 0 || this.x + (this.width / 2) >= width) {
                this.vx *= -1;
            }
            else if (this.y - (this.height / 2) <= 0 || this.y + (this.height / 2) >= height) {
                this.vy *= -1;
            }
        }
    }

    function update() {
        if (!this.mouseControl) { //if it's under mouse control, x and y are controlled by mouse position.
            this.x += this.vx;
            this.y += this.vy;
        }
    }
    
    /**
     * Draws to screen.
     */
    function draw(ctx) {
        ctx.drawImage(this.img, this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
    }

    this.rad = 130;
    this.x = 200;
    this.y = 50;
    this.vx = 5;
    this.vy = 5;
    this.width = 140;
    this.height = 120;
    this.img = new Image();
    this.collisionBuffer = 10;
    this.mouseControl = false;
    this.img.src = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/80/SierpinskiTriangle.svg/200px-SierpinskiTriangle.svg.png';

    this.checkWallCollision = checkWallCollision;
    this.draw = draw;
    this.update = update;
    this.checkCollision = checkCollision;
    this.setMouseControl = setMouseControl;
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function coinToss(){
  return Math.floor( Math.random() * 2 ) == 1;
}