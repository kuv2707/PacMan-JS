const MAP_HEIGHT=20
const MAP_WIDTH=35
const BOARD=new Array(MAP_HEIGHT);
for(let i=0;i<BOARD.length;i++)
{
    BOARD[i]=new Array(MAP_WIDTH)
}
async function generateMap(parentNode)
{
    const addAt=function(x,y,type)
    {
        let k = document.createElement("div")
        k.className = type
        window.transf(k)
        k.move(y*window.CELL_DIMENSION,x*window.CELL_DIMENSION)
        BOARD[x][y]=k
        parentNode.append(k)
        return k
    }
    //sourced from mapMaker.html
    let s=await fetch("/api/game/board")
    s=await s.json()
    s=s.board
    let entries=s.split(" ")
    while(entries.length>2)
    addAt(entries.pop(),entries.pop(),"wall")
    addAt(0,21,"wall")
    addAt(19,1,"wall")
    addAt(19,3,"wall")

    BOARD.pelletCount=0
    for(let i=0;i<BOARD.length;i++)
    {
        for(let j=0;j<BOARD[0].length;j++)
        {
            if(!BOARD[i][j])
            {
                //add pellet here
                BOARD.pelletCount++
                let k
                if(Math.random()<0.02)
                {
                    k=addAt(i,j,"pellet pellet-bonus")
                    k.points=8
                }
                else
                {
                    k=addAt(i,j,"pellet")
                    k.points=1
                }

            }
        }
    }
    return BOARD
}




export default generateMap