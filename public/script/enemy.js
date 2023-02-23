
class Enemy {
    constructor() {
        this.enemySprite = new Image();
        this.enemySprite.src = "./img/flint_sprite.png";
        this.x = 820;
        this.y = 100;
        this.width = 350;
        this.height = 304;
        this.frameX = 0;
        this.frameY = 0;
    }

    drawEnemySprite(ctx) {
        ctx.drawImage(this.enemySprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    };

    // shoot() {
    //     if (frame % 2 == 0 && player.frameX <= 4) {
    //         if (!sfx.cover.playing()) {
    //           sfx.cover.play();
    //         }
    //         player.frameX++;
    //         player.hitbox = false;
            
    //       } 
    //       if (player.frameX == 4) {
    //         frameTakeCoverComplete = frame;
    //       }
    // }
}

