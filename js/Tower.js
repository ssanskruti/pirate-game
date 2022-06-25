class Tower{
    constructor(x,y,w,h){
        var options={
            isStatic:true
        }
        this.width=w
        this.height=h
        this.body=Bodies.rectangle(x,y,this.width,this.height,options)
        World.add(world,this.body)
        this.image=loadImage("./assets/tower.png")
    }
    display(){
        var pos=this.body.position
        push()
        translate(pos.x,pos.y)
        imageMode(CENTER)
        image(this.image,0,0,this.width,this.height)
        pop()
    }
}
