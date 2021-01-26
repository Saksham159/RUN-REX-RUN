var game,gI
var res,reI
var gameState="play"
var trex, trex_running, edges;
var groundImage,ground
var invisi
var cloud,cloudImage
var obstacle,obIm1,obIm2,obIm3
var cloudGroup,obGroup
var khatam
var khudo
var lol
var hehehe
var voice
var score
var billu

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  obIm1=loadImage("obstacle1.png")
  obIm2=loadImage("obstacle2.png")
  obIm3=loadImage("obstacle3.png")
  khatam=loadAnimation("trex_collided.png")
  gI=loadImage("gameOver.png")
  reI=loadImage("restart.png")
  khudo=loadSound("jump.mp3")
  lol=loadSound("die.mp3")
  hehehe=loadSound("checkPoint.mp3")
  billu=loadAnimation("trex1.png")
  
}

function setup(){
  createCanvas(600,200);
  
  score=0
  textSize(20)
  fill(1)
  
  ground=createSprite(200,190,400,10)
  ground.addImage(groundImage)
  
  game=createSprite(300,45,10,10)
  game.addImage(gI)
  
  res=createSprite(300,90,10,10)
  res.addImage(reI)
  res.scale=0.5
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("khatam",khatam)
  trex.addAnimation("lol",billu)
  edges = createEdgeSprites();
  
 // trex.debug=true
  trex.setCollider("circle",0,10,20)
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  invisi=createSprite(200,200,400,10)
  invisi.visible=false
  
  cloudGroup=createGroup()
  obGroup=createGroup()

  
  //trex.velocityX=2
}


function draw(){
  //set background color 
  background("white");
  
  
  text("score="+score,500,30);
  
  if(gameState==="play"){
    score=score+Math.round(getFrameRate()/60)
     ground.velocityX=-(7*2*score/100)
    
    if(score>0&&score%100==0){
      hehehe.play()
    }
    
    game.visible=false
    res.visible=false
  
  if(ground.x<0){
    ground.x=ground.width/2
  }
  
  //logging the y position of the trex
  console.log(trex.y)
  
  //jump when space key is pressed
  if(keyDown("space")&& trex.y>159){
    trex.velocityY = -15;trex.changeAnimation("lol",billu)
    voice=1
  }
    if(voice==1){
     khudo.play()
      voice=2
    }
  
  trex.velocityY = trex.velocityY + 1.5;
      clou()
      obs()
    if(trex.y>155){
       trex.changeAnimation("running",trex_running)
    }
    if(trex.isTouching(obGroup)){
      lol.play()
      gameState="end"
    }
  }
  if(gameState==="end"){
    game.visible=true
    res.visible=true
    obGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    ground.velocityX=0
    obGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    trex.changeAnimation("khatam",khatam)
    trex.velocityY=0
    if(keyDown("space")||mousePressedOver(res)){
      gameState="play"
      trex.changeAnimation("running",trex_running)
      cloudGroup.destroyEach()
      obGroup.destroyEach()
      score=0
    }
  }
  //stop trex from falling down
  trex.collide(invisi)

  drawSprites();
}
function clou(){
  if(frameCount%20===0){
  cloud=createSprite(550,random(1,50),10,10)
  cloud.velocityX=-10
    cloud.addImage(cloudImage)
   // cloud.debug=true 
    trex.depth=cloud.depth
    cloud.lifetime=100
    cloudGroup.add(cloud)
  }
  
}
function obs(){
  if(frameCount%40===0){
  obstacle=createSprite(550,170,10,10)
  obstacle.velocityX=-10//(8*2*score/100)
    var o=Math.round(random(1,3))
    switch(o){
      case 1: obstacle.addImage(obIm1);break
       case 2: obstacle.addImage(obIm2);break
        case 3: obstacle.addImage(obIm3);break
    }
       // obstacle.debug=true
        obstacle.setCollider("rectangle",0,0,80,50)
        obstacle.scale=0.7
  obstacle.lifetime=100
        obGroup.add(obstacle)
}}