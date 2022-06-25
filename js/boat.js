class Boat{
    constructor(x,y,w,h,boatPos,boatAnimation){
        var options={
            restitution:0.8,
            friction:1,
            density:1
        }
        this.body=Bodies.rectangle(x,y,w,h,options)
        this.width=w
        this.height=h
        this.animation=boatAnimation
        this.speed=0.05
        this.boatPosition=boatPos
        World.add(world,this.body)
        this.image=loadImage("assets/boat.png")
        this.isBroken=false
    }
    display(){
        var angle=this.body.angle
        var pos=this.body.position
        var index=floor(this.speed%this.animation.length)
        push()
        translate (pos.x,pos.y)
        rotate(angle)
        imageMode (CENTER)
        image (this.animation[index],0,this.boatPosition,this.width,this.height)
        pop ()

    }
    animate(){
        this.speed+=0.05%1.1
    }
    remove(index){
     this.animation=brokenBoat
     this.speed=0.05
     this.width=300
     this.height=300
     this.isBroken=true
     setTimeout(()=>{
         World.remove(world,boats[index].body)
         boats.splice(index,1)
     },2000)
    }
}