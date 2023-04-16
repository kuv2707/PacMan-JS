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
    
    
    let s
    try
    {
        s=(await fetch("/api/game/board").then(s=>s.json())).board
        let entries=s.split(" ")
        while(entries.length>2)
        addAt(entries.pop(),entries.pop(),"wall")
        addAt(0,21,"wall")
        addAt(19,1,"wall")
        addAt(19,3,"wall")

    }
    catch(err)//fallback option: for github pages
    {
        for (let i = 0; i < MAP_HEIGHT; i ++)
        {
            addAt(i,0,"wall")
        }
        for (let i = 0; i < MAP_HEIGHT; i ++)
        {
            addAt(i,MAP_WIDTH-1,"wall")
        }
        for (let i = 1; i < MAP_WIDTH; i++)
        {
            addAt(0,i,"wall")
        }
        for (let i = 1; i < MAP_WIDTH; i++)
        {
            addAt(MAP_HEIGHT-1,i,"wall")
        }
    }





    BOARD.pelletCount=0
    for(let i=0;i<BOARD.length;i++)
    {
        for(let j=0;j<BOARD[0].length;j++)
        {
            if(i==1 && j==1)
            addAt(i,j,"null");//pacman's position
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