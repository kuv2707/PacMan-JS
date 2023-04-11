const MAP_HEIGHT=30
const MAP_WIDTH=60
const BOARD=new Array(MAP_HEIGHT);
for(let i=0;i<BOARD.length;i++)
{
    BOARD[i]=new Array(MAP_WIDTH)
}


function generateMap(parentNode)
{
    for (let i = 0; i < MAP_HEIGHT; i ++)
    {
        let k = document.createElement("div")
        k.className = "wall"
        window.transf(k)
        k.move(0,i*20)
        BOARD[i][0]=k
        parentNode.append(k)
    }

    for (let i = 0; i < MAP_HEIGHT; i ++)
    {
        let k = document.createElement("div")
        k.className = "wall"
        window.transf(k)
        k.move((MAP_WIDTH-1)*20,i*20)
        BOARD[i][MAP_WIDTH-1]=k
        parentNode.append(k)
    }
    for (let i = 1; i < MAP_WIDTH; i++)
    {
        let k = document.createElement("div")
        k.className = "wall"
        window.transf(k)
        k.move(i*20,0)
        BOARD[0][i]=k
        parentNode.append(k)
    }
    for (let i = 1; i < MAP_WIDTH; i++)
    {
        let k = document.createElement("div")
        k.className = "wall"
        window.transf(k)
        k.move(i*20,20*(MAP_HEIGHT-1))
        BOARD[MAP_HEIGHT-1][i]=k
        parentNode.append(k)
    }
    return BOARD
}

export default generateMap