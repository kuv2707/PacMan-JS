window.CELL_DIMENSION=30

import transf from "./transformManager.js"
window.transf=transf
import Pacman from "./PacMan.js"
import Ghost from "./ghosts.js"
import generateMap from  "./map.js"
import ScoreBoard from "./scoreBoard.js"
import messageShower from "./messageShower.js"



let field=document.createElement("div")
field.className="field"
const map= await generateMap(field)
const hiscr=await fetch("/api/users/hiscore?id="+USERID).then(k=>k.json())
let hiscore=hiscr.hiscore
let scoreboard=new ScoreBoard({
    score:{ value:0},
    lives:{ value:"😃😃😃"},
    Hi:{value:hiscore}
})
let pacman=new Pacman(map,{x:1,y:1},scoreboard)
const ghosts=[]
for(let i=0;i<8;i++)
{
    let k=new Ghost(map,{x:18,y:5})
    field.append(k.htmltag)
    ghosts.push(k)
    
}

field.append(pacman.htmltag)
function addStartTriggerListener()
{
    document.body.addEventListener("keypress",(e)=>
    {
        if(e.key!=" ")
        return
        setTimeout(()=>pacman.htmltag.scale(1),500)
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
        updateHiScore()
    }
}}

window.playAudio=function(file)
{
    let k=new Audio("./Resources/Audio/pacman_"+file+".wav")
    k.play()
}


messageShower.showMessage("Ready?",`Hit <u>space</u> to start!`)
document.body.append(field)

addStartTriggerListener()
window.playAudio("beginning")
document.body.style.backgroundImage="linear-gradient(black,black)"

//inspector function
setInterval(function()
    {
        if(window.Game.inProgress==false) return
        for(let i=0;i<ghosts.length;i++)
            {
                let g=ghosts[i]
                /**
                 * the ghost has catched the pacman if:
                 * they are at the same spot
                 * last visited spot of ghost matches pacman's current spot, and their directions are in the same line
                 */
                if(isSame(g.position,pacman.position) || (isSame(g.lastPos,pacman.position)  &&  dirParallelOrAntiparallel(pacman.dir,g.dir)))
                {
                    if(g.isPanicking())
                    {
                        g.htmltag.scale(0)
                        setTimeout(()=>g.htmltag.scale(1),1000)
                        g.forceMove({x:18,y:5})
                        window.playAudio("eatghost")
                    }
                    else
                    {
                        pacman.stopMoving()
                        setTimeout(()=>pacman.htmltag.scale(0),100)
                        g.stopMoving()
                        scoreboard.setParameter("lives",scoreboard.getParameter("lives").substring(2))
                        scoreboard.setParameter("score",scoreboard.getParameter("score")-30)
                        window.Game.inProgress=false
                        window.playAudio("death")
                        if(scoreboard.getParameter("lives")==0)
                        {
                            messageShower.showMessage("You LOST!","I mean.. seriously?")
                            updateHiScore()
                            document.addEventListener("keypress",(e)=>
                            {
                                if(e.key==" ")
                                window.location.reload()
                            })
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
    hiscore=Math.max(hiscore,scoreboard.getParameter("score"))
    
    fetch("/api/users/hiscore?id="+USERID+"&hiscore="+hiscore,{
        method:"PATCH"
    })
}