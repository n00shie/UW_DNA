/**
 * Constructs a new particle with radius rad, position (x, y), 
 * starting velocity (vx, vy) and mass m
 */
function Particle(rad, x, y, vx, vy, m) {
    "use strict";
    /**
     * Checks if a particle is about to collide with a wall, and changes its velocity if it does.
     */
    function checkWallCollision() {
        if (x - rad <= 0 || x + rad >= width) {
            vx *= -1;
        }
        if (y - rad <= 0 || y + rad >= height) {
            vy *= -1;
        }
    }
    
    /**
     * Draws to screen.
     */
    function draw(ctx) {
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, 2.0 * Math.PI);
        ctx.fill();
    }
    
    /**
     * Updates particle position based on velocity
     */
    function update() {
        x += vx;
        y += vy;
    }
    
    this.rad = rad;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.m = m;
    this.draw = draw;
    this.update = update;
    this.checkWallCollision = checkWallCollision;
}

/**
 * Returns the distance between two particles
 */
function dist(particle1, particle2) {
    "use strict";
    return Math.sqrt(Math.pow(particle1.x - particle2.x, 2) + Math.pow(particle1.y - particle2.y, 2));
}

/**
 * Checks if two particles are colliding, and if they are then changes the velocity of particles
 */
function check_collision(p1, p2) {
    "use strict";
    if (dist(p1, p2) <= (p1.rad + p2.rad)) {
        p1.vx *= -1;
        p1.vy *= -1;
        p2.vx *= -1;
        p2.vy *= -1;
    }
}
