/*jslint browser:true*/
/*jslint devel:true*/
/*jslint plusplus:true*/

var canvas;
var ctx;
var displayables; //array of all objects in the animation
var i, j; //looping variables
var FPS = 60;
var NUM_OF_PARTICLES = 5;
var height;
var width;
var walker;

/**
 * Initializes all objects in animation
 */
function set_up() {
    "use strict";
    //populate variables
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    displayables = []; //array of all objects in the animation
    height = canvas.height;
    width = canvas.width;
        
    //register event handlers
    canvas.addEventListener('mouseover', on_mouse_over, false);
    canvas.addEventListener('mouseout', on_mouse_out, false);
    canvas.addEventListener('mousemove', on_mouse_move, false);
    
    //populate particles
    var radius, x, y, vx, vy, mass;
    for (i = 0; i < NUM_OF_PARTICLES; i++) {
        radius = Math.round((Math.random() * 10) + 20);
        x = Math.round((Math.random() * (width - 100)) + 50);
        y = Math.round((Math.random() * (height - 100)) + 50);
        vx = Math.round((Math.random() * 20) - 10);
        vy = Math.round((Math.random() * 20) - 10);
        //mass = Math.round((Math.random() * 40) + 20);
        mass = radius;
        displayables.push(new Particle(radius, x, y, vx, vy, mass));
    }

    //Add Walker to displayables
    walker = new Walker();
    displayables.push(walker);
    NUM_OF_PARTICLES++;
}

function on_mouse_over(ev) {
    var mouseX, mouseY;
    // calculates X and Y coords of the mouse relative to the canvas
    // if statements are for browser compliancy
    // for more info see:
    // http://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
    // TODO: Refactor this into a seperate method for less repeated code
    if(ev.offsetX) {
        mouseX = ev.offsetX;
        mouseY = ev.offsetY;
    }
    else if(ev.layerX) {
        mouseX = ev.layerX;
        mouseY = ev.layerY;
    }

    if (mouseX - (walker.width / 2) <= 0 || mouseX + (walker.width / 2) >= width ||
        mouseY - (walker.height / 2) <= 0 || mouseY + (walker.height / 2) >= height) { //if outside of range
        walker.setMouseControl(false);
    }
    else {
        walker.setMouseControl(true);
    }
}

function on_mouse_out(ev) {
    walker.setMouseControl(false);
}

function on_mouse_move(ev) {
    var mouseX, mouseY;
    // calculates X and Y coords of the mouse relative to the canvas
    // TODO: refactor; see on_mouse_over()
    if(ev.offsetX) {
        mouseX = ev.offsetX;
        mouseY = ev.offsetY;
    }
    else if(ev.layerX) {
        mouseX = ev.layerX;
        mouseY = ev.layerY;
    }

    if (mouseX - (walker.width / 2) <= 0 || mouseX + (walker.width / 2) >= width ||
        mouseY - (walker.height / 2) <= 0 || mouseY + (walker.height / 2) >= height) { //if outside of range
        walker.setMouseControl(false);
    }
    else {
        walker.setMouseControl(true);
        walker.x = mouseX;
        walker.y = mouseY;
    }
}

/**
 * Updates the screen
 */
function draw() {
    "use strict";
    ctx.clearRect(0, 0, width, height);
    
    walker.draw(ctx);

    for (i = 1; i < NUM_OF_PARTICLES - 1; i++) {
        displayables[i].draw(ctx);
    }
}

/**
 * The main loop
 */
function run() {
    "use strict";
    for (i = 0; i < NUM_OF_PARTICLES; i++) {
        displayables[i].update();
        displayables[i].checkWallCollision();
    }
    for (i = 0; i < NUM_OF_PARTICLES - 1; i++) {
        for (j = i + 1; j < NUM_OF_PARTICLES; j++) {
            displayables[i].checkCollision(displayables[j]);
        }
    }
    draw();
}

/**
 * Run this to start the animation
 */
function init() {
    "use strict";
    set_up();
    setInterval(run, 1000 / FPS);
}
