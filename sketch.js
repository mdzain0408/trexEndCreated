var trex, trex_running, trex_collided,coun;
var ground, invisibleGround, groundImage;
var cloudanimation,cloudsgroup,obstaclegroup;
var clouds,obstacle;
var obstacleimagel,obstacleimage2,obstacleimage3,obstacleimage4,obstacleimage5,obstacleimage6;
var gamestate ,bgImage,bgText,decide,spriteOverimg,spriteOver

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudanimation=loadImage("cloud.png");
  
  
  groundImage = loadImage("ground2.png");
    obstacleimage1 = loadImage ("obstacle1.png")
    obstacleimage2 =   loadImage("obstacle2.png")
    obstacleimage3 =   loadImage("obstacle3.png")
    obstacleimage4 =   loadImage("obstacle4.png")
    obstacleimage5 =  loadImage ("obstacle5.png")
    obstacleimage6 =   loadImage("obstacle6.png")
  bgImage = loadImage("gameisend2.jpg");
spriteOverimg = loadImage(gameOver.png)
}

function setup() {
  canvas = createCanvas(displayWidth - 600, displayHeight-600);
  
  trex = createSprite(displayWidth-700,displayHeight-700,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.velocityX = 5;
bgText = "black"
  gamestate = "start"
  
  ground = createSprite(displayWidth-700,displayHeight-700,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //ground.velocityX = -2;
  


  cloudsgroup=new Group();
  
  coun=0
  
  obstaclegroup=  new Group();
  
  invisibleGround = createSprite(displayWidth-700,displayHeight-690,400,10);
  invisibleGround.visible = false;
}

function draw() {
  
  if(keyDown("space") && (gamestate === "start") ) {
    console.log(ground.x-ground.width);
    console.log("yes")
    trex.velocityY = -10;
  }
 
  
  if (gamestate === "start"){
    background("black");
    coun=coun+Math.round(getFrameRate()/60);
    trex.velocityY = trex.velocityY + 0.8
    spawnclouds();
    obstacles();
    text("score : "+ coun,camera.x-300,50);
  }else if (gamestate === "end"){
    background(bgImage)
    trex.addImage(trex_collided);
trex.velocityX = 0;
obstaclegroup.setLifetimeEach(-1);
cloudsgroup.setLifetimeEach(-1);
trex.addImage(trex_collided);
textSize(20)
stroke("black")
strokeWeight(6)
text("Your Final Score: "+ coun , camera.x - 60,displayHeight-750)





  }
  
  camera.position.x = trex.x;
  camera.position.y = displayHeight - 750
  
  
  if (ground.x < trex.x){
console.log("running")
ground.x = camera.x+ground.width/2 - 700
console.log(ground.x-ground.width);
console.log(camera.x)

  }
  
 
  
  
  
   
  

  invisibleGround.x = camera.x

  if (trex.isTouching(obstaclegroup)){

gamestate = "end"

  }

  if (coun % 100 === 0){
    console.log(trex.velocityX)

trex.velocityX = trex.velocityX +0.25

  }
 
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnclouds(){
 
 
  if (frameCount%60===0){
 clouds = createSprite(camera.x + 450,random(displayHeight-745,displayHeight-830),20,20)
 clouds.scale=0.6 
 clouds.depth=trex.depth-1   
 clouds.lifetime=300 
    
 clouds.addImage(cloudanimation);
 //clouds.velocityX=-4
    
 cloudsgroup.add(clouds);    
  }
}

function obstacles(){
  if(frameCount%90===0){
 var ran;
  
  obstacle=createSprite(camera.x+450,displayHeight-715,20,20);
    obstacle.scale=0.5
    
  //obstacle.velocityX=-2;
  obstacle.lifetime=300;
  
  ran = Math.round(random(1,6));
  console.log(ran)
  
  switch(ran){
    case 1:
    obstacle.addImage(obstacleimage1);
    break ;
    
    case 2:
    obstacle.addImage(obstacleimage2);
    break ;
    
    case 3:
    obstacle.addImage(obstacleimage3);
    break ;

    case 4:
    obstacle.addImage(obstacleimage4);
    break ;

    case 5:
    obstacle.addImage(obstacleimage5);
    break ;

    case 6:
    obstacle.addImage(obstacleimage6);
    break ;
    
    default:
    break;
  }
    obstaclegroup.add(obstacle);
  }
}