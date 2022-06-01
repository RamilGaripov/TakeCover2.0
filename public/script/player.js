const FRAMES_SPENT_IN_COVER = 15;

const player = {
    x: 20,
    y: 100,
    width: 175,
    height: 310,
    frameX: 0,
    frameY: 0,
    hitbox: true,
  };
  
  const playerSprite = new Image();
  playerSprite.src = "./img/bubbles.png";
  
  function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
  }

  function takeCover() {
    
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
    else if (frameTakeCoverComplete == frame-1){
      console.log("took cover");
    }
  }
  
  function exitCover() {
    if (frame - frameTakeCoverComplete == FRAMES_SPENT_IN_COVER) {
      console.log("exited cover");
    }
    if (frame % 2 == 0 && player.frameX >= 4 && player.frameX < 8) {
      player.frameX++;
    } else if (player.frameX == 8) {
      player.frameX = 0;
      player.hitbox = true;
      spacePressed = false;
    }
  }

  