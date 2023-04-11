import transf from "./transformManager.js"
export default class Ghost
{
    constructor(map,initpos)
    {
        this.map=map
        let htmlelem=document.createElement("div")
        htmlelem.className="pacman"
        this.htmltag=htmlelem
        transf(htmlelem)
        htmlelem.move(initpos.x*20, initpos.y*20)
        const este=this
        this.position=initpos
        this.dir={x:1,y:0}
        this.mover=function()
        {
            este.htmltag.move(20*este.position.x,20*este.position.y)
            if(este.inBounds(vecAdd(este.position,este.dir)))
            {
                este.position.x+=este.dir.x
                este.position.y+=este.dir.y
            }
        }
        document.body.addEventListener("keydown",(e)=>//arrow keys are not detected on keypress
        {
            //console.log("key:",e.key)
            switch(e.key)
            {
                case "ArrowRight":
                {
                    este.dir.x=1
                    este.dir.y=0
                    break;
                }
                case "ArrowLeft":
                {
                    este.dir.x=-1
                    este.dir.y=0
                    break;
                }
                case "ArrowUp":
                {
                    este.dir.x=0
                    este.dir.y=-1
                    break;
                }
                case "ArrowDown":
                {
                    este.dir.x=0
                    este.dir.y=1
                    break;
                }
            }
        })
    }
    startMoving()
    {
        this.movid=setInterval(this.mover,100)
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