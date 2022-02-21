const computerScore = document.getElementById('computer');
const playerScore = document.getElementById('player');

const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

let color = "white";

function resize(){
    if (window.innerWidth < 500) {
        canvas.width = window.innerWidth - 20;
        canvas.height = canvas.width / 2;
    }
    else {
        canvas.width = window.innerWidth / 1.5;
        canvas.height = canvas.width / 2;
    }
}
resize();

var mouse = {
    x:undefined,
    y:undefined
}
window.addEventListener('mousemove', function (event){
    mouse.x = event.x;
    mouse.y = event.y;
})

function distance(x1,y1,x2,y2){
    let x = x2-x1;
    let y = y2-y1;
    return Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
}

function Ball(x, y, dx, dy, radius,color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function () {
        this.draw();
        
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}

function Computer(x,y,width,height,color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.drawComputer = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.computerUpdate = function(){
        this.drawComputer();

        if(distance(ball.x,ball.y,this.x,this.y + this.height/2) <= ball.radius){
            ball.dx = -ball.dx;
        }

        this.y = ball.y - this.height/2;      
    }
}

function Player(x,y,width,height,color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.drawPlayer = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.playerUpdate = function(){
        this.drawPlayer();

        if(mouse.y + this.height > canvas.height || mouse.y < 0){
            return;
        }
        else{
            this.y = mouse.y;
        }
        let d = distance(this.x,this.y,ball.x,ball.y);
        if(ball.x <= this.x+this.width+ball.radius && (ball.y >= this.y && ball.y <= this.y+this.height)){
            ball.dx = -ball.dx;
        }
        else{
            gameover();
        }
    }
}

let barWidth = canvas.width/40;
let barHeight = canvas.height/5;

var ball = new Ball(canvas.width / 2, canvas.height / 2, 3, 3, canvas.width/100, color);
var computer = new Computer(canvas.width - barWidth - 5, canvas.height/2 - barHeight/2,barWidth,barHeight,color);
var player = new Player(5,canvas.height/2 - barHeight/2, barWidth, barHeight,color);

function gameover(){

}

function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    let dividerWidth = 10;
    let dividerX = canvas.width / 2 - dividerWidth / 2;
    ctx.fillStyle = "grey";
    ctx.fillRect(dividerX, 0, dividerWidth, canvas.height);
    
    computer.computerUpdate();
    player.playerUpdate();
    ball.update();
}

animate();