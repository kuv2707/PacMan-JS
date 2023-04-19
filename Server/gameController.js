function getBoard(req,res)
{
    res.status(200).json({
        board:randBoard()
    })
}
function getGhostFace(req,res)
{
    let color
    if(req.params.color=="random")
    color="#"+Math.floor(500+Math.random()*(0xfff-500)).toString(16)
    else
    color=req.params.color
    res.status(200).json({
        ghostFace:face(color)
    })
}

module.exports={getBoard,getGhostFace}

const fs=require("fs")
const boardCoords=fs.readFileSync("boardCoords").toString()

function randBoard()
{
    return boardCoords
}


const ghostFace=fs.readFileSync("ghostFace").toString()


function face(color)
{
    return ghostFace.replace("FACECOLOR",color)
}

