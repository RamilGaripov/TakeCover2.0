
class UI {
  static CANVAS_WIDTH = 1200;
  static CANVAS_HEIGHT = 400;

  constructor() {
    this.bgCanvas = document.getElementById("backgroundCanvas");
    this.canvas = document.getElementById("actionCanvas");
    this.bgCtx = this.bgCanvas.getContext("2d");
    this.ctx = this.canvas.getContext("2d");
    
    this.bgCanvas.width = UI.CANVAS_WIDTH;
    this.bgCanvas.height = UI.CANVAS_HEIGHT;
    this.canvas.width = UI.CANVAS_WIDTH;
    this.canvas.height = UI.CANVAS_HEIGHT;
    this.background = new Image(60, 45);
    this.background.src = "./img/background1.png";
    this.background.onload = this.drawBackground.bind(this);

    this.screenManager = ScreenManager.getInstance();
    this.screenManager.show_screen(screensEnum.MenuScreen);
    


  }

  drawBackground() {   
    this.canvas.width = this.background.naturalWidth;
    this.canvas.height = this.background.naturalHeight;
    this.bgCanvas.width = this.background.naturalWidth;
    this.bgCanvas.height = this.background.naturalHeight;
    this.bgCtx.drawImage(this.background, 0, 0);
  }

  
  // let startButton = document.createElement("button");
// startButton.setAttribute("class", "btn btn-info");
// startButton.setAttribute("id", "startGame");
// startButton.innerHTML = "Start Game";
// document.getElementById("startButtonHere").appendChild(startButton);
}

  // ctx.fillStyle = scoreGradient;
  // ctx.font = "90px Georgia";
  // ctx.fillText(score, getCentreTextPosition(score), 70);


function onLoad() {
  const ui = new UI();
  getLeaderboard();
  const gameSession = GameSession.getInstance();
  gameSession.setupGameEnvironment(ui);
  // bufferCtx.drawImage(background, 0, 0, canvas.width, canvas.height);
  // gameSession.setupPlayerAndEnemy(ctx);
}

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


async function getLeaderboard() {
  const response = await fetch("/get-leaderboard", {
    method: "GET"
  });
  const data = await response.json();
  console.log(data);
  populateLeaderboard(data.rows);
}

function populateLeaderboard(bestPlayers) {
  const table = document.getElementsByClassName("name");
  const score = document.getElementsByClassName("score");
  for (var i = 0; i < bestPlayers.length; i++) {
    table[i].textContent = bestPlayers[i].name;
    score[i].textContent = bestPlayers[i].score;
  }
}

onLoad();