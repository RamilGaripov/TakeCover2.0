const canvas = document.querySelector("canvas");

const TRY_AGAIN = 0;
const BRONZE_SCORE = 4;
const SILVER_SCORE = 8;
const GOLD_SCORE = 14;
const DIAMOND_SCORE = 20;
const LEGENDARY_SCORE = 30;
const FRAMES_PER_SECOND = 60;

const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 400;

let frame = 0;
let frameTakeCoverComplete = 0;
let spacePressed = false;
let score = 0;

const background = new Image();
background.src = "./img/background1.png";

window.addEventListener("keydown", function (e) {
  if (e.code === "KeyE") spacePressed = true;
});

function handleInjury() {
  for (let i = 0; i < bulletArray.length; i++) {
    if (bulletArray[i].x > 50 && bulletArray[i].x < 150 && player.hitbox) {
      ctx.font = "35px Georgia";

      ctx.fillStyle = "#a0d2eb";

      if (score == TRY_AGAIN) {
        ctx.fillText(
          "Please, it's not that hard. Press 'E' to take cover!",
          150,
          canvas.height / 4
        );
      } else if (score < BRONZE_SCORE) {
        ctx.fillText(
          score + " points. You belong in the bronze bracket.",
          150,
          canvas.height / 4
        );
      } else if (score < SILVER_SCORE) {
        ctx.fillText(
          score + " points. Stuck in silver forever.",
          150,
          canvas.height / 4
        );
      } else if (score < GOLD_SCORE) {
        ctx.fillText(
          score + " points. Not too bad. Keep training and one day you'll hit the diamond league.",
          150,
          canvas.height / 4
        );
      } else if (score < DIAMOND_SCORE) {
        ctx.fillText(
          score + " points. \nA solid diamond player. You have potential.",
          150,
          canvas.height / 4
        );
      } else if (score < LEGENDARY_SCORE) {
        ctx.fillText(
          score + " points. Legendary league! Get a proper 5-stack to reach IMMORTAL",
          150,
          canvas.height / 4
        );
      } else {
        ctx.fillText(
          score + " points. IMMORTAL! Your skills are unmatched!",
          150,
          canvas.height / 4
        );
      }
      return true;
    }
  }
}

let startButton = document.createElement("button");
startButton.setAttribute("class", "btn btn-info");
startButton.setAttribute("id", "startGame");
startButton.innerHTML = "Start Game";
document.getElementById("startButtonHere").appendChild(startButton);

function onLoad() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


  drawSprite(
    playerSprite,
    player.width * player.frameX,
    player.height * player.frameY,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width,
    player.height
  );
  drawEnemy(
    enemySprite,
    enemy.width * enemy.frameX,
    enemy.height * enemy.frameY,
    enemy.width,
    enemy.height,
    enemy.x,
    enemy.y,
    enemy.width,
    enemy.height
  );

  if (handleInjury()) {
    console.log("u dead, let's update the scores");
    updateScores();
    return;
  }

  ctx.fillStyle = scoreGradient;
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 560, 70);
  ctx.fillText(score, 560, 70);

  requestAnimationFrame(onLoad);
}

async function updateScores() {
  try {
    //need to prompt player for their name

    //take scores and send them to the server
    console.log("We are dead and our score is:", score);
    const userName = window.prompt("Enter your name:");
    const newScore = {
      name: userName,
      score: score
    };
    const response = await fetch("/insert-score", {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newScore)
    });
    console.log(newScore);
    getLeaderboard();
  } catch (err) {
    console.log(err);
  }
}

const scoreGradient = ctx.createLinearGradient(0, 0, 0, 70);
scoreGradient.addColorStop("0.4", "rgb(235, 235, 56)");
scoreGradient.addColorStop("0.6", "rgb(235, 209, 54)");
scoreGradient.addColorStop("0.7", "rgb(235, 209, 54)");
scoreGradient.addColorStop("0.9", "rgb(186, 134, 56)");

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
  console.log("starting the animation at " + fps + "fps.");
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  now = Date.now();
  elapsed = now - then;
  shootBullets();

  if (elapsed > fpsInterval) {
    frame++;
    // console.log("frame " + frame);
    then = now - (elapsed % fpsInterval);
    if (spacePressed) {
      takeCover();
      if ((frame - frameTakeCoverComplete) >= FRAMES_SPENT_IN_COVER) {
        exitCover();
      }
    }
    handleInjury();
    if (handleInjury()) return;
  }
  requestAnimationFrame(animate);
}

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


function startGame() {
  console.log("Let us begin!");
  startAnimating(FRAMES_PER_SECOND);
}

startButton.addEventListener("click", startGame);
getLeaderboard();
onLoad();