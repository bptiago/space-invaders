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

function game() {
    if (!canvas.getContext) {
        alert("Canvas não disponível");
        return;
    }

    const ctx = canvas.getContext("2d");
    let lastFrameTime = 0;

    function onFrame(time) {
        if (lastFrameTime !== 0) {
            // const elapsed = (time - lastFrameTime) / 1000;
            if (enemyController.collideWith(player)) {
                console.log("Perdeu");
                return;
            }
            enemyController.draw(ctx);
            player.draw(ctx);
            playerBulletController.draw(ctx);
            enemyBulletController.draw(ctx);
        }

        lastFrameTime = time;
        window.requestAnimationFrame(onFrame);
    }

    window.requestAnimationFrame(onFrame);
}

game();
