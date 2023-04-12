import transf from "./transformManager.js"
const MOVTIME=250
export default class Ghost
{
    constructor(map,initpos)
    {
        this.map=map
        let htmlelem=document.createElement("div")
        htmlelem.className="pacman"
        htmlelem.innerText="🤡"//TODO: replace by image
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
            }
            if(este.inBounds(vecAdd(este.position,este.dir)))
            {
                este.position.x+=este.dir.x
                este.position.y+=este.dir.y
            }
            este.htmltag.move(window.CELL_DIMENSION*este.position.x,window.CELL_DIMENSION*este.position.y)
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
    startMoving()
    {
        this.movid=setInterval(this.mover,MOVTIME)
    }
    inBounds(v)
    {
        return !this.map[v.y][v.x]
    }
}

function vecAdd(v1,v2)
{
    return {x:v1.x+v2.x,y:v1.y+v2.y}
}