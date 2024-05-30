import BulletController from "./BulletController.js";
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";

const canvas = document.getElementById("canvas");

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyController = new EnemyController(canvas);
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
        }

        lastFrameTime = time;
        window.requestAnimationFrame(onFrame);
    }

    window.requestAnimationFrame(onFrame);
}

game();
