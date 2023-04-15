window.CELL_DIMENSION=30

import transf from "./transformManager.js"
window.transf=transf
import Pacman from "./PacMan.js"
import Ghost from "./ghosts.js"
import generateMap from  "./map.js"
import ScoreBoard from "./scoreBoard.js"
import messageShower from "./messageShower.js"
import scoreBoard from "./scoreBoard.js"


let field=document.createElement("div")
field.className="field"
const map=generateMap(field)
let scoreboard=new ScoreBoard({
    score:{ value:0},
    lives:{ value:"😃😃😃"},
    Hi:{value:window.localStorage.getItem("Hi")??0}
})
let pacman=new Pacman(map,{x:1,y:1},scoreboard)
const ghosts=[]
for(let i=0;i<5;i++)
{
    let k=new Ghost(map,{x:15,y:8})
    field.append(k.htmltag)
    ghosts.push(k)
    
}

field.append(pacman.htmltag)
function addStartTriggerListener()
{
    document.body.addEventListener("keypress",(e)=>
    {
        pacman.htmltag.scale(1)
        pacman.forceMove({x:1,y:1})
        if(e.key==" ")
        pacman.startMoving()
        ghosts.forEach(k=>k.startMoving())
        messageShower.clearMessage()
        window.Game.inProgress=true
    },{once:true})
}

window.Game={ghosts,pacman,scoreboard,ghostPanic:function()
{
    ghosts.forEach(g=>g.panic())
},inProgress:false,
reducePellet: function()
{
    map.pelletCount--;
    if(map.pelletCount==0)
    {
        window.Game.inProgress=false
        pacman.stopMoving()
        ghosts.forEach(g=>g.stopMoving())
        messageShower.showMessage("You WON!","Didn't really expect that, did ya?")
    }
}}
messageShower.showMessage("Ready?",`Hit <u>space</u> to start!`)
document.body.append(field)

addStartTriggerListener()

//inspector function
setInterval(function()
    {
        if(window.Game.inProgress==false) return
        for(let i=0;i<ghosts.length;i++)
            {
                let g=ghosts[i]
                if(g.dead)
                continue//should not be required!!!
                /**
                 * the ghost has catched the pacman if:
                 * they are at the same spot
                 * last visited spot of ghost matches pacman's current spot, and their directions are in the same line
                 */
                if(isSame(g.position,pacman.position) || (isSame(g.lastPos,pacman.position)  &&  dirParallelOrAntiparallel(pacman.dir,g.dir)))
                {
                    if(g.isPanicking())
                    {
                        delete ghosts[ghosts.find(k=>k==g)]
                        g.die()
                    }
                    else
                    {
                        pacman.stopMoving()
                        setTimeout(()=>pacman.htmltag.scale(0),300)
                        g.stopMoving()
                        scoreboard.setParameter("lives",scoreboard.getParameter("lives").substring(2))
                        scoreboard.setParameter("score",scoreboard.getParameter("score")-30)
                        window.Game.inProgress=false
                        if(scoreboard.getParameter("lives")==0)
                        {
                            messageShower.showMessage("You LOST!","loser loser loser!")
                            updateHiScore()
                        }
                        else
                        {
                            messageShower.showMessage("Dead!","Hit <u>space</u> to respawn")
                            addStartTriggerListener()
                        }

                    }
                    break
                }
            }
    },200)




//utility methods
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

function updateHiScore()
{
    window.localStorage.setItem("Hi",Math.max(window.localStorage.getItem("Hi")),scoreboard.getParameter("score"))
}

window.dispatchEvent(new Event("resize"))//for messageShower