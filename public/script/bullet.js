const bulletArray = [];
const MAX_BULLET_ARRAY_LENGTH = 20;

const bulletImg = new Image();
bulletImg.src = "./img/bullet.png";

var speed = 15;

var sfx = {
    shot: new Howl({
        src: [
            "./audio/flint_shot.wav",
        ]
    }),
    cover: new Howl({
        src: ["./audio/take_cover.mp3",]
    })
}

class Bullet {

    constructor() {
        this.x = 800;
        this.y = 220;
        this.width = 50;
        this.height = 30;
        speed++;
        this.counted = false;
    };

    drawBullet() {
        ctx.drawImage(bulletImg, this.x, this.y, this.width, this.height);
    }

    bulletFlight() {
        if (!sfx.cover.playing()) {
            sfx.cover.play();
        }
        this.x -= speed;
        if (!this.counted && this.x < player.x) {
            score++;
            
            this.counted = true;
        }
        this.drawBullet();
        
    }
}

function createNewBullet() {
    bulletArray.unshift(new Bullet);
    shootBullet();
}

function shootBullet() {
    
    if (previousShotTime + reloadTime === frame){
        console.log(speed);
        sfx.shot.play();
        previousShotTime = frame;        
        reloadTime = Math.floor(Math.random()*120 + 60);
    }

    for (let i = 0; i < bulletArray.length; i++) {
        bulletArray[i].fly(); 
    }

    if (bulletArray.length > MAX_BULLET_ARRAY_LENGTH){
        bulletArray.pop(bulletArray[0]);   
    }
}
