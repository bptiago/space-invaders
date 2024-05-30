export default class Player {
    isRightKeyPressed = false;
    isLeftKeyPressed = false;
    isShootingKeyPressed = false;

    constructor(canvas, velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;

        this.x = canvas.width / 2.2;
        this.y = canvas.height - 75;
        this.width = 60;
        this.height = 30;

        this.image = new Image();
        this.image.src = "../assets/graphics/player.png";

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw(ctx) {
        if (this.isShootingKeyPressed) {
            this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
        }

        this.borderCollision();
        this.move();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move() {
        if (this.isRightKeyPressed) {
            this.x += this.velocity;
        } else if (this.isLeftKeyPressed) {
            this.x -= this.velocity;
        }
    }

    borderCollision() {
        if (this.x < 0) this.x = 0;
        if (this.x > this.canvas.width - this.width)
            this.x = this.canvas.width - this.width;
    }

    keydown = (event) => {
        if (event.code == "ArrowRight") {
            this.isRightKeyPressed = true;
        }
        if (event.code == "ArrowLeft") {
            this.isLeftKeyPressed = true;
        }
        if (event.code == "Space") {
            this.isShootingKeyPressed = true;
        }
    };

    keyup = (event) => {
        if (event.code == "ArrowRight") {
            this.isRightKeyPressed = false;
        }
        if (event.code == "ArrowLeft") {
            this.isLeftKeyPressed = false;
        }
        if (event.code == "Space") {
            this.isShootingKeyPressed = false;
        }
    };
}
