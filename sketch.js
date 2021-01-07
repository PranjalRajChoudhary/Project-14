var fruit,sword;
var fruit1,fruit2,fruit3,fruit4;
var swordImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monster,monsterImg1,monsterImg2;
var fruitsGroup,enemyGroup;
var score = 0;
var gameOverImg,gameOver;

function preload(){
  swordImg = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImg1 = loadAnimation("alien1.png");
  gameOverImg = loadImage("gameover.png");
}
function setup(){
  createCanvas(600,400);
  
  sword = createSprite(300,200,20,20);
  sword.addImage("sword",swordImg);
  sword.scale = 0.8;
  
  fruitsGroup = new Group();
  enemyGroup = new Group();
  
  gameOver = createSprite(300,200,20,20);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.visible = false;
}
function draw(){
  background("pink");
  
  var edges = createEdgeSprites();
  sword.collide(edges);
  
  if(gameState === PLAY){
    fruits();
    
    monsters();
    
    sword.x = mouseX;
    sword.y = mouseY;
    
    if(fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
      score = score + 2;
  }
    if(enemyGroup.isTouching(sword)){
      enemyGroup.destroyEach();
      fruitsGroup.destroyEach();
      gameState = END;
    }
  }
  if(gameState === END){
    sword.destroy();
    
    gameOver.visible = true;
    
    fruitsGroup.setVelocityX = 0;
    enemyGroup.setVelocityX = 0;
    
  }
 drawSprites();
  
  stroke("red");
   text("score : " + score,500,10);
  
}
function fruits(){
  if(frameCount % 100 === 0){
  fruit = createSprite(50,100,20,20);
    
    fruit.scale = 0.2;
    
    fruit.velocityX = 2;
    
    var rando = Math.round(random(100,300));
    
    fruit.y = rando;
    
     fruitsGroup.add(fruit);
    
  var rand = Math.round(random(1,4));
    
    fruit.lifetime = 260;
    
  switch(rand){
    case 1 : fruit.addImage("fruit1",fruit1);
      break;
      case 2 : fruit.addImage("fruit2",fruit2);
      break;
      case 3 : fruit.addImage("fruit3",fruit3);
      break;
      case 4 : fruit.addImage("fruit4",fruit4);
      break;
      default : break;
  }
}
 
}
function monsters(){
  if(frameCount % 400 === 0){
   monster = createSprite(50,100,20,20)
  
    monster.lifetime = 250;
    
    monster.velocityX = 2;
    
    monster.addAnimation("monster1",monsterImg1);
    
    var rand = Math.round(random(100,300));
    
    monster.y = rand;
    
    enemyGroup.add(monster);
  }
}