
var cvs = document.getElementById("breakout");
var ctx = cvs.getContext("2d");
cvs.style.border = "1px solid #0ff";

ctx.lineWidth = 3;


var PADDLE_WIDTH = 100;
var PADDLE_MARGIN_BOTTOM = 50;
var PADDLE_HEIGHT = 20;
var BALL_RADIUS = 8;
var LIFE = 3; 
var SCORE = 0;
var SCORE_UNIT = 10;
var LEVEL = 1;
var MAX_LEVEL = 3;
var GAME_OVER = false;
var leftArrow = false;
var rightArrow = false;


var paddle = {
    x : cvs.width/2 - PADDLE_WIDTH/2,
    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx :5
}

function drawPaddle(){
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

document.addEventListener("keydown", function(event){
   if(event.keyCode == 37){
       leftArrow = true;
   }else if(event.keyCode == 39){
       rightArrow = true;
   }
});
document.addEventListener("keyup", function(event){
   if(event.keyCode == 37){
       leftArrow = false;
   }else if(event.keyCode == 39){
       rightArrow = false;
   }
});

function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}

var ball = {
    x : cvs.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 4,
    dx : 3 * (Math.random() * 2 - 1),
    dy : -3
}

function drawBall(){
    ctx.beginPath();
    
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#ffcd05";
    ctx.fill();
    
    ctx.strokeStyle = "#2e3548";
    ctx.stroke();
    
    ctx.closePath();
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}


function ballWallCollision(){
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
        WALL_HIT.play();
    }
    
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
        WALL_HIT.play();
    }
    
    if(ball.y + ball.radius > cvs.height){
        LIFE--; 
        LIFE_LOST.play();
        resetBall();
    }
}

function resetBall(){
    ball.x = cvs.width/2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}


function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
        

        PADDLE_HIT.play();
        var collidePoint = ball.x - (paddle.x + paddle.width/2);
        collidePoint = collidePoint / (paddle.width/2);
        var angle = collidePoint * Math.PI/3;       
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

var brick = {
    row : 1,
    column : 5,
    width : 55,
    height : 20,
    offSetLeft : 20,
    offSetTop : 20,
    marginTop : 40,
    fillColor : "#2e3548",
    strokeColor : "#FFF"
}

var bricks = [];

function createBricks(){
    for(var r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(var c = 0; c < brick.column; c++){
            bricks[r][c] = {
                x : c * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                y : r * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                status : true
            }
        }
    }
}

createBricks();


function drawBricks(){
    for(var r = 0; r < brick.row; r++){
        for(var c = 0; c < brick.column; c++){
            var b = bricks[r][c];
            if(b.status){
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);
                
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x, b.y, brick.width, brick.height);
            }
        }
    }
}

function ballBrickCollision(){
    for(var r = 0; r < brick.row; r++){
        for(var c = 0; c < brick.column; c++){
            var b = bricks[r][c];
    
            if(b.status){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
                    BRICK_HIT.play();
                    ball.dy = - ball.dy;
                    b.status = false; 
                    SCORE += SCORE_UNIT;
                }
            }
        }
    }
}

function showGameStats(text, textX, textY, img, imgX, imgY){
    
    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);
    
    ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}

function draw(){
    drawPaddle();
    
    drawBall();
    
    drawBricks();
    

    showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);
    
    showGameStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width-55, 5); 

    showGameStats(LEVEL, cvs.width/2, 25, LEVEL_IMG, cvs.width/2 - 30, 5);
}


function gameOver(){
    if(LIFE <= 0){
        showYouLose();
        GAME_OVER = true;
    }
}

function levelUp(){
    var isLevelDone = true;
    
    for(var r = 0; r < brick.row; r++){
        for(var c = 0; c < brick.column; c++){
            isLevelDone = isLevelDone && ! bricks[r][c].status;
        }
    }
    
    if(isLevelDone){
        WIN.play();
        
        if(LEVEL >= MAX_LEVEL){
            showYouWin();
            GAME_OVER = true;
            return;
        }
        brick.row++;
        createBricks();
        ball.speed += 0.5;

        resetBall();
        LEVEL++;
    }
}


function update(){
    movePaddle();
    
    moveBall();
    
    ballWallCollision();
    
    ballPaddleCollision();
    
    ballBrickCollision();
    
    gameOver();
    
    levelUp();
}


function loop(){
    
    ctx.drawImage(BG_IMG, 0, 0);
    
    draw();
    
    update();
    
    if(! GAME_OVER){
        requestAnimationFrame(loop);
    }
}
loop();



var soundElement  = document.getElementById("sound");

soundElement.addEventListener("click", audioManager);

function audioManager(){

    var imgSrc = soundElement.getAttribute("src");
    var SOUND_IMG = imgSrc == "img/SOUND_ON.png" ? "img/SOUND_OFF.png" : "img/SOUND_ON.png";
    
    soundElement.setAttribute("src", SOUND_IMG);
    
    WALL_HIT.muted = WALL_HIT.muted ? false : true;
    PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true;
    BRICK_HIT.muted = BRICK_HIT.muted ? false : true;
    WIN.muted = WIN.muted ? false : true;
    LIFE_LOST.muted = LIFE_LOST.muted ? false : true;
}
var gameover = document.getElementById("gameover");
var youwin = document.getElementById("youwin");
var youlose = document.getElementById("youlose");
var restart = document.getElementById("restart");


restart.addEventListener("click", function(){

    location.reload();

});
function showYouWin(){
    gameover.style.display = "block";
    youwon.style.display = "block";
}


function showYouLose(){
    gameover.style.display = "block";
    youlose.style.display = "block";
}




















