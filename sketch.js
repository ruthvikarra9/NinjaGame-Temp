var PLAY = 1;
var END = 0;
var PAUSE = 2;
var gameState = PLAY;

var ninja, ninja_running, ninjaLife1,ninjaLife2,ninjaLife3;
var invisibleGround;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var path,pathImg;
var backgroundImg

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var score=0;
var life =3;

var gameOver, restart;



function preload(){
  ninja_running =   loadAnimation("Ninja1.png","Ninja2.png","Ninja3.png","Ninja4.png","Ninja5.png","Ninja6.png");
  ninjaLife1 = loadAnimation("NinjaLife1.png");
  ninjaLife2 = loadAnimation("NinjaLife2.png");
  ninjaLife3 = loadAnimation("NinjaLife3.png");

  heart1Img = loadImage("heart_1.png")
  heart2Img = loadImage("heart_2.png")
  heart3Img = loadImage("heart_3.png")
  
  pathImg = loadImage("GroundImg.png");
  backgroundImg = loadImage("BgImg.jpg")
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("Rock1.png");
  obstacle2 = loadImage("Rock2.png");
  obstacle3 = loadImage("Rock3.png");
  obstacle4 = loadImage("Rock4.png");
  obstacle5 = loadImage("Rock5.png");
  obstacle6 = loadImage("Rock6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1200,600);
  path=createSprite(1200,400,1400,20);
path.addImage(pathImg);
//path.scale = 2
path.velocityX = -5;
  ninja = createSprite(50,325,20,50);
  
  ninja.addAnimation("running", ninja_running);
  /*ninja.addAnimation("collided", NinjaLife1);
  ninja.addAnimation("collided2", NinjaLife2);
  ninja.addAnimation("collided3", NinjaLife3);
  ninja.scale = 0.5;
  
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
   heart1.addImage("heart1",heart1Img)
   heart1.scale = 0.4

   heart2 = createSprite(displayWidth-100,40,20,20)
   heart2.visible = false
   heart2.addImage("heart2",heart2Img)
   heart2.scale = 0.4

   heart3 = createSprite(displayWidth-150,40,20,20)
   heart3.addImage("heart3",heart3Img)
   heart3.scale = 0.4

  path = createSprite(200,180,400,20);
  path.addImage("ground",pathImg);
  path.x = path.width /2;
  path.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  */
  invisibleGround = createSprite(200,370,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //ninja.debug = true;
  background('gray');
  /*text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    path.velocityX = -(6 + 3*score/100);
  */
    if(keyDown("space") && ninja.y >= 159) {
      ninja.velocityY = -12;
    }
  
    ninja.velocityY = ninja.velocityY + 0.8
  
    if (path.x < 0){
      path.x = path.width/2;
    }
/*
    if(obstaclesGroup.isTouching(ninja)){
 
      //gameState = END
     
      for(var i=0;i<obstaclesGroup.length;i++){     
           
       if(obstaclesGroup[i].isTouching(ninja)){
            obstaclesGroup[i].destroy()
           
           life=life-1
            } 
      
      }
      if(life===2){
        ninja.changeAnimation("collided", NinjaLife1);
        gameState = PAUSE
      }
      else if(life === 1){
        ninja.changeAnimation("collided2", NinjaLife2);
        gameState = PAUSE
      }
      else if(life===0){
        ninja.changeAnimation("collided3", NinjaLife3);
        gameState = END
      }
     }

    if(life===3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }
  */
    ninja.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  /*

  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    path.velocityX = 0;
    ninja.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  else if(gameState === PAUSE){
    path.velocityX = 0;
    ninja.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(keyDown("UP_ARROW")){
      gameState=PLAY
    }
  }
  

  */
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = ninja.depth;
    ninja.depth = ninja.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,350);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.scale = 10
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  ninja.changeAnimation("running",NinjaRunning);
  
 
  
  score = 0;
  
}