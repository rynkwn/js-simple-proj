var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Some constants
const BALL_SIZE = 10;
const SQUARE_SIZE = 20;

// The player character!
var ball = {
    x: 100,
    y: 100,
    radius: BALL_SIZE,
    color: 'green',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Creates and returns a square variable similar to the above.
function createSquare(x, y, size, color) {
    return square = {
        x: x,
        y: y,
        size: size,
        color: color,
        draw: function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, size, size);
        }
    }
}

function draw() {
    createSquare(200, 200, SQUARE_SIZE, 'red').draw();
    
    ball.draw();
}