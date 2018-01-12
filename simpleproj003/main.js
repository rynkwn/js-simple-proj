var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// What's this for?
var raf;

// Some constants
const BALL_SIZE = 10;
const SQUARE_SIZE = 20;

const BASE_SPEED = 2;

// The player character!
var ball = {
    x: 100,
    y: 100,
    vx: 0,
    vy: 0,
    size: BALL_SIZE,
    color: 'green',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Creates and returns a square variable similar to the above.
function createSquare(xval, yval, sizeVal, colorVal) {
    return square = {
        x: xval,
        y: yval,
        size: sizeVal,
        color: colorVal,
        draw: function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }
}

// Clears the canvas... It is one line, but this is a much
// shorter line.
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Moves a shape.
function moveShape(shape, xDif, yDif) {
    
    var newX = shape.x + xDif;
    var newY = shape.y + yDif;
    
    // First, make sure they're not moving off the screen.
    if(newX <= canvas.width - shape.size &&  newX >= 0) {
        shape.x = newX;
    }
    
    if(newY <= canvas.height - shape.size && newY >= 0) {
        shape.y = newY;
    }
}

var square = createSquare(200, 200, SQUARE_SIZE, 'red');

function draw() {
    clearCanvas();
    
    
    moveShape(ball, ball.vx, ball.vy);
    ball.draw();
    
    moveShape(square, 1, -1);
    square.draw();
    raf = window.requestAnimationFrame(draw);
}


// CONTROLS

function keyDownListener(e) {
    var keyCode = e.keyCode;
    
    // s
    if(keyCode == 83) {
        ball.vy = BASE_SPEED;
    } else if(keyCode == 68) { // d
        ball.vx = BASE_SPEED;
    } else if(keyCode == 87) { // w
        ball.vy = -BASE_SPEED;
    } else if(keyCode == 65) { // a
        ball.vx = -BASE_SPEED;
    }
}

function keyUpListener(e) {
    var keyCode = e.keyCode;
    
    // s
    if(keyCode == 83) {
        ball.vy = 0;
    } else if(keyCode == 68) { // d
        ball.vx = 0;
    } else if(keyCode == 87) { // w
        ball.vy = 0;
    } else if(keyCode == 65) { // a
        ball.vx = 0;
    }
}


// Can't have the canvas have this event listener, as it only pops
// when the element is in focus, and canvases may not be able to go
// into focus.
document.addEventListener("keydown", keyDownListener, false);
document.addEventListener("keyup", keyUpListener, false);