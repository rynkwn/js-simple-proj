function simpleDraw() {
    var canvas = document.getElementById("tutorial");
    
    // Fails if canvas isn't supported by the browser.
    if(canvas.getContext) {
        var ctx = canvas.getContext("2d");
        
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);
        
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5';
        ctx.fillRect(30, 30, 50, 50);
        
        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.fill();
        ctx.closePath();
    } else {
    
    }   
}


// Animation tutorial.

var sun = new Image();
var moon = new Image();
var earth = new Image();

function init() {
    sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
    moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
    earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
    window.requestAnimationFrame(draw);
}

function draw() {
    var canvas = document.getElementById('tutorial');
    
    if(canvas.getContext) {
        var ctx = canvas.getContext("2d");
        
        // What is this?
        ctx.globalCompositeOperation = 'destination-over';
        
        ctx.clearRect(0, 0, 300, 300); // Clear canvas.
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
        ctx.save();
        
        // I imagine this moves our pointer to the center
        // of our new canvas.
        ctx.translate(150, 150);
        
        // Earth
        var time = new Date();
        ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2*Math.PI) / 60000) * time.getMilliseconds());
        ctx.translate(105, 0);
        ctx.fillRect(0, -12, 50, 24); // Shadow.
        ctx.drawImage(earth, -12, -12);
        
        // Moon
        ctx.save();
        ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
        ctx.translate(0, 28.5);
        ctx.drawImage(moon, -3.5, -3.5);
        ctx.restore();
        
        ctx.restore();
        
        ctx.beginPath();
        
        ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
        ctx.stroke();
        
        ctx.drawImage(sun, 0, 0, 300, 300);
        
        window.requestAnimationFrame(draw);
    } else {
        
    }
}

init();