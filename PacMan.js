import transf from "./transformManager.js"
const MOVTIME=250
const nullobj={className:"null"}
export default class
{
    constructor(map,initpos,scoreBoard)
    {
        this.map=map
        let htmlelem=document.createElement("img")
        htmlelem.src="fitted.gif"
        htmlelem.className="pacman"
        // htmlelem.innerText="🤡"//TODO: replace by image
        this.htmltag=htmlelem
        transf(htmlelem)
        htmlelem.move(initpos.x*window.CELL_DIMENSION, initpos.y*window.CELL_DIMENSION)
        const este=this
        this.position=initpos
        this.plannedDir=null
        this.dir={x:1,y:0}
        this.mover=function()
        {
            if(este.plannedDir && este.inBounds(vecAdd(este.position,este.plannedDir)))
            {
                este.dir=este.plannedDir
                este.plannedDir=null
                este.htmltag.rotate(getDeg(este.dir))
            }
            if(este.inBounds(vecAdd(este.position,este.dir)))
            {
                este.position.x+=este.dir.x
                este.position.y+=este.dir.y
            }
            este.htmltag.move(window.CELL_DIMENSION*este.position.x,window.CELL_DIMENSION*este.position.y)
            
            setTimeout(()=>{
                let k=este.map[este.position.y][este.position.x]
                if(k  &&  k.className.includes("pellet"))
                {
                    k.remove()
                    if(k.className.includes("-bonus"))
                    {
                        window.Game.ghostPanic()
                    }
                    scoreBoard.setParameter("score",scoreBoard.getParameter("score")+k.points)
                    window.Game.reducePellet()
                }
                este.map[este.position.y][este.position.x]=nullobj
                
            },100)
        }
        document.body.addEventListener("keydown",(e)=>//arrow keys are not detected on keypress
        {
            //console.log("key:",e.key)
            switch(e.key)
            {
                case "ArrowRight":
                {
                    este.plannedDir={x:1,y:0}
                    break;
                }
                case "ArrowLeft":
                {
                    este.plannedDir={x:-1,y:0}
                    break;
                }
                case "ArrowUp":
                {
                    este.plannedDir={x:0,y:-1}
                    break;
                }
                case "ArrowDown":
                {
                    este.plannedDir={x:0,y:1}
                    break;
                }
            }
        })
    }
    forceMove({x,y})
    {
        this.position.x=x
        this.position.y=y
        this.htmltag.move(window.CELL_DIMENSION*this.position.x,window.CELL_DIMENSION*this.position.y)
    }
    startMoving()
    {
        this.movid=setInterval(this.mover,MOVTIME)
    }
    stopMoving()
    {
        clearInterval(this.movid)
    }
    inBounds(v)
    {
        return !(this.map[v.y][v.x].className=="wall")
    }
}

function vecAdd(v1,v2)
{
    return {x:v1.x+v2.x,y:v1.y+v2.y}
}
function getDeg({x,y})
{
    if(x==1 && y==0)
    return 0
    if(x==-1 && y==0)
    return 180
    if(x==0 && y==1)
    return 90
    if(x==0 && y==-1)
    return -90

}