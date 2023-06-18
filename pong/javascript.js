


window.onload=function() 
{
    var canvas=document.getElementById("game"),
        ctx=canvas.getContext("2d");
    
    var width=300;
    var height=400;
    
    canvas.width=width;
    canvas.height=height;
    
    var bg=document.getElementById("bg");
    bg.width=width;
    bg.height=height;
    
    var bCtx=bg.getContext("2d");
    
    bCtx.fillStyle="#222";
    bCtx.fillRect(0,0,width,height);
    
    bCtx.setLineDash([6,12]);
    bCtx.moveTo(width/2,0);
    bCtx.lineTo(width/2,height);
    bCtx.strokeStyle="#fff";
    bCtx.lineWidth=4;
    bCtx.stroke();
    
    var view=document.getElementById("view");
    function scaleView()
    {
        var scale=Math.min(innerWidth/(width+50),innerHeight/(height+50));
        var transform = "translate(-50%,-50%) scale("+scale+")";
        view.style.WebkitTransform=transform;
        view.style.MozTransform=transform;
        view.style.MsTransform=transform;
        view.style.transform=transform;
    }
    scaleView();
    window.onresize=scaleView;
    
    function Rect(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.dx=0;
        this.dy=1;
    }
    Rect.prototype.move=function(v)
    {
        this.x+=this.dx*v;
        this.y+=this.dy*v;
    }
    Rect.prototype.bounce=function()
    {
        var dx = 0;
        if(this.y<10||this.y>height-this.h-10) this.dy*=-1;
        if(this.x<10||this.x>width-this.w-10) 
        {
            dx = this.dx;
            this.dx*=-1;
        }
        return dx;
    }
    Rect.prototype.border=function()
    {
        this.x=Math.min(Math.max(10,this.x),
          width-this.w-10);
        this.y=Math.min(Math.max(10,this.y),
          height-this.h-10);
    }
    Rect.prototype.AABB=function(rect)
    {
        return this.x<rect.x+rect.w &&
            this.x+this.w>rect.x &&
            this.y<rect.y+rect.h &&
            this.y+this.h>rect.y;
    }
    Rect.prototype.draw=function()
    {
        ctx.fillStyle="#fff";
        ctx.fillRect(this.x,this.y,
          this.w,this.h);
    }
    
    var paddle=new Rect(10,170,20,60);
    var ai=new Rect(width-10-20,170,20,60);
    
    var ball=new Rect(140,190,20,20);
    ball.dx=1;
    
    
    var ai_score = 0;
    var paddle_score = 0;
    
    var framerate=1000/40;
    var id;
    
    function listener()
    {
        if(id==null) 
        {
            id = setInterval(loop, framerate);
        } else 
        {
            paddle.dy*=-1;
        }
    }
    
    if(navigator.userAgent.match(/(Android|webOs|iPhone|iPad|BlackBerry|Windows Phone)/i))
    document.ontouchstart=listener;
    else document.onclick=listener;
    
    function loop()
    {
        paddle.move(4);
        paddle.border();
        
        if(ball.AABB(paddle)) ball.dx=1;
        if(ball.AABB(ai)) ball.dx=-1;
        ball.move(4);
        var ball_bounce_dx = ball.bounce();
        ball.border();
        
        if(ball_bounce_dx == 1) paddle_score++;
        if(ball_bounce_dx == -1) ai_score++;
        
        if(ai.y>ball.y+ball.h) ai.dy=-1;
        if(ai.y+ai.height<ball.y) ai.dy=1;
        ai.move(4);
        ai.bounce();
        ai.border();
        
        draw();
    }
    
    function draw()
    {
        ctx.clearRect(0,0,width,height);
        paddle.draw();
        ai.draw();
        ball.draw();
        
        ctx.font = "bold 32px Monospace";
        ctx.fillStyle = "white";
        ctx.textBaseline = "top";
        ctx.textAlign = "right";
        ctx.fillText(paddle_score, 140, 5);
        ctx.textAlign = "left";
        ctx.fillText(ai_score, 160, 5);
    }
    
    draw();
    ctx.globalAlpha = 0.6;
    ctx.font = "15px Monospace";
    ctx.textAlign="center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000";
    ctx.fillRect(20, height * 3/4-10, 260, 60);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fff";
    ctx.fillText("Click to play", width/2, height * 3/4);
    ctx.fillText("Click to change direction", width/2, height * 3/4 + 22);
}

