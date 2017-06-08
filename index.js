window.onload = function(){
    function getDevicePixelRatio(){
        // return window.devicePixelRatio || 1;
        return 2;
    }
    const loadingSize = 80;
    const p = getDevicePixelRatio();
    let canvas = document.getElementById('loading-canvas');
    let ctx = canvas.getContext('2d');
    canvas.style.width = loadingSize + "px";
    canvas.style.height = loadingSize + "px";
    canvas.width = loadingSize*p;
    canvas.height = loadingSize*p;

    const lines = ["rgba(110, 195, 254, .7)",  
                   "rgba(165, 217, 252, .5)",  
                   "rgba(157, 192, 249, .2)"];  
    let step = 0;  
    let bubbleArray = [];

    function newBubble() {
        var circle = new createCircle();
        bubbleArray.push(circle);
    }
    function createCircle() {
        this.x = loadingSize*p/4 + (Math.random()*loadingSize*p/2);
        this.y = loadingSize*p - (Math.random()*loadingSize*p/2);
        this.color = 199 + (Math.random() * 15);
        this.radius = 3;
        this.xVel = Math.random() - 0.5;
        this.apc = 0.6;
        this.render = function(c) {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            c.fillStyle = 'hsla(' + this.color + ',100%,60%,' + this.apc + ')';
            c.fill()
        };
        this.update = function() {
            this.y -= 1;
            this.x += this.xVel;
            this.apc -= 0.01;
            this.radius += 0.2;
        }
    }
    function loop(){  
        ctx.clearRect(0,0,canvas.width,canvas.height);  
        // wave
        step += 2;
        for(let j = lines.length - 1; j >= 0; j--) {  
            ctx.fillStyle = lines[j];  
            let angle = (step+j*70)*Math.PI/180;  
            let deltaHeight = Math.sin(angle) * (loadingSize/4);  
            let deltaHeightRight = Math.cos(angle) * (loadingSize/4);
            ctx.beginPath();  
            ctx.moveTo(0, canvas.height/2+deltaHeight);  
            ctx.bezierCurveTo(canvas.width/2, canvas.height/2+deltaHeight-(loadingSize/4), canvas.width/2, canvas.height/2+deltaHeightRight-(loadingSize/4), canvas.width, canvas.height/2+deltaHeightRight);  
            ctx.lineTo(canvas.width, canvas.height);  
            ctx.lineTo(0, canvas.height);  
            ctx.lineTo(0, canvas.height/2+deltaHeight);  
            ctx.closePath();  
            ctx.fill();
        }  
        // bubble  
        for (let i = 0; i < bubbleArray.length; i++) {
            let ss = bubbleArray[i];
            ss.render(ctx);
            ss.update()
        }
        if (bubbleArray.length > 100) {
            bubbleArray.shift()
        }
    } 
    setInterval(function (){
        loop();
    }, 17);
    setInterval(function (){
        newBubble();
    }, 180);
}   