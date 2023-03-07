var PLAY = 1;
var END = 0;
var gameState = PLAY;

var runner_running, runner;
var ground, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup,rock, rock1 , rock2 



var score;

if(mousePressedOver(restart)){
  reset();

  restart.scale = 0.5;
}


function preload(){
  //trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  //runner_running = loadAnimation("running.png","running2.png");
  runner_collided = loadImage("dead.png");
  runner_running = loadImage("running.png");

  restartImg = loadImage("restart.png")
  
  groundImage = loadImage("ground.png");
  gameoverr = loadImage("gameover.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("rock.png");
  obstacle2 = loadImage("rock2.png");
  obstacle3 = loadImage("rock1.png");

  sky = loadImage("sky.png");
  
}
function setup(){
  createCanvas(700, 300);

  restart = createSprite(370,240);
  restart.addImage(restartImg);

  restart.scale = 0.1

  runner = createSprite(50,250,20,50);
  runner.addAnimation("runner_running", runner_running );
  runner.addAnimation("runner_collided", runner_collided) 
  runner.scale = 0.5;
  runner .debug = true
  runner.setCollider("circle",0,0,80)

  ground = createSprite(300,300,100,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -10
  
  
  cloudsGroup = new Group()
  obstaclesGroup = new Group()
  invisibleGround = createSprite(200,302,400,10);
  invisibleGround.visible = false;

  gameover = createSprite(370,130)
  gameover.addImage("gameoverr",gameoverr) 
  gameover.scale = 0.3
  gameover.visible = false
  
  score = 0;

}
  function draw(){
    
    

    background(sky);
  //displaying score
  text("Score: "+ score, 500,50);

if (gameState == PLAY){
  spawnClouds()
  restart.visible = false;
  gameover.visible = false;
  ground.velocityX = -10
  if (ground.x < 0){
    ground.x = ground.width/2;
    
  }
  if(keyDown("space")&& runner.y >= 230) {
    runner.velocityY = -15;
}
spawnObstacles();

if(obstaclesGroup.isTouching(runner)){
  gameState = END
}
score = score + Math.round(frameCount/60)

}
else if(gameState == END){
  gameover.visible = true
  restart.visible = true
  obstaclesGroup.setVelocityXEach (0)
  cloudsGroup.setVelocityXEach (0)
  ground.velocityX = 0
  runner.changeAnimation("runner_collided", runner_collided) 
  if(mousePressedOver(restart)){
    gameState = PLAY;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    runner.changeAnimation("runner_running", runner_running );
  }
}

  

  



runner.velocityY = runner.velocityY + 0.8

runner.collide(invisibleGround);

    

    


  drawSprites()
  }
  function spawnClouds() {
    //write code here to spawn the clouds
     if (frameCount % 100 === 0) {
       cloud = createSprite(800,100,40,10);
      cloud.y = Math.round(random(10,60));
      cloud.addImage(cloudImage);
      cloud.scale = 0.5;
      cloud.velocityX = -3;

      
      

      
       //assign lifetime to the variable
      cloud.lifetime = 300;
      
      //adjust the depth
      cloud.depth = runner.depth;

      
      
      
      //adding cloud to the group
     cloudsGroup.add(cloud);
      }
    }
      function spawnObstacles(){
        if (frameCount % 80 === 0){
          var obstacle = createSprite(800,270,10,40);
          obstacle.velocityX = -10;
        
           //generate random obstacles
           var rand = Math.round(random(1,3));
           switch(rand) {
             case 1: obstacle.addImage(obstacle1);
                     break;
             case 2: obstacle.addImage(obstacle2);
                     break;
             case 3: obstacle.addImage(obstacle3);
                     break;
             
           }
           obstacle.scale = 0.3;
           obstacle.lifetime = 300;
   
           obstaclesGroup.add(obstacle);
           obstacle.debug = true
          }
         }
         


  
  
  
