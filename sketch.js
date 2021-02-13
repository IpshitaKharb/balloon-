var database;
var balloon;
var bg;
var height;
  
function preload(){
  balloonImage=loadImage("images/Hot Air Ballon-02.png");
  bgImage=loadImage("images/Hot Air Ballon-01.png");
}
function setup() {
  createCanvas(2400,1000);

  database = firebase.database();

  bg=createSprite(1200,500);
  bg.addImage(bgImage);

  balloon=createSprite(400, 300, 50, 50);
  balloon.addImage(balloonImage);
  
  balloonPosition =database.ref('balloon');
  balloonPosition.on("value",readPosition,showError);

}

function draw() {
  background("black");

  createEdgeSprites();
  balloon.velocity.x=0
  balloon.velocity.y=0
  
  if (keyDown("LEFT_ARROW")){
    balloon.velocityX=-5;
  }
   if (keyDown("UP_ARROW")){
    balloon.velocityY=-5;
  }
   if (keyDown("DOWN_ARROW")){
    balloon.velocityY=5;
  }
   if (keyDown("RIGHT_ARROW")){
    balloon.velocityX=5;
  }
  
  drawSprites();

  updateHeight(0,0);
  
}

function updateHeight(x,y){
  // var height = balloon;
  database.ref('balloon/position').update({
   'x': balloon.x + x,
   'y': balloon.y + y
  })
}

function readPosition(data){
  height = data.val();
  balloon.x = height.position.x;
  balloon.y = height.position.y;
 }

function showError(){
  console.warning("# No errors");
}