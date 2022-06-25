
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var balls=[]
let engine;
let world;
var boats=[]
var boatAnimation=[]
var brokenBoat=[]
var score=0
var tower;
var isGameOver=false
var isLaughing=false
var waterSplashAnimation=[]

function preload(){
  bg=loadImage("./assets/background.gif")
  boatSpritedata=loadJSON("./assets/boat/boat.json")
  boatSpritesheet=loadImage("./assets/boat/boat.png")
  brokenboatSpritedata=loadJSON("./assets/boat/broken_boat.json")
  brokenboatSpritesheet=loadImage("./assets/boat/broken_boat.png")
  bgmusic=loadSound("./assets/background_music.mp3")
  pirateLaugh=loadSound("./assets/pirate_laugh.mp3")
  explosion=loadSound("./assets/cannon_explosion.mp3")
  waterSplashSpritedata=loadJSON("./assets/water_splash/water_splash.json")
  waterSplashSpritesheet=loadImage("./assets/water_splash/water_splash.png")
  waterSplashSound=loadSound("./assets/cannon_water.mp3")
}

function setup() {
  createCanvas(1200,600);
  
  engine = Engine.create();
  world = engine.world;

  tower=new Tower(150,350,160,310)
  canon=new Canon(180,110,200,100,-PI/4)
  ground=new Ground(0,height-1,width*2,1)
  var boatFrames=boatSpritedata.frames
  for(var i=0;i<boatFrames.length;i++){
   var pos=boatFrames[i].position
   var img=boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
   boatAnimation.push(img)
  }
  var brokenboatFrames=brokenboatSpritedata.frames
  for(var i=0;i<brokenboatFrames.length;i++){
   var pos=brokenboatFrames[i].position
   var img=brokenboatSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
   brokenBoat.push(img)
  }
  var waterSplashFrames=waterSplashSpritedata.frames
  for(var i=0;i<waterSplashFrames.length;i++){
   var pos=waterSplashFrames[i].position
   var img=waterSplashSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
   waterSplashAnimation.push(img)
  }

  rectMode(CENTER);
  ellipseMode(RADIUS);

}

function draw() 
{
  background(51);
  image(bg,0,0,width,height)
  Engine.update(engine);
  if(!bgmusic.isPlaying()){
   bgmusic.play()
   bgmusic.setVolume(0.1)
  }
  
 for(var i=0;i<balls.length;i++){
  showCanonballs(balls[i],i)
  for(var j=0;j<boats.length;j++){
   if(balls[i]!==undefined&&boats[j]!==undefined){
    var collision=Matter.SAT.collides(balls[i].body,boats[j].body)
    if(collision.collided){
     if(!boats[j].isBroken&&!balls[i].isSink){
      score+=5
      boats[j].remove(j)
      j--
     }
     Matter.World.remove(world,balls[i].body)
     balls.splice(i,1)
     i--
    }
   }
  }
 }

 tower.display()
 canon.display()
 showBoats()
}

function showCanonballs(ball,index){
 if(ball){
  ball.display()
  ball.animate()
 if(ball.body.position.x>=width||ball.body.position.y>=height-50){
   waterSplashSound.play()
  ball.remove(index)
 }
 }

}

function keyReleased(){
  if(keyCode===DOWN_ARROW){
    explosion.play()
    balls[balls.length-1].shoot()
  }

}

function keyPressed(){
  if(keyCode===DOWN_ARROW){
   var canonball=new Canonball(canon.x,canon.y)
   balls.push(canonball)
  }
}
function showBoats(){
 if(boats.length>0){
  if(boats.length<4&&boats[boats.length-1].body.position.x<width-300){
   var positions=[-40,-60,-70,-20]
   var position=random(positions)
   var boat=new Boat(width,height-100,170,170,position,boatAnimation)

   boats.push(boat)
  }
  for(var i=0;i<boats.length;i++){
   Matter.Body.setVelocity(boats[i].body,{x:-1,y:0})
   boats[i].display()
   boats[i].animate()
   var collision=Matter.SAT.collides(tower.body,boats[i].body)
   if(collision.collided&&!boats[i].isBroken){
    isGameOver=true
    gameOver()
    if(!isLaughing&&!pirateLaugh.isPlaying()){
     pirateLaugh.play()
     isLaughing=true
    }
   }
  }
 }
 else{
  var boat=new Boat(width,height-60,170,170,-60,boatAnimation)
  boats.push(boat)
 }
}
function gameOver(){
  swal(
   {
     title:`GAME OVER`,
     text:"THANKS FOR PLAYING THE GAME",
     imageUrl:"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
     imageSize:"150x150",
     confirmButtonText:"PLAY AGAIN"
   },
   function(isConfirm){
     if(isConfirm){
      location.reload()
     }
   }
  )

}
