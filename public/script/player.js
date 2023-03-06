// NUM_FRAMES_IN_COVER = 15;  
// X_POS = 20;
// Y_POS = 100;
// WIDTH = 175;
// HEIGHT = 310;
// X_FRAME = 0;
// Y_FRAME = 0;



class Player {

  constructor() {
    this.x = 20;
    this.y = 150;
    this.width = 175;
    this.height = 310;
    this.frameX = 0;
    this.frameY = 0;
    this.frames_in_cover = 15;
    this.hitbox = true;
    this.sprite = new Image();
    this.sprite.src = "./img/bubbles.png";    
  };

  drawSprite(ctx) {
    console.log("DRAWING SPRITE")
    const player = this.sprite;
    const width = this.width;
    const height = this.height;
    const widthFrameX =  width * this.frameX;
    console.log("X: ", this.frameX)
    const heightFrameY = height * this.frameY;
    const x = this.x;
    const y = this.y;

    this.sprite.onload = function() {
      ctx.drawImage(player, widthFrameX, heightFrameY,  width, height,  x, y, width, height);
    }

    ctx.drawImage(player, widthFrameX, heightFrameY,  width, height,  x, y, width, height);

    // ctx.drawImage(this, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    // ctx.drawImage(this, 50, canvas.height - this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    // ctx.drawImage(this.playerSprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  takeCover(frame) {
    console.log("Taking cover", frame)
    this.drawSprite();
    if (frame % 2 == 0 && this.frameX <= 4) {
      this.frameX++;
      this.hitbox = false; 
      
    } 

    if (this.frameX == 4) {
      this.frameTakeCoverComplete = frame;
    }
  }
  
  exitCover(frame) {
    // if (frame - frameTakeCoverComplete == NUM_FRAMES_IN_COVER) {
    //   console.log("exited cover");
    // }
    if (frame % 2 == 0 && this.frameX >= 4 && this.frameX < 8) {
      this.frameX++;
    } else if (this.frameX == 8) {
      this.frameX = 0;
      this.hitbox = true;
      spacePressed = false;
    }
  }

}


// const player = new Player();
// player.drawSprite();
  