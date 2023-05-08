// class GameObject {
//     constructor(kwargs) {
//         this.x = kwargs['x'];
//         this.y = kwargs['y'];
//         this.width = kwargs['width'];
//         this.height = kwargs['height'];
//         this.frameX = kwargs['frameX'];
//         this.frameY = kwargs['frameY'];
//         this.sprite = new Image();
//         this.sprite.src = kwargs['spriteSrc'];
//     }
// }

class GameObject {
    constructor() {
        this.x;
        this.y;
        this.width;
        this.height;
        this.frameX;
        this.frameY;
        this.sprite = new Image();
        this.sprite.src;
    }

    drawSprite(ui, isPlayer) {
        let sprite = this.sprite;
        let width = this.width;
        let height = this.height;
        let widthFrameX =  width * this.frameX;
        let heightFrameY = height * this.frameY;
        let x;
        if (isPlayer) {
            x = this.x; 
        } else {
            x = ui.canvas.width - this.x;
        }
        let y = this.y;

        this.sprite.onload = function() {
            ui.ctx.drawImage(sprite, widthFrameX, heightFrameY,  width, height,  x, y, width, height);
        }
    }
}