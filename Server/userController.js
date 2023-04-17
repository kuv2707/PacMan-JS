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
    let verdict,message
    let ind=Users.findIndex(k=>k.name==usrdat.name)
    if(usrdat.newusr==false )
    {
        if(ind>-1 && usrdat.password==Users[ind].password)
        {
            verdict=true
        }
        else
        {
            verdict=false
            message="No such user exists"
        }
    }
    else
    {
        
        if(ind == -1)
        {
            addUser(usrdat)
            verdict=true
        }
        else
        {
            verdict=false
            message="A user with this name already exists"
        }
    }
    res.status(200).json({
        verdict,message
    })
}
module.exports={sayHi,login}