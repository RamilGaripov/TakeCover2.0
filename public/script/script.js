const canvas = document.querySelector("canvas");

const LOW_SCORE = 5;
const MEDIUM_SCORE = 10;
const ADVANCED_SCORE = 15;
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

      if (score < LOW_SCORE) {
        ctx.fillText(
          "You are slow as a turtle! Your score is: " + score + ". Try again!",
          150,
          canvas.height / 4
        );
      } else if (score < MEDIUM_SCORE) {
        ctx.fillText(
          "Right in your turtle heart! Your score is: " + score + ". Not bad!",
          150,
          canvas.height / 4
        );
      } else if (score < ADVANCED_SCORE) {
        ctx.fillText(
          "Wow, you are a ninja turtle!! Your score is: " + score + ".",
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
    const newScore = {
      name: "Ramil",
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