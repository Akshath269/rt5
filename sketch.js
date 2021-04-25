var ball, ballImage;
var bg, bgImg;
var hoop;
var platform;
var backboard;
var score=0
hoopX = 500
hoopY = 150
radius = 20;
var powerup=0;
var gravity = 0.7;
var jump=15;

var gameState = "start"
function preload()
{
  bgImg=loadImage("background.jpg")
  ballImage=loadImage("basketball.png")
}

function setup() {
	createCanvas(displayWidth, displayHeight-150);

  bg= createSprite(width/2,height/2-50)
  bg.addImage(bgImg)
  bg.scale=2

  ball=createSprite(mouseX,mouseY,10,10)
  ball.addImage(ballImage)
  ball.scale=0.2
  ball.friction = 0.01;
  ball.restitution= 0.8
  
  hoopBottom=createSprite(1250,400,100,10)
  hoopBottom.shapeColor= "cyan"
  hoopBottom.visible=false 
  hoopBottom.debug=true

  backboard=createSprite(1340,240,70,180)
  backboard.shapeColor="black"
  backboard.immovable = true;
  backboard.visible=false

  hoopSide1 = createSprite(1300, 350, 10, 90);
  hoopSide1.shapeColor= "white"
  hoopSide1.visible=false
  hoopSide2 = createSprite(1190,350,10, 100);
  hoopSide2.visible=false

  platform = createSprite(20,790,100,20);
  platform.immovable = true;
  platform.shapeColor="red"


  
  
}


function draw() {  
  background(200);

  if(gameState==="start"){
    fill("red")
    textSize(30)
    text("Press UP ARROW key to throw the ball into the hoop",100,200 ) 
    text("Everyone time you throw the ball in to the hoop you get 5 points ",100,400 ) 
    text("Press SPACE key to start ",100,600 ) 
    if(keyDown(DOWN_ARROW)){
      gameState="play"
    }
  }

  if(gameState==="play"){
    ball.velocity.y= ball.velocity.y+ gravity;
    ball.velocity.x= ball.velocity.x+0;
    ball.bounceOff(hoopSide1)
    ball.bounceOff(hoopSide2)
    /*if(frameCount%100===0){
      createplatform()
    }*/
    ball.bounce(backboard);

    if(keyDown("UP_ARROW")){
      powerup = powerup+0.1;
      powerup = constrain(powerup, 0, 20);
    }
    if ( keyWentUp(UP_ARROW) ){
      ball.velocityY = -jump - powerup;
      ball.velocityX = jump/2 + powerup/2;
    }

    if(ball.position.x > width +20){
      resetLevel()
    }

    if(ball.position.y > height +20){
      resetLevel()
    }
    if(ball.isTouching(hoopBottom)){
      score=score+1
    }
    

    ball.collide(platform)
    drawSprites(); 


    fill("red")
    textSize(60)
    text("Score :" + score, width/2,60)
  }
}



/*
function createplatform() {
  
  
  ball.x=platform.x
  ball.y=platform.y
  ball.collide(platform)

}*/


function mousePressed(){
  resetLevel();
}


function resetLevel(){
 var randX = random(0, 470);
  var randY = random(255, 600);
  
  platform.position.x = randX;
  platform.position.y = randY;
  
  ball.position.x = randX;
  ball.position.y = randY - 65;
  
  ball.velocity.x = 0;
  ball.velocity.y = 0;
  
  powerup = 0;
  

}