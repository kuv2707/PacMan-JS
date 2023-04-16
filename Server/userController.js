function sayHi(req,res,next)//for testing only
{
    res.status(200).json({
        message:"Hello!!"
    })
}

let Users=[]
let fs=require("fs")
fs.readFile("./userdat.txt","utf-8",(err,data)=>
{
    Users=JSON.parse(data)
})

function userExists({name,password})
{
    return Users.find(k=>k.name==name&&k.password==password)>-1
}
function addUser(usr)
{
    Users.push(usr)
    fs.writeFile("./userdat.txt",JSON.stringify(Users),(err)=>
    {
        if(err)
            console.log(err)
            else
            console.log("Written successfully")
    })
}
function login(req,res)
{
    let usrdat=req.body
    let verdict
    if(usrdat.newusr==false )
    {
        if(userExists(usrdat))
        {
            
            verdict=true
        }
        else
        {
            verdict=false
        }
    }
    else
    {
        addUser(usrdat)
        verdict=true
    }
    res.status(200).json({
        verdict
    })
}
module.exports={sayHi,login}