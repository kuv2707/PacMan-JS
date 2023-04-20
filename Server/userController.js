const makeUser=require("./userModel")

let Users=[]
let fs=require("fs")
fs.readFile("./userdat.txt","utf-8",(err,data)=>
{
    Users=JSON.parse(data)
})
function updateDatabase()
{
    fs.writeFile("./userdat.txt",JSON.stringify(Users),(err)=>
    {
        if(err)
            console.log(err)
            else
            console.log("Written successfully")
    })
}
function addUser(usr)
{
    const USER=makeUser(usr)
    Users.push(USER)
    updateDatabase()
    return USER
}
function login(req,res)
{
    let usrdat=req.body
    let verdict,message
    let userid=-1
    let ind=Users.findIndex(k=>k.name==usrdat.name)
    if(ind>-1 && usrdat.password==Users[ind].password)
    {
        verdict=true
        userid=Users[ind].id
    }
    else
    {
        verdict=false
        message="No such user exists"
    }
    res.status(200).json({
        verdict,message,userid
    })
}
function signup(req,res)
{
    let usrdat=req.body
    let verdict,message,userid=-1
    let ind=Users.findIndex(k=>k.name==usrdat.name)
    if(ind == -1)
    {
        userid=addUser(usrdat).id
        verdict=true
    }
    else
    {
        verdict=false
        message="A user with this name already exists"
    }
    res.status(200).json({
        verdict,message,userid
    })
}
function gethiscore(req,res)
{
    let id=req.query.id
    let userid=Users.findIndex(u=>u.id==id)
    if(Users[userid])
    res.status(200).json({hiscore:Users[userid].hiscore||0})
    else
    res.status(404).end()
}

function updatehiscore(req,res)
{
    let id=req.query.id
    console.log(req.query)
    let userid=Users.findIndex(u=>u.id==id)
    console.log("User is",Users[userid])
    if(Users[userid])
    {
        Users[userid].hiscore=req.query.hiscore
        updateDatabase()
        res.status(200).end()
    }
    else
    res.status(404).end()
}

module.exports={login,signup,gethiscore,updatehiscore}