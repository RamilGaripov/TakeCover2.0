
// {
//     x: this.x,
//     y: this.y,
//     width: this.width,
//     height: this.height,
//     frameX: this.frameX,
//     frameY: this.frameY,
//     spriteSrc: this.sprite.src
// }
class Enemy extends GameObject {
    constructor() {
        super()
        this.x = 50;
        this.y = 150;
        this.width = 350;
        this.height = 304;
        this.frameX = 0;
        this.frameY = 0;
        this.sprite.src = "./img/flint_sprite.png";
    }

    // drawSprite(ui) {
        
    //     const sprite = this.sprite;
    //     const width = this.width;
    //     const height = this.height;
    //     const widthFrameX =  width * this.frameX;
    //     const heightFrameY = height * this.frameY;
    //     const x = ui.canvas.width - this.x;
    //     const y = this.y;

    //     this.sprite.onload = function() {
    //         ui.ctx.drawImage(sprite, widthFrameX, heightFrameY,  width, height,  x, y, width, height);
    //     }
    // }

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

