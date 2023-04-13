window.CELL_DIMENSION=30


import transf from "./transformManager.js"
window.transf=transf
import Pacman from "./PacMan.js"
import Ghost from "./ghosts.js"
import generateMap from  "./map.js"


let field=document.querySelector(".field")
const map=generateMap(field)
let g=new Pacman(map,{x:1,y:1})
const ghosts=[]
for(let i=0;i<5;i++)
{
    let k=new Ghost(map,{x:1,y:7})
    field.append(k.htmltag)
    ghosts.push(k)
    k.startMoving()
}
field.append(g.htmltag)
document.body.addEventListener("keypress",(e)=>
{
    if(e.key==" ")
    g.startMoving()

},{once:true})
