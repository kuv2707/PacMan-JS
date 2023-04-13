window.CELL_DIMENSION=30


import transf from "./transformManager.js"
window.transf=transf
import Pacman from "./PacMan.js"
import Ghost from "./ghosts.js"
import generateMap from  "./map.js"
import ScoreBoard from "./scoreBoard.js"

let field=document.querySelector(".field")
const map=generateMap(field)
let scoreboard=new ScoreBoard({
    "score":0,
    "lives":"😀😀😀"
})
let pacman=new Pacman(map,{x:1,y:1},scoreboard)
const ghosts=[]
for(let i=0;i<5;i++)
{
    let k=new Ghost(map,{x:15,y:8})
    field.append(k.htmltag)
    ghosts.push(k)
    k.startMoving()
}


field.append(pacman.htmltag)
document.body.addEventListener("keypress",(e)=>
{
    if(e.key==" ")
    pacman.startMoving()

},{once:true})


let k=setInterval(function()
{
    ghosts.forEach(g=>
        {
            //console.log(g.position, pacman.position)
            /**
             * the ghost has catched the pacman if:
             * they are at the same spot
             * last visited spot of ghost matches pacman's current spot, and their directions are in the same line
             */
            if(isSame(g.position,pacman.position) || (isSame(g.lastPos,pacman.position)  &&  dirParallelOrAntiparallel(pacman.dir,g.dir)))
            {
                console.log("match")
                pacman.stopMoving()
                setTimeout(()=>pacman.htmltag.scale(0),300)
                g.stopMoving()
                scoreboard.setParameter("lives",repeatStr("😀",scoreboard.getParameter("lives").length-1))
                clearInterval(k)
            }
        })
},200)

function isSame(v1,v2)
{
    return (Math.pow(v1.x-v2.x,2)+Math.pow(v1.y-v2.y,2))==0
}
function dirParallelOrAntiparallel(v1,v2)
{
    if(v1.x==v2.x && v1.y==v2.y)
    return true
    if(v1.x==-v2.x && v1.y==-v2.y)
    return true
    return false
}
function repeatStr(str,times)
{
    let ret=""
    while(times-->0)
    ret+=str
    return ret
}