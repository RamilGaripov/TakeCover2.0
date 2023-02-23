NUM_FRAMES_IN_COVER = 15;  
X_POS = 20;
Y_POS = 100;
WIDTH = 175;
HEIGHT = 310;
X_FRAME = 0;
Y_FRAME = 0;

class Player {

  constructor() {
    this.x = X_POS;
    this.y = Y_POS;
    this.width = WIDTH;
    this.height = HEIGHT;
    this.frameX = X_FRAME;
    this.frameY = Y_FRAME;
    this.frames_in_cover = NUM_FRAMES_IN_COVER;
    this.hitbox = true;
    this.playerSprite = new Image();
    this.playerSprite.src = "./img/bubbles.png";
  };
  
  drawSprite(ctx) {
    ctx.drawImage(this.playerSprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  takeCover(frame) {
    console.log("Taking cover", frame)
    
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

  