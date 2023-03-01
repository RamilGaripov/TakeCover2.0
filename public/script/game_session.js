class GameSession {
  
  constructor() {
    this.gameInProgress = true;
    this.paused = false;
    this.player = new Player();
    this.enemy = new Enemy();
  
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new GameSession();
    }
    return this.instance;
  }

  setupGameEnvironment(ctx) {
    this.player.drawSprite(ctx);
    this.enemy.drawSprite(ctx);
  }

  animate(framePeriod) {
    // console.log(framePeriod)
    // console.log(then)
      // now = Date.now();
      // elapsed = now - then;
      // // shootBullet();
      // if (elapsed > framePeriod) {
      //   frame++;
      //   // console.log("frame " + frame);
      //   then = now - (elapsed % framePeriod);
        
      //   handleInjury();
      //   if (handleInjury()) return;
      // }
      // if (spacePressed) {
      //     player.takeCover(frame);
      //     if ((frame - player.frameTakeCoverComplete) >= player.frames_in_cover) {
      //       player.exitCover(frame);
      //     }
      //   }
      // requestAnimationFrame(animate);
    }

  
}

// let frame = 0;
// let frameTakeCoverComplete = 0;
// let spacePressed = false;
// let score = 0;

// const background = new Image();
// background.src = "./img/background1.png";

// window.addEventListener("keydown", function (e) {
//   if (e.code === "KeyE") spacePressed = true;
// });

// const gameOverMsgArray = [
//   "Please, it's not that hard. Press 'E' to take cover!",
//   " points. You belong in the bronze bracket.",
//   " point(s). Stuck in silver forever.",
//   " points. Not too bad. One day you'll hit the diamond league.",
//   " points. A solid diamond player. You have potential.",
//   " points. Legendary! But are you good enough to be IMMORTAL?",
//   " points. IMMORTAL! Your skills are unmatched!",
// ];

// var gameOverMsg, msgIndex, metrics, textWidth;

// function handleInjury() {
 
//   for (let i = 0; i < bulletArray.length; i++) {
//     if (bulletArray[i].x > 50 && bulletArray[i].x < 150 && player.hitbox) {
//       ctx.font = "35px Georgia";

//       ctx.fillStyle = "#a0d2eb";

//       if (score == TRY_AGAIN) {
//         msgIndex = 0; 
//       } else if (score < BRONZE_SCORE) {
//         msgIndex = 1; 
//       } else if (score < SILVER_SCORE) {
//         msgIndex = 2; 
//       } else if (score < GOLD_SCORE) {
//         msgIndex = 3; 
//       } else if (score < DIAMOND_SCORE) {
//         msgIndex = 4; 
//       } else if (score < LEGENDARY_SCORE) {
//         msgIndex = 5; 
//       } else {
//         msgIndex = 6; 
//       }
//       getTextMessage(msgIndex); 
//       return true;
//     }
//   }
// }

// //returns the coordinates for the message to be printed out in the centre of the canvas
// function getCentreTextPosition(msg) {
//   metrics = ctx.measureText(msg);
//   textWidth = metrics.width;
//   return (canvas.width - textWidth)/2;
// }

// //prints the game over message on the canvas
// function getTextMessage(index) {
//   gameOverMsg = gameOverMsgArray[index];
//   if (score > 0) {
//     gameOverMsg = score + " " + gameOverMsg;
//   }
//   const textPosition = getCentreTextPosition(gameOverMsg);
//   ctx.fillText(
//     gameOverMsg,
//     textPosition,
//     GAME_OVER_MSG_Y
//   );
// }

// let startButton = document.createElement("button");
// startButton.setAttribute("class", "btn btn-info");
// startButton.setAttribute("id", "startGame");
// startButton.innerHTML = "Start Game";
// document.getElementById("startButtonHere").appendChild(startButton);

// function onLoad() {
//   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//   player = new Player()
//   player.drawSprite(ctx)
  
//   // drawEnemySprite(
//   //   enemySprite,
//   //   enemy.width * enemy.frameX,
//   //   enemy.height * enemy.frameY,
//   //   enemy.width,
//   //   enemy.height,
//   //   enemy.x,
//   //   enemy.y,
//   //   enemy.width,
//   //   enemy.height
//   // );

//   if (handleInjury()) {
//     updateScores();
//     return;
//   }

//   ctx.fillStyle = scoreGradient;
//   ctx.font = "90px Georgia";
//   ctx.fillText(score, getCentreTextPosition(score), 70);

//   requestAnimationFrame(onLoad);
// }

// async function updateScores() {
//   try {
//     if (score > 0) {
//       //take scores and send them to the server
//       console.log("We are dead and our score is:", score);
//       const userName = window.prompt("Enter your name:");
//       const newScore = {
//         name: userName,
//         score: score
//       };
//       await fetch("/insert-score", {
//         method: "POST",
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newScore)
//       });
//       console.log(newScore);
//       getLeaderboard();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// const scoreGradient = ctx.createLinearGradient(0, 0, 0, 70);
// scoreGradient.addColorStop("0.4", "rgb(235, 235, 56)");
// scoreGradient.addColorStop("0.6", "rgb(235, 209, 54)");
// scoreGradient.addColorStop("0.7", "rgb(235, 209, 54)");
// scoreGradient.addColorStop("0.9", "rgb(186, 134, 56)");

// let fps, fpsInterval, startTime, now, then, elapsed;

// function startAnimating(fps) {
//   console.log("starting the animation at " + fps + "fps.");
//   fpsInterval = 1000 / fps;
//   then = Date.now();
//   startTime = then;
//   animate();
// }

// // let reloadTime = Math.floor(Math.random()*120 + 60);
// // var previousShotTime = 0;

// // if (previousShotTime + reloadTime === frame){
// //   console.log(speed);
// //   bulletArray.unshift(new Bullet);
// //   sfx.shot.play();
// //   previousShotTime = frame;        
// //   reloadTime = Math.floor(Math.random()*120 + 60);
// // }

// function getReloadTime() {
//   return Math.floor(Math.random()*120 + 60);
// }
// var previousShotTime = 0;

// // function getNextShot() {
// //   if (previousShotTime + getReloadTime() === frame){
// //     console.log(speed);
// //     Enemy.shoot();
// //     // bulletArray.unshift(new Bullet);
// //     // sfx.shot.play();
// //     previousShotTime = frame;
// //   }

// //   for (let i = 0; i < bulletArray.length; i++) {
// //       bulletArray[i].fly(); 
// //   }

// //   if (bulletArray.length > MAX_BULLET_ARRAY_LENGTH){
// //       bulletArray.pop(bulletArray[0]);   
// //   }
// // }

// 

// async function getLeaderboard() {
//   const response = await fetch("/get-leaderboard", {
//     method: "GET"
//   });
//   const data = await response.json();
//   console.log(data);
//   populateLeaderboard(data.rows);
// }

// function populateLeaderboard(bestPlayers) {
//   const table = document.getElementsByClassName("name");
//   const score = document.getElementsByClassName("score");
//   for (var i = 0; i < bestPlayers.length; i++) {
//     table[i].textContent = bestPlayers[i].name;
//     score[i].textContent = bestPlayers[i].score;
//   }
// }

// function startGame() {
//   startAnimating(FRAMES_PER_SECOND);
// }

// startButton.addEventListener("click", startGame);
// getLeaderboard();
// onLoad();