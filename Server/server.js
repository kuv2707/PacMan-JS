const PORT=5800

const app=require("./app")

const server=app.listen(PORT,()=>
{
    console.log("Serving...")
})