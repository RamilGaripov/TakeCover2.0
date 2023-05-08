// NUM_FRAMES_IN_COVER = 15;  
// X_POS = 20;
// Y_POS = 100;
// WIDTH = 175;
// HEIGHT = 310;
// X_FRAME = 0;
// Y_FRAME = 0;



class Player extends GameObject {

  constructor() {
    super()
    this.x = 20;
    this.y = 150;
    this.width = 175;
    this.height = 310;
    this.frameX = 0;
    this.frameY = 0;
    this.frames_in_cover = 15;
    this.hitbox = true;
    this.sprite.src = "./img/bubbles.png";    
  };

  takeCover(frame, ctx) {
    if (frame % 2 == 0 && this.frameX <= 4) {
      this.frameX++;
      this.hitbox = false; 
      
      this.drawSprite(ctx);
    } 

    if (this.frameX == 4) {
      this.frameTakeCoverComplete = frame;
      // this.exitCover(frame, ctx)
    }
  }
  
  exitCover(frame, ctx) {
    // if (frame - frameTakeCoverComplete == NUM_FRAMES_IN_COVER) {
    //   console.log("exited cover");
    // }
    this.drawSprite(ctx);
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
  