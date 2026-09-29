const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const scoreText = document.getElementById("score");
const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let playerX = 175;
let enemyY = -60;
let enemyX = Math.random() * 330;
let score = 0;
let gameRunning = true;

document.addEventListener("keydown", function(event) {

    if (!gameRunning) return;

    if (event.key === "ArrowLeft" && playerX > 10) {
        playerX -= 25;
    }

    if (event.key === "ArrowRight" && playerX < 340) {
        playerX += 25;
    }

    player.style.left = playerX + "px";
});

function gameLoop() {

    if (!gameRunning) return;

    enemyY += 5;

    enemy.style.top = enemyY + "px";
    enemy.style.left = enemyX + "px";

    if (enemyY > 600) {

        enemyY = -60;
        enemyX = Math.random() * 330;

        score++;

        scoreText.textContent = score;
    }

    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
        playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top
    ) {
        endGame();
    }

    requestAnimationFrame(gameLoop);
}

function endGame() {

    gameRunning = false;

    finalScore.textContent = score;

    gameOver.style.display = "block";
}

function restartGame() {

    playerX = 175;
    enemyY = -60;
    enemyX = Math.random() * 330;
    score = 0;

    scoreText.textContent = score;

    gameOver.style.display = "none";

    gameRunning = true;

    gameLoop();
}

gameLoop();