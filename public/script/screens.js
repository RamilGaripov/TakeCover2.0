class ScreenManager {
    static instance;

    static getInstance() {
        if (!ScreenManager.instance) {
            ScreenManager.instance = new ScreenManager();
            ScreenManager.instance.screens = {};
            ScreenManager.instance.screens[screensEnum.MenuScreen] = new MenuScreen();
            ScreenManager.instance.screens[screensEnum.GameScreen] = new GameScreen();
            ScreenManager.instance.screens[screensEnum.GameOverScreen] = new GameOverScreen();
        }
        return ScreenManager.instance;
    }

    show_screen(screen) {
        console.log("SM show screen", screen)
        ScreenManager.instance.screens[screen].show_screen();
    }

}

const screensEnum = Object.freeze({
    MenuScreen: 1,
    GameScreen: 2,
    GameOverScreen: 3
});

class Screen {
    constructor() {
        this.gameSession = GameSession.getInstance();
        this.screenManager = ScreenManager.getInstance();
    }
    show_screen() {}
}

class MenuScreen extends Screen {

    constructor() {
        super();
        this.startButton = document.getElementById("startGame");
        
    }

    show_screen() {
        console.log("MenuScreen displayed")
        this.startButton.style.display = "inline-block";
        this.startButton.addEventListener("click", this.startGame);
    }

    startGame() {
        console.log("CLICKED START GAME");
        // TODO: Add countdown to start game.
        this.gameSession.startGame();
        this.screenManager.show_screen(screensEnum.GameScreen);
        const startButton = document.getElementById("startGame");
        startButton.style.display = "none";
    }
}

class GameScreen extends Screen {
    constructor() {
        super();
        this.pauseButton = document.getElementById("pauseGame");
    }

    show_screen() {
        console.log("GameScreen displayed");
        this.pauseButton.style.display="inline-block";
        this.pauseButton.addEventListener("click", this.pauseGame);
    }

    pauseGame() {
        this.gameSession.pause();
        this.screenManager.show_screen(screensEnum.MenuScreen);
        console.log("Pausing the game");
        pauseButton.style.display="none";
    }
}

class GameOverScreen extends Screen {
    GAME_OVER_MESSAGES = [
        "Please, it's not that hard. Press 'E' to take cover!",
        " points. You belong in the bronze bracket.",
        " point(s). Stuck in silver forever.",
        " points. Not too bad. One day you'll hit the diamond league.",
        " points. A solid diamond player. You have potential.",
        " points. Legendary! But are you good enough to be IMMORTAL?",
        " points. IMMORTAL! Your skills are unmatched!",
    ];

    
    static TRY_AGAIN = 0;
    static BRONZE_SCORE = 4;
    static SILVER_SCORE = 8;
    static GOLD_SCORE = 14;
    static DIAMOND_SCORE = 20;
    static LEGENDARY_SCORE = 30;
    // GAME_OVER_MSG_Y = ui.canvas.height / 3;

    handleGameOver() {
        for (let i = 0; i < bulletArray.length; i++) {
            if (bulletArray[i].x > 50 && bulletArray[i].x < 150 && player.hitbox) {
            ui.ctx.font = "35px Georgia";
            ui.ctx.fillStyle = "#a0d2eb";
        
            if (score == TRY_AGAIN) {
                msgIndex = 0; 
            } else if (score < BRONZE_SCORE) {
                msgIndex = 1; 
            } else if (score < SILVER_SCORE) {
                msgIndex = 2; 
            } else if (score < GOLD_SCORE) {
                msgIndex = 3; 
            } else if (score < DIAMOND_SCORE) {
                msgIndex = 4; 
            } else if (score < LEGENDARY_SCORE) {
                msgIndex = 5; 
            } else {
                msgIndex = 6; 
            }
            this.getTextMessage(msgIndex); 
            return true;
            }
        }
    }

    //returns the coordinates for the message to be printed out in the centre of the canvas
    getCentreTextPosition(msg) {
        metrics = ui.ctx.measureText(msg);
        textWidth = metrics.width;
        return (ui.canvas.width - textWidth)/2;
    }
  
    //prints the game over message on the canvas
    getTextMessage(index) {
        gameOverMsg = gameOverMsgArray[index];
        if (score > 0) {
        gameOverMsg = score + " " + gameOverMsg;
        }
        ctx.fillText(
        gameOverMsg,
        this.getCentreTextPosition(gameOverMsg),
        GAME_OVER_MSG_Y
        );
    }
        
    show_screen() {
        console.log("GameOver displayed")
    }
}