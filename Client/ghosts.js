
let BLUEFACE
fetch("/api/game/ghostFace/blue").then(k=>k.json()).then((face)=>{
    BLUEFACE=face.ghostFace
})

export default class
{
    constructor(map, initpos)
    {
        this.map=map
        let htmlelem=document.createElement("div")
        htmlelem.className="ghost"
        fetch("/api/game/ghostFace/random").then(k=>k.json()).then((face)=>{
            this.baseFace=face.ghostFace
            htmlelem.innerHTML=this.baseFace
        })
        this.dead=false
        this.htmltag=htmlelem
        transf(htmlelem)
        htmlelem.scale(1.2)
        htmlelem.move(initpos.x*window.CELL_DIMENSION, initpos.y*window.CELL_DIMENSION)
        const este=this
        this.initpos=initpos
        this.position=initpos
        this.lastPos=initpos
        this.plannedDir=null
        this.dir={x:0,y:1}
        this.spd=200+Math.floor(500*Math.random())
        
        this.mover=function()
        {
            const alldirs=[vec(1,0),vec(0,1),vec(0,-1),vec(-1,0)]
            const choices=[]
            alldirs.forEach(dir=>
                {
                    if(este.inBounds(vecAdd(este.position,dir)))
                    {
                        choices.push(dir)
                    }
                })
            if(este.inBounds(vecAdd(este.position,este.dir)))
            {
                if(choices.length>2)
                este.dir=randElement(choices)
            }
            else
            {
                
                este.dir=randElement(choices)
                
                

            }
            este.lastPos={x:este.position.x,y:este.position.y}
            este.position.x+=este.dir.x
            este.position.y+=este.dir.y
            este.htmltag.move(window.CELL_DIMENSION*este.position.x,window.CELL_DIMENSION*este.position.y)
        }
    }
    startMoving(speed=this.spd)
    {
        this.stopMoving(this.movid)
        this.htmltag.style.transitionDuration=speed+"ms"
        this.movid=setInterval(this.mover,speed)
    }
    stopMoving()
    {
        clearInterval(this.movid)
    }
    inBounds(v)
    {
        return !(this.map[v.y][v.x].className=="wall")
    }
    panic()
    {
        this.panicking=true
        clearTimeout(this.plannedRelax)
        this.stopMoving()
        this.htmltag.innerHTML=BLUEFACE
        this.startMoving(0.5*this.spd)
        this.plannedRelax=setTimeout(()=>
        {
            this.stopMoving()
            this.startMoving(this.spd)
            this.htmltag.innerHTML=this.baseFace
            this.panicking=false
        },10000)
    }
    forceMove({x,y})
    {
        this.stopMoving()
        this.position.x=x
        this.position.y=y
        this.startMoving()
    }
    isPanicking()
    {
        return this.panicking
    }
    die()
    {
        console.log("dying")
        this.stopMoving()
        this.htmltag.remove()
        this.dead=true
    }
}
function vec(x,y)
{
    return {x,y}
}

    
function vecAdd(v1,v2)
{
    return {x:v1.x+v2.x,y:v1.y+v2.y}
}
function randElement(arr)
{
    return arr[Math.floor(arr.length*Math.random())]
}

