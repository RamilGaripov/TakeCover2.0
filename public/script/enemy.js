
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

        drawEnemySprite();
    }



    drawEnemySprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    };

    shoot() {
        if (frame % 2 == 0 && player.frameX <= 4) {
            if (!sfx.cover.playing()) {
              sfx.cover.play();
            }
            player.frameX++;
            player.hitbox = false;
            
          } 
          if (player.frameX == 4) {
            frameTakeCoverComplete = frame;
          }
    }
}

