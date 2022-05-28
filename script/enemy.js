const enemy = {
    x: 820,
    y: 100,
    width: 344,
    height: 293,
    frameX: 0,
    frameY: 0,
};

const enemySprite = new Image();
enemySprite.src = "./img/flint.png";

function drawEnemy(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};
