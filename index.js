const computerScore = document.getElementById('computer');
const playerScore = document.getElementById('player');

const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

let color = "white";
let cScore = 0;

function resize() {
    if (window.innerWidth < 800) {
        canvas.width = window.innerWidth;
        canvas.height = canvas.width / 1.5;
    }
    else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
resize();

var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('touchmove', (e) => {
    mouse.y = e.touches[0].clientY;
})

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function distance(x1, y1, x2, y2) {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.velocity = { x: dx, y: dy };

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function () {
        this.draw();
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

function Computer(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.drawComputer = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.computerUpdate = function () {
        this.drawComputer();

        if (distance(ball.x, ball.y, this.x, this.y + this.height / 2) <= ball.radius) {
            ball.dx = -ball.dx;
        }

        this.y = ball.y - this.height / 2;
    }
}

function Player(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.drawPlayer = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.playerUpdate = function () {
        this.drawPlayer();

        if (mouse.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }
        else if(mouse.y < 0){
            this.y = 0;
        }
        else if(mouse.y > 0 && mouse.y < canvas.height){
            this.y = mouse.y;
        }
        if (ball.x <= this.x + this.width + ball.radius && (ball.y >= this.y && ball.y <= this.y + this.height)) {
            ball.dx = -ball.dx;
        }
    }
}

let barWidth = canvas.width / 40;
let barHeight = canvas.height / 5;

var ball = new Ball(canvas.width / 2, canvas.height / 2, 5, 5, canvas.width / 100, color);
var computer = new Computer(canvas.width - barWidth - 5, canvas.height / 2 - barHeight / 2, barWidth, barHeight, color);
var player = new Player(5, canvas.height / 2 - barHeight / 2, barWidth, barHeight, color);

function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.fillStyle = "grey";
    ctx.fillRect(dividerX, 0, dividerWidth, canvas.height);

    computer.computerUpdate();
    player.playerUpdate();
    ball.update();

    if (ball.x - ball.radius <= 0) {
        ball.dx = 0;
        ball.dy = 0;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = ball.velocity.x;
        ball.dy = ball.velocity.y;
        cScore++;
        computerScore.innerHTML = cScore;
    }

}

setInterval(() => {
    if(ball.dx <= 10 && ball.dy <= 10 && ball.dx >= -10 && ball.dy >= -10){
        ball.dx *= 1.05;
        ball.dy *= 1.05;
    }
}, 5000);

let dividerWidth = 10;
let dividerX = canvas.width / 2 - dividerWidth / 2;
ctx.fillStyle = "grey";
ctx.fillRect(dividerX, 0, dividerWidth, canvas.height);
ball.draw();
player.drawPlayer();
computer.drawComputer();

setTimeout(() => {
    animate();
}, 5000);