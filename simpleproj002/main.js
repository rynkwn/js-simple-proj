function draw() {
    var canvas = document.getElementById("tutorial");
    
    // Fails if canvas isn't supported by the browser.
    if(canvas.getContext) {
        var ctx = canvas.getContext("2d");
    } else {
    
    }   
}