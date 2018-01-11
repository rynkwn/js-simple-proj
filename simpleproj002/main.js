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

function draw() {
    var canvas = document.getElementById('tutorial');
    
    if(canvas.getContext) {
        var ctx = canvas.getContext("2d");
    } else {
        
    }
}