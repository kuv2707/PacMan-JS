const express=require("express")
const app=express()
app.use(express.static("./../Client"))

const userRouter=require("./userRouter")

app.use("/api/users",userRouter)

module.exports=app