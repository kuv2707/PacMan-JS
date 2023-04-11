import transf from "./transformManager.js"
export default class Ghost
{
    constructor(field,initpos)
    {
        this.field=field
        let htmlelem=document.createElement("div")
        htmlelem.className="ghost"
        this.htmltag=htmlelem
        transf(htmlelem)
        htmlelem.move(initpos.x, initpos.y)
        const este=this
        this.mover=function()
        {
            este.htmltag.moveRight(20)
        }
    }
    startMoving()
    {
        this.movid=setInterval(this.mover,100)
    }
    
}