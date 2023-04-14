//this file is sourced from one of my earlier projects:  https://github.com/kuv2707/spaceShoot


let msgdiv=document.createElement("div")
msgdiv.id="msgShower"

let head=document.createElement("h1")
head.id="msgHead"

let bdy=document.createElement("label")
bdy.id="msgBody"
window.makeTransformable(msgdiv)
msgdiv.append(head,bdy)
document.body.append(msgdiv)
msgdiv.style.width=35*30+"px"
export default {
    showMessage:function(msgHead,msgBdy)
    {
        head.innerHTML=msgHead
        bdy.innerHTML=msgBdy
        msgdiv.style.opacity="1"
    },
    clearMessage:function()
    {
        msgdiv.style.opacity="0"
    }
} 
window.addEventListener("resize",()=>
{
    msgdiv.move(window.innerWidth/2-msgdiv.clientWidth/2,window.innerHeight/2-msgdiv.clientHeight/2)
})

