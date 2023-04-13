export default class
{
    constructor(map, initpos)
    {
        this.map=map
        let htmlelem=document.createElement("img")
        //htmlelem.innerText="👿"
        htmlelem.src="ghost.svg"
        let randcol=Math.floor(Math.random()*0xfff).toString(16)



        //image credit: Monster by April Yang from <a href="https://thenounproject.com/browse/icons/term/monster/" target="_blank" title="Monster Icons">Noun Project</a>
        htmlelem.className="ghost"
        // htmlelem.innerText="🤡"//TODO: replace by image
        this.htmltag=htmlelem
        transf(htmlelem)
        htmlelem.move(initpos.x*window.CELL_DIMENSION, initpos.y*window.CELL_DIMENSION)
        const este=this
        this.position=initpos
        this.plannedDir=null
        this.dir={x:0,y:1}
        this.spd=200+Math.floor(500*Math.random())
        htmlelem.style.transitionDuration=this.spd+"ms"
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
            este.position.x+=este.dir.x
                este.position.y+=este.dir.y
            este.htmltag.move(window.CELL_DIMENSION*este.position.x,window.CELL_DIMENSION*este.position.y)
        }
    }
    startMoving()
    {
        this.movid=setInterval(this.mover,this.spd)
    }
    inBounds(v)
    {
        return !(this.map[v.y][v.x].className=="wall")
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