var sea,bird,shark,pirahna,ufo,score,treasure,coin,gameOver,restart;
var seaImg,birdImg,sharkImg,crabImg,ufoImg,treasureImg,coinImg,pirahnaImg,gameOverImg,restartImg;

var pirahnaCG, birdCG,coinCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var score=0;
var gameOver, restart;

function preload(){
    seaImg = loadImage("image.png");
    sharkImg = loadImage("shark.png");
    crabImg = loadImage("crab.png");
    ufoImg = loadImage("ufo.png");
    treasureImg = loadImage("treasure.png")
    coinImg = loadImage("coin.png");
    birdImg = loadImage("bird.png");
    pirahnaImg = loadImage("piranha.png")
    gameOverImg = loadImage("gameOver.png")
    restartImg = loadImage("restart.png")
}

function setup(){
  
createCanvas(1200,300);
// Moving background
sea=createSprite(100,150);
sea.addImage(seaImg);
sea.velocityX = -(7 + 2*distance/120);

//creating boy running
ufo = createSprite(70,150);
ufo.addImage(ufoImg);
ufo.scale=0.5;
  
//set collider for ufo
ufo.setCollider("rectangle",0,0,ufo.width/2,ufo.height/2);
ufo.debug = true

  
gameOver = createSprite(600,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;

restart = createSprite(600,200);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;
  
pirahnaCG = new Group();
birdCG = new Group();
coinCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  text("Score:"+ score,600,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   sea.velocityX = -(6 + 2*distance/150);
  
   ufo.y = World.mouseY;
  
   edges= createEdgeSprites();
   ufo.collide(edges);

  //code to reset the background
  if(sea.x < 0 ){
    sea.x = width/1.5;
    sea.scale = 1.5
  }

  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,2));
  var coined = Math.round(1);
  
  if (World.frameCount % 30 == 0) {
    if (select_oppPlayer == 1) {
      pirahnas();
    } else {
      birds();
    }
  }

  if (World.frameCount % 20 == 0) {
      if (coined == 1) {
          coins();
      }
  }

   if(pirahnaCG.isTouching(ufo)){
     gameState = END;
     pirahna.velocityY = 0;
     pirahnaCG.destroyEach()
     birdCG.destroyEach()
    }
    
    if(birdCG.isTouching(ufo)){
      gameState = END;
      bird.velocityY = 0;
      birdCG.destroyEach()
      pirahnaCG.destroyEach()
    }
    
    if(coinCG.isTouching(ufo)){
     score=score+1
     coin.destroy();
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    //Add code to show restart game instrution in text here
    
    sea.velocityX = 0;
    ufo.velocityY = 0;
  
    pirahnaCG.setVelocityXEach(0);
    pirahnaCG.setLifetimeEach(-1);
  
    birdCG.setVelocityXEach(0);
    birdCG.setLifetimeEach(-1);
  
    coinCG.setVelocityXEach(0);
    coinCG.setLifetimeEach(-1);

    //write condition for calling reset( )
    if(mousePressedOver(restart)) {
      reset();
    }
  
}
}

function pirahnas(){
        pirahna =createSprite(1100,Math.round(random(210, 300)),50,250);
        pirahna.scale =0.3;
        pirahna.velocityX = -(7 + 2*distance/120);(6 + 2*distance/150);
        pirahna.addImage(pirahnaImg);
        pirahna.setLifetime=170;
        pirahnaCG.add(pirahna);
}

function birds(){
        bird =createSprite(1100,Math.round(random(0,200)),50,250);
        bird.scale =0.3;
        bird.velocityX = -(7 + 2*distance/120);
        bird.addImage(birdImg);
        bird.setLifetime=170;
        birdCG.add(bird);
}

function coins(){
        coin =createSprite(1100,Math.round(random(20,280)));
        coin.scale =0.15;
        coin.velocityX = -(7 + 2*distance/120);
        coin.addImage(coinImg);
        coin.setLifetime=170;
        coinCG.add(coin);
}

//create reset function here
function reset(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
pirahnaCG.destroyEach();
coinCG.destroyEach();
birdCG.destroyEach();
distance = 0;
score = 0;
}