window.CELL_DIMENSION=30


import transf from "./transformManager.js"
window.transf=transf
import Pacman from "./PacMan.js"
import generateMap from  "./map.js"
let field=document.createElement("div")
field.className="field"
document.body.append(field)

const map=generateMap(field)
let g=new Pacman(map,{x:2,y:2})
field.append(g.htmltag)
document.body.addEventListener("keypress",(e)=>
{
    if(e.key==" ")
    g.startMoving()

},{once:true})

map.forEach(pix=>
{
    let wall=document.createElement("div")
    wall.className="wall"
    field.append(wall)
    transf(wall)
    wall.move(pix.x,pix.y);

})