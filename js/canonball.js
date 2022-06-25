class Canonball{
    constructor(x,y){
        var options={
            restitution:0.8,
            friction:1.0,
            density:1.0,
            isStatic:true
        }
        this.r=30
        this.body=Bodies.circle(x,y,this.r,options)
        World.add(world,this.body)
        this.image=loadImage("./assets/cannonball.png")
        this.trajectory=[]
        this.isSink=false 
        this.animation=[this.image]
        this.speed=0.05
    }
    display(){
        var angle=this.body.angle
        var pos=this.body.position
        var index=floor(this.speed%this.animation.length)
        push()
        translate(pos.x,pos.y)
        rotate (angle)
        imageMode (CENTER)
        image (this.animation[index],0,0,this.r,this.r)
        pop ()
        if(this.body.velocity.x>0&&this.body.position.x>300){
         var position=[pos.x,pos.y]
         this.trajectory.push(position)
        }
        for(var i=0;i<this.trajectory.length;i++){
         image(this.image,this.trajectory[i][0],this.trajectory[i][1],5,5)
        }
    }
    shoot(){
        Body.setStatic(this.body)
        var velocity=p5.Vector.fromAngle(canon.angle)
        velocity.mult(20)
        Body.setVelocity(this.body,{x:velocity.x,y:velocity.y})
        console.log(velocity)
    }
    remove(index){
     this.isSink=true
     Body.setVelocity(this.body,{x:0,y:0})
     this.animation=waterSplashAnimation
     this.speed=0.05
     this.r=150
     setTimeout(()=>{
         World.remove(world,this.body)
         delete balls[index]
     },1000)
    }
    animate(){
        this.speed+=0.05
    }
}