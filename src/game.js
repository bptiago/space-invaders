import BulletController from "./BulletController.js";
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";

const canvas = document.getElementById("canvas");

const playerBulletController = new BulletController(canvas, 5, "blue", true);
const enemyBulletController = new BulletController(canvas, 4, "red", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 2, playerBulletController);
let isGameOver = false;
let didWin = false;
let enemiesDefeated = 0; // Variável para rastrear inimigos abatidos
const background = new Image();
background.src = "../assets/graphics/SpaceInvaders_Background.png";

function game() {
  if (!canvas.getContext) {
    alert("Canvas não disponível");
    return;
  }

  const ctx = canvas.getContext("2d");
  let lastFrameTime = 0;

  function onFrame(time) {
    if (lastFrameTime !== 0) {
      checkGameOver();
      displayGameOver(ctx);
      if (!isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpar a tela a cada frame
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // Desenhar o fundo
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
        displayScore(ctx); // Exibir o contador de pontos
      }
    }

    lastFrameTime = time;
    window.requestAnimationFrame(onFrame);
  }

  window.requestAnimationFrame(onFrame);
}

function displayGameOver(ctx) {
  if (isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "White";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);

    // Exibir mensagem com a contagem de inimigos abatidos em escala reduzida
    ctx.font = "30px Arial";
    ctx.fillText(`Inimigos abatidos: ${enemiesDefeated}`, canvas.width / 3.5, canvas.height / 1.5 + 50);
  }
}

function displayScore(ctx) {
  ctx.fillStyle = "White";
  ctx.font = "20px Arial";
  ctx.fillText(`Inimigos abatidos: ${enemiesDefeated}`, 10, 30);
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }
  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  // Verificar se algum inimigo foi abatido
  const initialEnemyCount = enemyController.enemyMap.flat().length;
  enemyController.update();
  const remainingEnemyCount = enemyController.enemyMap.flat().length;

  if (initialEnemyCount > remainingEnemyCount) {
    enemiesDefeated += initialEnemyCount - remainingEnemyCount;
  }

  if (remainingEnemyCount === 0) {
    didWin = true;
    isGameOver = true;
  }
}

game();
