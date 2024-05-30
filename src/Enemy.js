export default class Enemy {
    constructor(x, y, enemyType) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = `../assets/graphics/enemy${enemyType}.png`;

        this.width = 40;
        this.height = 32;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(xVelocity, yVelocity) {
        this.x += xVelocity;
        this.y += yVelocity;
    }

    collideWith(target) {
        if (
            this.x + this.width > target.x &&
            this.x < target.x + target.width &&
            this.y + this.height > target.y &&
            this.y < target.y + target.height
        ) {
            return true;
        } else {
            return false;
        }
    }
}
