const MAP_HEIGHT=30
const MAP_WIDTH=60
const BOARD=new Array(MAP_HEIGHT);
for(let i=0;i<BOARD.length;i++)
{
    BOARD[i]=new Array(MAP_WIDTH)
}
function generateMap(parentNode)
{
    const addWallAt=function(x,y)
    {
        let k = document.createElement("div")
        k.className = "wall"
        window.transf(k)
        k.move(y*20,x*20)
        BOARD[x][y]=k
        parentNode.append(k)
    }
    for (let i = 0; i < MAP_HEIGHT; i ++)
    {
        addWallAt(i,0)
    }

    for (let i = 0; i < MAP_HEIGHT; i ++)
    {
        addWallAt(i,MAP_WIDTH-1)
    }
    for (let i = 1; i < MAP_WIDTH; i++)
    {
        addWallAt(0,i)
    }
    for (let i = 1; i < MAP_WIDTH; i++)
    {
        addWallAt(MAP_HEIGHT-1,i)
    }


    addWallAt(5,5)
    addWallAt(5,6)
    addWallAt(5,7)


    return BOARD
}




export default generateMap