class Canon{
    constructor(x,y,w,h,angle){
        this.x=x
        this.y=y
        this.width=w
        this.height=h
        this.angle=angle
        this.image=loadImage("./assets/CANON.png")
        this.base=loadImage("./assets/cannon_base.png")
    }
    display(){
        if(keyIsDown(RIGHT_ARROW)&&this.angle<0.35){
            this.angle+=0.02
        }
        if(keyIsDown(LEFT_ARROW)&&this.angle>-1.45){
            this.angle-=0.02
        }
         fill("#676e6a")
         push()
         translate (this.x,this.y)
         rotate (this.angle)
         image(this.image,-110,-50,this.width,this.height)
         
         pop()
         image (this.base,50,20,230,200,PI,TWO_PI)
    }
}