class Screen {

    constructor() {
        this.instance;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    static getInstance() {
        if (!this.instance) {
        this.instance = new Screen();
        }
        return this.instance;
    }

}

class GameScreen extends Screen {
    constructor() {
        super();
        this.game = new Game();
    }

    draw() {
        this.game.draw();
    }

    update() {
        this.game.update();
    }
}

class MenuScreen extends Screen {
    constructor() {
        super();
        this.menu = new Menu();
    }

    draw() {
        this.menu.draw();
    }

    update() {
        this.menu.update();
    }
}

class GameOverScreen extends Screen {
    constructor() {
        super();
        this.gameOver = new GameOver();
    }

    draw() {
        this.gameOver.draw();
    }

    update() {
        this.gameOver.update();
    }
}