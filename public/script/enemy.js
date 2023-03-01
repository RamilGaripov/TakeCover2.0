
class Enemy {
    constructor() {
        
        this.x = 50;
        this.y = 150;
        this.width = 350;
        this.height = 304;
        this.frameX = 0;
        this.frameY = 0;
        this.sprite = new Image();
        this.sprite.src = "./img/flint_sprite.png";
    }

    drawSprite(ctx) {
        
        const enemy = this.sprite;
        const width = this.width;
        const height = this.height;
        const widthFrameX =  width * this.frameX;
        const heightFrameY = height * this.frameY;
        const x = canvas.width - this.x;
        const y = this.y;

        this.sprite.onload = function() {
            ctx.drawImage(enemy, widthFrameX, heightFrameY,  width, height,  x, y, width, height);
        }
    }

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

