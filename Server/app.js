const express=require("express")
const app=express()
app.use(express.static("./../Client"))
app.use(express.json());

const userRouter=require("./userRouter")
const gameRouter=require("./gameRouter")

app.use("/api/users",userRouter)
app.use("/api/game",gameRouter)

module.exports=app