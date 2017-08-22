//This variables allow to create the game
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// variables to player's attributes
var paddingY = 10;
var paddingX = canvas.width/10;
var playerX = (canvas.width/2) - (paddingX/2);
var playerY = canvas.height-paddingY;
var dX = 10;

var rightPressed = false;
var leftPressed = false;

var score = 0;
// my personnal pixel unity for the game
var pixel = canvas.width/200;
var nEnemyC = 10;
var nEnemyR = 5;
var paddingEnemyX = 5*pixel;
var paddingEnemyY = 5*pixel;
var offsetEnemyX = pixel*12 + paddingEnemyX;
var offsetEnemyY = pixel*7 + paddingEnemyY;
var dEX = 0;
var dEY = 0;
var direction = 1;

var enemys = [];
for (n=0; n<nEnemyC; n++) {
  enemys[n] = [];
  for (r=0; r<nEnemyR; r++) {
      enemys[n][r] = {x: 0, y: 0, status: 1};
  }
}

// variables for shooting
var shootState = false;
var shootX = 0;
var shootY = canvas.height - paddingY*4;
var dY = 10;

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
  // 32 => "space barre"
  if(e.keyCode == 32) {
    shootState = true;
    shootX = playerX + (paddingX - pixel)/2;
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
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: "+ score, 30, 30);
}

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

function drawBodyEnemy(x, y) {
  ctx.beginPath();
  ctx.rect(x - pixel*3, y -pixel*2, pixel*7, pixel*5);
  ctx.rect(x - pixel*3, y + pixel*3, pixel, pixel);
  ctx.rect(x + pixel*3, y + pixel*3, pixel, pixel);
  ctx.rect(x - pixel*2, y + pixel*4, pixel*2, pixel);
  ctx.rect(x + pixel, y + pixel*4, pixel*2, pixel);
  ctx.rect(x - pixel*5, y + pixel, pixel, pixel*3);
  ctx.rect(x + pixel*5, y + pixel, pixel, pixel*3);
  ctx.rect(x - pixel*5, y, pixel*11, pixel);
  ctx.rect(x - pixel*4, y - pixel, pixel*9, pixel);
  ctx.rect(x - pixel*2, y - pixel*3, pixel*5, pixel);
  ctx.rect(x - pixel*3, y - pixel*4, pixel*7, pixel);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
};

function drawEyesEnemy(x, y) {
  ctx.beginPath();
  ctx.rect(x - pixel*2, y, pixel, pixel);
  ctx.rect(x + pixel*2, y, pixel, pixel);
  ctx.rect(x - pixel, y - pixel*3, pixel*3, pixel);
  ctx.rect(x - pixel*2, y - pixel*4, pixel*5, pixel);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
};

function drawEnemy(x, y) {
  drawBodyEnemy(x, y);
  drawEyesEnemy(x, y);
};


function drawEnemys() {
  for (n=0; n<nEnemyC; n++) {
    for (r=0; r<nEnemyR; r++) {
        if(enemys[n][r].status == 1) {
          var enemyX = (n*offsetEnemyX) + canvas.width/10 + dEX;
          var enemyY = (r*offsetEnemyY) + canvas.height/10 + dEY;
          enemys[n][r].x = enemyX;
          enemys[n][r].y = enemyY;
          drawEnemy(enemyX, enemyY);
        }
      }
    }
};

function enemysMove() {
  var last = enemys.length - 1;
  var last2 = enemys[last].length - 1;
  if (enemys[last][last2].x >= canvas.width - paddingEnemyX) {
    direction = 0;
    dEY += pixel*12;
  } else if (enemys[0][0].x <= 0 + paddingEnemyX) {
    direction = 1;
    dEY += pixel*12;
  };
  if (direction == 1) {
    dEX += 1;
  } else if (direction == 0) {
    dEX -= 1;
  };
};

function enemysDestroy() {
  for (n=0; n<nEnemyC; n++) {
    for (r=0; r<nEnemyR; r++) {
        var enemy = enemys[n][r];
        var conditionX = shootX > enemy.x - (pixel*5) && shootX < enemy.x + (pixel*5);
        var conditionY = shootY < enemy.y && shootY < enemy.y - (pixel*10);
        if(enemy.status == 1){
          if(conditionX && conditionY) {
            shootState = false;
            enemy.status = 0;
            shootY = canvas.height - paddingY*4;
            score++;
            if(score == nEnemyC*nEnemyR) {
              alert('You completed the game ! Congradulations !');
              document.location.reload();
            }
          } else if (shootY <= 0) {
            shootState = false;
            shootY = canvas.height - paddingY*4;
          };
        }
      }
    }
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
  drawEnemys();
  enemysMove();
  drawScore();
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
  enemysDestroy();
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

