import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = [];
    bulletInterval = 0;

    constructor(canvas, maxBullets, color, isSoundOn) {
        this.canvas = canvas;
        this.maxBullets = maxBullets;
        this.color = color;
        this.isSoundOn = isSoundOn;

        // O som tem que vir aqui
        this.shootBulletSound = new Audio("../assets/sounds/atirar.wav");
        this.shootBulletSound.volume = 0.5;
    }

    collideWith(sprite) {
        const bulletCollidedIndex = this.bullets.findIndex((bullet) =>
            bullet.collideWith(sprite)
        );

        if (bulletCollidedIndex >= 0) {
            this.bullets.splice(bulletCollidedIndex, 1);
            return this;
        }

        return false;
    }

    shoot(x, y, velocity, bulletInterval = 0) {
        if (this.bulletInterval <= 0 && this.bullets.length < this.maxBullets) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.color);
            this.shootBulletSound.currentTime = 0;
            this.shootBulletSound.play();
            this.bullets.push(bullet);
            this.bulletInterval = bulletInterval;
        }
    }

    draw(ctx) {
        this.bullets = this.bullets.filter(
            (bullet) =>
                bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
        );

        this.bullets.forEach((bullet) => bullet.draw(ctx));

        if (this.bulletInterval > 0) {
            this.bulletInterval--;
        }
    }
}
