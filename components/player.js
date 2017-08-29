// Code to create a player
function drawPlayer(x, y, paddingX, paddingY) {
    ctx.beginPath();
    ctx.rect(x + paddingX * 2 / 5, (y - paddingY), paddingX / 5, paddingY);
    ctx.rect(x, y, paddingX, paddingY);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
};

// Code to shoot function
function drawShoot(x, y, padding) {
    ctx.beginPath();
    ctx.rect(shootX, shootY, paddingShoot, paddingShoot);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
};

// This part of the code allow to create the player's character
function drawScore(score) {
    ctx.font = "16px Fantasy";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 30, 30);
}
