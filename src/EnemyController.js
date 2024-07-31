import Enemy from "./Enemy.js";
import { ENEMY_MOVEMENT } from "./engine/enemyMovement.js";

export default class EnemyController {
    positionMap = [
        [0, 1, 1, 2, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 2, 1, 3, 1, 2, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 2, 1, 1, 0],
    ];

    enemyMap = [];

    currentDirection = ENEMY_MOVEMENT.right;

    xVelocity = 0;
    yVelocity = 0;
    downMovementTimer = ENEMY_MOVEMENT.defaultDownMovementTimer;
    fireBulletTimer = ENEMY_MOVEMENT.defaultFireBulletTimer;

    constructor(canvas, enemyBulletController, playerBulletController) {
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;

        this.enemyKilledSound = new Audio("../assets/sounds/morte-inimigo.wav");
        this.enemyKilledSound.volume = 0.5;

        this.background = new Image();
        this.background.src = "../assets/graphics/SpaceInvaders_Background.png";
        this.createEnemies();
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpar o canvas antigo a cada novo frame
        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
        this.drawEnemies(ctx);
    }

    update() {
        this.decrementDownMovementTimer();
        this.updateMovementDirection();
        this.bulletCollision();
        this.resetDownMovementTimer();
        this.fireBullet();
    }

    bulletCollision() {
        this.enemyMap.forEach((row) => {
            row.forEach((enemy, enemyIndex) => {
                if (this.playerBulletController.collideWith(enemy)) {
                    // Inimigo morre e deve ser tirado do jogo
                    this.enemyKilledSound.currentTime = 0;
                    this.enemyKilledSound.play();
                    row.splice(enemyIndex, 1);
                }
            });
        });

        this.enemyMap = this.enemyMap.filter((row) => row.length > 0);
    }

    fireBullet() {
        this.fireBulletTimer--;
        if (this.fireBulletTimer <= 0) {
            this.fireBulletTimer = ENEMY_MOVEMENT.defaultFireBulletTimer;
            const allEnemies = this.enemyMap.flat();
            const randomIndex = Math.floor(Math.random() * allEnemies.length);
            const randomEnemy = allEnemies[randomIndex];
            this.enemyBulletController.shoot(randomEnemy.x, randomEnemy.y, -4);
            console.log(randomIndex);
        }
    }

    decrementDownMovementTimer() {
        if (
            this.currentDirection === ENEMY_MOVEMENT.downLeft ||
            this.currentDirection === ENEMY_MOVEMENT.downRight
        ) {
            this.downMovementTimer--;
        }
    }

    resetDownMovementTimer() {
        if (this.downMovementTimer <= 0) {
            this.downMovementTimer = ENEMY_MOVEMENT.defaultDownMovementTimer;
        }
    }

    drawEnemies(ctx) {
        this.enemyMap.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity);
            enemy.draw(ctx);
        });
    }

    updateMovementDirection() {
        for (const enemyRow of this.enemyMap) {
            if (this.currentDirection === ENEMY_MOVEMENT.right) {
                this.xVelocity = ENEMY_MOVEMENT.defaultXVelocity;
                this.yVelocity = 0;

                const farRightEnemy = enemyRow[enemyRow.length - 1];
                if (
                    farRightEnemy.x + farRightEnemy.width >=
                    this.canvas.width
                ) {
                    this.currentDirection = ENEMY_MOVEMENT.downLeft;
                    break;
                }
            } else if (this.currentDirection === ENEMY_MOVEMENT.downLeft) {
                if (this.moveDown(ENEMY_MOVEMENT.left)) {
                    break;
                }
            } else if (this.currentDirection === ENEMY_MOVEMENT.left) {
                this.xVelocity = -ENEMY_MOVEMENT.defaultXVelocity;
                this.yVelocity = 0;

                const farLeftEnemy = enemyRow[0];
                if (farLeftEnemy.x <= 0) {
                    this.currentDirection = ENEMY_MOVEMENT.downRight;
                    break;
                }
            } else if (this.currentDirection === ENEMY_MOVEMENT.downRight) {
                if (this.moveDown(ENEMY_MOVEMENT.right)) {
                    break;
                }
            }
        }
    }

    moveDown(newMovementDirection) {
        this.xVelocity = 0;
        this.yVelocity = ENEMY_MOVEMENT.defaultYVelocity;

        if (this.downMovementTimer <= 0) {
            this.currentDirection = newMovementDirection;
            return true;
        }

        return false;
    }

    createEnemies() {
        // Itera sobre cada linha
        this.positionMap.forEach((row, rowIndex) => {
            this.enemyMap[rowIndex] = [];

            // Itera sobre cada inimigo dentro da linha
            row.forEach((enemyType, enemyIndex) => {
                if (enemyType > 0) {
                    const enemy = new Enemy(
                        enemyIndex * 50, //espaçamento X
                        rowIndex * 35, //espaçamento Y
                        enemyType
                    );

                    this.enemyMap[rowIndex].push(enemy);
                }
            });
        });
    }

    collideWith(target) {
        return this.enemyMap.flat().some((enemy) => enemy.collideWith(target));
    }
}
