// this code define the enemys' apparence

function drawBodyEnemy(x, y) {
    ctx.beginPath();
    ctx.rect(x - pixel * 3, y - pixel * 2, pixel * 7, pixel * 5);
    ctx.rect(x - pixel * 3, y + pixel * 3, pixel, pixel);
    ctx.rect(x + pixel * 3, y + pixel * 3, pixel, pixel);
    ctx.rect(x - pixel * 2, y + pixel * 4, pixel * 2, pixel);
    ctx.rect(x + pixel, y + pixel * 4, pixel * 2, pixel);
    ctx.rect(x - pixel * 5, y + pixel, pixel, pixel * 3);
    ctx.rect(x + pixel * 5, y + pixel, pixel, pixel * 3);
    ctx.rect(x - pixel * 5, y, pixel * 11, pixel);
    ctx.rect(x - pixel * 4, y - pixel, pixel * 9, pixel);
    ctx.rect(x - pixel * 2, y - pixel * 3, pixel * 5, pixel);
    ctx.rect(x - pixel * 3, y - pixel * 4, pixel * 7, pixel);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
};

function drawEyesEnemy(x, y) {
    ctx.beginPath();
    ctx.rect(x - pixel * 2, y, pixel, pixel);
    ctx.rect(x + pixel * 2, y, pixel, pixel);
    ctx.rect(x - pixel, y - pixel * 3, pixel * 3, pixel);
    ctx.rect(x - pixel * 2, y - pixel * 4, pixel * 5, pixel);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
};

function drawEnemy(x, y) {
    drawBodyEnemy(x, y);
    drawEyesEnemy(x, y);
};

// this code creates enemys
function drawEnemys(n, r) {
    for (n = 0; n < nEnemyC; n++) {
        for (r = 0; r < nEnemyR; r++) {
            if (enemys[n][r].status == 1) {
                var enemyX = (n * offsetEnemyX) + canvas.width / nEnemyC + dEX;
                var enemyY = (r * offsetEnemyY) + canvas.height / 10 + dEY;
                enemys[n][r].x = enemyX;
                enemys[n][r].y = enemyY;
                drawEnemy(enemyX, enemyY);
            }
        }
    }
};

// this code correspond to the behavior of enemys
function enemysMove() {
    for (n = 0; n < nEnemyC; n++) {
        for (r = 0; r < nEnemyR; r++) {
            if (enemys[n][r].status == 1) {
                if (enemys[n][r].x >= canvas.width - paddingEnemyX) {
                    direction = 0;
                    dEY += pixel * 5;
                } else if (enemys[n][r].x <= 0 + paddingEnemyX) {
                    direction = 1;
                    dEY += pixel * 5;
                };
            }
        }
    }
    if (direction == 1) {
        dEX += 1;
    } else if (direction == 0) {
        dEX -= 1;
    };
};
