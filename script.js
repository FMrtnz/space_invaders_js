//This variables allow to create the game
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// variables to player's attributes
var paddingY = 10;
var paddingX = canvas.width/10;
var playerX = (canvas.width/2) - (paddingX/2);
var playerY = canvas.height-paddingY;
var dX = 25;

var rightPressed = false;
var leftPressed = false;

// my personnal pixel unity for the game
var pixel = canvas.width/100;

// variables for shooting
var shootState = false;
var shootX = 0;
var shootY = canvas.height - paddingY*4;
var dY = 20;

// var score = 0

// This part of the code allow to create the player command to move in the game
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keyup", keyUpShoot);

// document.addEventListener("click", mouseDownShoot);
// document.addEventListener("mousemove", mouseMoveHandler);

function keyDownHandler(e) {
  // 39 => "right arrow"
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  // 37 => "left arrow"
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
};

function keyUpHandler(e){
  // 39 => "right arrow"
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  // 37 => "left arrow"
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
};

function keyUpShoot(e) {
  if(e.keyCode == 32) {
    shootState = true;
    shootX = playerX + paddingX/2 - pixel/2;
  };
}

// function mouseDownShoot(e) {
//   if(e.keyCode == 1) {
//     shootState = true;
//   }
// }

// function mouseMoveHandler(e) {
//   var relativeX = e.clientX;
//     if(relativeX > 0 && relativeX < canvas.width) {
//       playerX = relativeX - (paddingX/2);
//     };
// };


// This part of the code allow to create the player's character
function drawPlayer() {
  ctx.beginPath();
  ctx.rect(playerX + paddingX*2/5, (playerY - paddingY*3), paddingX*2/10, paddingY);
  ctx.rect(playerX + paddingX/5, (playerY - paddingY*2), paddingX*3/5, paddingY);
  ctx.rect(playerX + (paddingX/10), (playerY - paddingY), (paddingX*4/5), paddingY);
  ctx.rect(playerX, playerY, paddingX, paddingY);
  ctx.fillStyle ="white";
  ctx.fill();
  ctx.closePath();
};


// Code to shoot function
function drawShoot() {
  ctx.beginPath();
  ctx.rect(shootX, shootY, pixel, pixel);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
};

//This part of the code correspond to the game process

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();

  //This code define the move on left/right and the speed
  if(rightPressed && playerX < canvas.width - paddingX/2) {
    playerX += dX;
  }
  else if(leftPressed && playerX > 0 - paddingX/2) {
    playerX -= dX;
  };

  //This code allow the player to shoot
  if (shootState == true) {
      drawShoot();
      shootY -= dY;
    };

  if (shootY < 0) {
    shootState = false;
    shootY = canvas.height - paddingY*4;
  };

};

setInterval(draw, 10);

// if (shootY < 0) {
//   shootState = false;
//   shootY = canvas.height - paddingY*4;
// };

// function player1Win() {
//   if(xBall == canvas.width) {
//     score1 ++;

// function ball() {
//   ctx.beginPath();
//   ctx.arc(xBall, yBall, paddingBall, 0, Math.PI*2, false);
//   ctx.fillStyle = "white";
//   ctx.fill();
//   ctx.closePath();
// }

// function ballMoving() {
//   xBall += dxBall;
//   yBall += dyBall;
//   if(yBall < paddingBall || yBall > canvas.height - paddingBall) {
//     dyBall = -dyBall;
//   }
// }

// function collisionDetection() {
//   // collisionDetection playe - paddingX/2r 2
//   if(   > y2 && yBall < y2 + paddingY && xBall == collision2  {
//     dxBall = -dxBall;
//   }
//   //    player - paddingX/2
//   if(yBall > y11 && yB
//     xBall = collision;
// }

// function drawScore1() {
//   ctx.font = "50px Ar
// if (shootState == true) {
//   drawShoot(playerX);
//   shootY -= dY;
// };

// if (shootY < 0) {
//   shootState = false;
//   shootY = canvas.height - paddingY*4;
// };

// function player1Win() {
//   if(xBall == canvas.width) {
//     score1 ++;ial";
//   ctx.fillStyle = "gray";
//   ctx.fillText(score1, canvas.width/4, 50);
// }

// function drawScore2() {
//   ctx.font = "50px Arial";
//   ctx.fillStyle = "gray";
//   ctx.fillText(score2, (canvas.width*3)/4, 50);
// }

// Draw enemy fonctions

// function drawBodyEnemy() {
//   ctx.beginPath();
//   ctx.rect(canvas.width/2-pixel*3, canvas.height/2-pixel*2, pixel*7, pixel*5);
//   ctx.rect(canvas.width/2 - pixel*3, canvas.height/2 + pixel*3, pixel, pixel);
//   ctx.rect(canvas.width/2 + pixel*3, canvas.height/2 + pixel*3, pixel, pixel);
//   ctx.rect(canvas.width/2 - pixel*2, canvas.height/2 + pixel*4, pixel*2, pixel);
//   ctx.rect(canvas.width/2 + pixel, canvas.height/2 + pixel*4, pixel*2, pixel);
//   ctx.rect(canvas.width/2 - pixel*5, canvas.height/2 + pixel, pixel, pixel*3);
//   ctx.rect(canvas.width/2 + pixel*5, canvas.height/2 + pixel, pixel, pixel*3);
//   ctx.rect(canvas.width/2 - pixel*5, canvas.height/2, pixel*11, pixel);
//   ctx.rect(canvas.width/2 - pixel*4, canvas.height/2 - pixel, pixel*9, pixel);
//   ctx.rect(canvas.width/2 - pixel*2, canvas.height/2 - pixel*3, pixel*5, pixel);
//   ctx.rect(canvas.width/2 - pixel*3, canvas.height/2 - pixel*4, pixel*7, pixel);
//   ctx.fillStyle = "white";
//   ctx.fill();
//   ctx.closePath();
// };

// function drawEyesEnemy() {
//   ctx.beginPath();
//   ctx.rect(canvas.width/2 - pixel*2, canvas.height/2, pixel, pixel);
//   ctx.rect(canvas.width/2 + pixel*2, canvas.height/2, pixel, pixel);
//   ctx.rect(canvas.width/2 - pixel, canvas.height/2 - pixel*3, pixel*3, pixel);
//   ctx.rect(canvas.width/2 - pixel*2, canvas.height/2 - pixel*4, pixel*5, pixel);
//   ctx.fillStyle = "black";
//   ctx.fill();
//   ctx.closePath();
// };

// function drawEnemy() {
//   drawBodyEnemy();
//   drawEyesEnemy();
// };
