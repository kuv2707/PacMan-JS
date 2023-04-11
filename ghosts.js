import transf from "./transformManager.js"
export default class Ghost
{
    constructor(map,initpos)
    {
        this.map=map
        let htmlelem=document.createElement("div")
        htmlelem.className="ghost"
        this.htmltag=htmlelem
        transf(htmlelem)
        htmlelem.move(initpos.x, initpos.y)
        const este=this
        this.position={x:2,y:2}
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