const PORT=5500

const app=require("./app")

const server=app.listen(PORT,()=>
{
    console.log(`Serving at: localhost:${PORT}`)
})