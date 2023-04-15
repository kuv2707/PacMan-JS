function sayHi(req,res,next)//for testing only
{
    res.status(200).json({
        message:"Hello!!"
    })
}


function login(req,res)
{
    let verdict=req.body.name!=null//temporarily
    console.log(req.body)
    res.status(200).json({
        verdict:true
    })
}
module.exports={sayHi,login}