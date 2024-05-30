export default class Bullet {
    constructor(canvas, x, y, velocity, color) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.color = color;

        this.width = 5;
        this.height = 20;
    }

    draw(ctx) {
        this.y -= this.velocity;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
