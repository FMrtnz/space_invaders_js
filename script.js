//This variables allow to create the game
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// my personnal pixel unity for the game
var pixel = canvas.width / 200;

// variables to player's attributes
var paddingY = pixel * 5;
var paddingX = pixel * 25;
var playerX = (canvas.width / 2) - (paddingX / 2);
var playerY = canvas.height - paddingY;
var dX = 7;

var rightPressed = false;
var leftPressed = false;

var score = 0;

// variables to enemy's attributes
var nEnemyC = 10;
var nEnemyR = 4;
var paddingEnemyX = 5 * pixel;
var paddingEnemyY = 5 * pixel;
var offsetEnemyX = pixel * 12 + paddingEnemyX;
var offsetEnemyY = pixel * 5 + paddingEnemyY;
var dEX = 0;
var dEY = 0;
var direction = 1;

var enemys = [];
for (n = 0; n < nEnemyC; n++) {
    enemys[n] = [];
    for (r = 0; r < nEnemyR; r++) {
        enemys[n][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

// variables for shooting
var shootState = false;
var paddingShoot = pixel*2;
var shootX = 0;
var shootY = canvas.height - paddingY * 4;
var dY = 15;

// This part of the code allow to create the player command to move in the game
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keyup", keyUpShoot);

// document.addEventListener("click", mouseDownShoot);
// document.addEventListener("mousemove", mouseMoveHandler);

function keyDownHandler(e) {
    // 39 => "right arrow"
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    // 37 => "left arrow"
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
};

function keyUpHandler(e) {
    // 39 => "right arrow"
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    // 37 => "left arrow"
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
};

function keyUpShoot(e) {
    // 32 => "space barre"
    if (e.keyCode == 32) {
        shootState = true;
        shootX = playerX + (paddingX - pixel) / 2;
    };
};

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

function gameOver(n, r) {
    if (score == nEnemyC * nEnemyR) {
        setTimeout(function() {
          alert('You completed the game ! You win !')
          document.location.reload();
        }, 50);
        // alert('You completed the game ! You win !');
    } else if (enemys[n][r].y >= canvas.height - offsetEnemyY) {
        alert('You lose ! Game Over !')
        document.location.reload();
    }
};

function enemyDestroyed(e) {
  var conditionX = shootX + paddingShoot/2 > e.x - (pixel * 7) && shootX + paddingShoot/2 < e.x + (pixel * 7);
  var conditionY = shootY < e.y && shootY < e.y - (pixel * 10);
  if (e.status == 1) {
      if (conditionX && conditionY) {
        shootState = false;
        e.status = 0;
        shootY = canvas.height - paddingY * 4;
        score++;
      } else if (shootY <= 0) {
        shootState = false;
        shootY = canvas.height - paddingY * 4;
      }
  }
};

function gameStatus() {
    for (n = 0; n < nEnemyC; n++) {
      for (r = 0; r < nEnemyR; r++) {
        var enemy = enemys[n][r];
        enemyDestroyed(enemy);
        gameOver(n, r);
      };
    }
};

function commande() {
  //This code define the move on left/right and the speed
  if (rightPressed && playerX < canvas.width - paddingX / 2) {
      playerX += dX;
  } else if (leftPressed && playerX > 0 - paddingX / 2) {
      playerX -= dX;
  };

  //This code allow the player to shoot
  if (shootState == true) {
      drawShoot(shootX, shootY, paddingShoot);
      shootY -= dY;
  };
};

//This part of the code correspond to the game process

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer(playerX, playerY, paddingX, paddingY)
    drawEnemys();
    enemysMove();
    commande()
    gameStatus();
    drawScore(score);
};

setInterval(draw, 10);
