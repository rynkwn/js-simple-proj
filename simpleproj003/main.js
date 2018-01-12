var canvas = document.getElementById('canvas');
var score = document.getElementById('score');
var ctx = canvas.getContext('2d');

// What's this for?
var raf;

// Some game engine variables.
var gameLength = 0;

// Some constants
const BALL_SIZE = 10;
const SQUARE_SIZE = 20;

const BASE_SPEED = 2;
const BASE_ENEMY_SPEED = 1;

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

var enemies = [];

// Creates and returns a square variable similar to the above.
function createSquare(xval, yval, vxVal, vyVal, sizeVal, colorVal) {
    return square = {
        x: xval,
        y: yval,
        vx: vxVal,
        vy: vyVal,
        size: sizeVal,
        color: colorVal,
        draw: function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }
}

// Create an enemy and add it to our enemies list.
function createEnemy(x, y, vx, vy) {
    var square = createSquare(x, y, vx, vy, SQUARE_SIZE, 'red');
    enemies.push(square);
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


// Simple game engine thing. Advances score. Generates new enemies as
// score advances.
function gameLogic() {
    gameLength ++;
    
    // Spawn new enemies based on gameLength;
    
    if(gameLength % 100 == 0) {
        var numNewEnemies = Math.floor(gameLength / 1000);
        numNewEnemies += 1;
        
        for(var i = 0; i < numNewEnemies; i++) {
            var direction = Math.floor((Math.random() * 4) + 1);
            
            switch(direction) {
                case 1: // Right
                    var initialY = Math.floor((Math.random() * (canvas.height - SQUARE_SIZE)));
                    createEnemy(0, initialY, BASE_ENEMY_SPEED, 0);
                    break;
                    
                case 2: // Left
                    var initialY = Math.floor((Math.random() * (canvas.height - SQUARE_SIZE)));
                    createEnemy(canvas.width - SQUARE_SIZE, initialY, -BASE_ENEMY_SPEED, 0);
                    break;
                    
                case 3: // Down
                    var initialX = Math.floor((Math.random() * (canvas.width - SQUARE_SIZE)));
                    createEnemy(initialX, 0, 0, BASE_ENEMY_SPEED);
                    break;
                    
                case 4: // Up
                    var initialX = Math.floor((Math.random() * (canvas.width - SQUARE_SIZE)));
                    createEnemy(initialX, canvas.height + SQUARE_SIZE, 0, -BASE_ENEMY_SPEED);
                    break;
            }
        }
    }
}

// Updates the score display!
function updateScore() {
    score.innerHTML = "Score: " + gameLength;
}


createEnemy();

// Main draw function.
function draw() {
    clearCanvas();
    
    
    moveShape(ball, ball.vx, ball.vy);
    ball.draw();
    
    gameLogic();
    updateScore();
    
    for (var i = 0; i < enemies.length; i++) {
        moveShape(enemies[i], enemies[i].vx, enemies[i].vy);
        enemies[i].draw();
    }
    
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