window.CELL_DIMENSION=30


import transf from "./transformManager.js"
window.transf=transf
import Pacman from "./PacMan.js"
import generateMap from  "./map.js"


let field=document.querySelector(".field")
const map=generateMap(field)
let g=new Pacman(map,{x:1,y:1})
field.append(g.htmltag)
document.body.addEventListener("keypress",(e)=>
{
    if(e.key==" ")
    g.startMoving()

},{once:true})
