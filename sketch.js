var bg, bg_IMAGE, lowerbg, lowerbg_IMAGE;
var bird, bird_IMAGE;
var NorthPipe, NorthPipe_IMAGE;
var SouthPipe, SouthPipe_IMAGE;
var restart, restartIMG
var score = -4;
var gameState = 0;
var Enemy, enemyIMG;
function preload() {

    // for loading IMAGES...
    bg_IMAGE = loadImage("bg.png");
    lowerbg_IMAGE = loadImage("lowerbg.png");
    bird_IMAGE = loadImage("bird.png")
    NorthPipe_IMAGE = loadImage("pipeNorth.png");
    South_PipeIMAGE = loadImage("pipeSouth.png");
    restartIMG = loadImage("restart.png");
    enemyIMG = loadImage("eagle.jpg")
}

function setup() {
    // canvas size..
    createCanvas(690, 630);

    //background
    bg = createSprite(300, 100, 10, 10);
    bg.addImage(bg_IMAGE);
    bg.scale = 2.7;

    restart = createSprite(300, 300, 10, 10);
    restart.addImage(restartIMG);
    restart.visible = false;

    //lower Backgroud...
    lowerbg = createSprite(365, 640, 10, 10);
    lowerbg.addImage(lowerbg_IMAGE);
    lowerbg.scale = 2.5;
    lowerbg.velocityX = -1;

    //bird...
    bird = createSprite(30, 315, 10, 10);
    bird.addImage(bird_IMAGE);
    bird.scale = 1.5;


    NorthPipeGroup = new Group();
    SouthPipeGroup = new Group();
    enemyGroup = new Group();
}

function draw() {
    background("yellow");

    bird.collide(lowerbg);

    if (gameState === 0) {
        //for unlimited lowerBG...
        if (lowerbg.x === 310) {
            lowerbg.x = 365;
        }

        //gravity...
        bird.velocityY = bird.velocityY + 1.5;

        //controls of bird...
        if (keyDown("space")) {
            bird.velocityY = -12;
        }

        PipeMotion();
        enemy();

        if (bird.isTouching(NorthPipeGroup) || bird.isTouching(SouthPipeGroup) || bird.isTouching(lowerbg)
            || bird.isTouching(enemyGroup)) {

            gameState = 1;
        }

    }
    if (gameState === 1) {
        bird.velocityY = 13;

        NorthPipeGroup.setVelocityXEach(0);
        SouthPipeGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        lowerbg.velocityX = 0;

        restart.visible = true;

        textSize(30);
        text("Game Over ", 300, 300)
        if (mousePressedOver(restart)) {
            console.log("abc");
            reset();

        }
    }

    drawSprites();

    if (score >= 0) {
        fill("RED");
        textSize(30);
        text("Your Score: " + score, 315, 600);
    }

}

function PipeMotion() {

    // for randomly spawning Northpipes and SouthPipes...
    if (frameCount % 80 === 0) {

        // north pipe..
        NorthPipe = createSprite(710, 200, 10, 100);
        NorthPipe.addImage(NorthPipe_IMAGE);
        NorthPipe.y = random(0, 130);
        NorthPipe.velocityX = -2;
        NorthPipeGroup.add(NorthPipe)
        NorthPipe.Lifetime = 520;

        //south Pipe...
        SouthPipe = createSprite(710, 630, 10, 100);
        SouthPipe.addImage(South_PipeIMAGE);
        SouthPipe.y = random(630, 520);
        SouthPipe.velocityX = -2;
        SouthPipeGroup.add(SouthPipe);
        SouthPipe.Lifetime = 520;

        score += 1;

    }
}


function enemy() {

    // for spawning enemy...
    if (frameCount % 120 === 0) {

        // enemy...
        Enemy = createSprite(710, 630, 10, 10);
        Enemy.addImage(enemyIMG);
        Enemy.scale = 0.2;
        Enemy.y = random(200, 400);
        Enemy.velocityX = -4;
        enemyGroup.add(Enemy);
        Enemy.lifetime = 520;

    }

}

function reset() {
    console.log("def");
    gameState = 0;
    score = -4;
    NorthPipeGroup.destroyEach();
    SouthPipeGroup.destroyEach();
    enemyGroup.destroyEach();
    restart.visible = false;
}
