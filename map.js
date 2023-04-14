const MAP_HEIGHT=20
const MAP_WIDTH=35
const BOARD=new Array(MAP_HEIGHT);
for(let i=0;i<BOARD.length;i++)
{
    BOARD[i]=new Array(MAP_WIDTH)
}
function generateMap(parentNode)
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
    // for (let i = 0; i < MAP_HEIGHT; i ++)
    // {
    //     addAt(i,0,"wall")
    // }
    // for (let i = 0; i < MAP_HEIGHT; i ++)
    // {
    //     addAt(i,MAP_WIDTH-1,"wall")
    // }
    // for (let i = 1; i < MAP_WIDTH; i++)
    // {
    //     addAt(0,i,"wall")
    // }
    // for (let i = 1; i < MAP_WIDTH; i++)
    // {
    //     addAt(MAP_HEIGHT-1,i,"wall")
    // }


    //sourced from mapMaker.html
    let s=` 0 0 0 1 0 2 0 3 0 4 0 5 0 6 0 7 0 8 0 9 0 10 0 11 0 12 0 13 0 14 0 15 0 16 0 17 0 18 0 19 11 9 2 19 4 19 5 19 6 19 7 19 8 19 9 19 10 19 11 19 12 19 13 19 14 19 15 19 16 19 17 19 18 19 19 19 20 19 21 19 22 19 23 19 24 19 25 19 26 19 27 19 28 19 29 19 30 19 31 19 32 19 33 19 34 19 34 18 34 17 34 16 34 15 34 14 34 13 34 12 34 11 34 10 34 9 34 8 34 7 34 6 34 5 34 4 34 3 34 2 34 1 34 0 33 0 32 0 31 0 30 0 29 0 28 0 27 0 26 0 24 0 23 0 22 0 25 0 2 10 20 0 19 0 18 0 17 0 16 0 15 0 14 0 13 0 12 0 11 0 10 0 9 0 8 0 7 0 6 0 5 0 4 0 3 0 2 0 1 0 2 2 2 3 2 4 2 5 2 6 2 7 2 8 2 9 2 11 21 2 2 13 2 17 3 3 3 7 3 11 31 5 5 2 5 3 5 4 5 5 5 6 5 7 5 8 5 9 5 10 5 11 5 12 5 13 5 14 5 15 5 16 5 17 4 5 4 9 4 13 4 17 6 2 7 2 8 2 9 2 10 2 11 2 12 2 13 2 14 2 14 3 14 4 14 5 14 6 14 7 14 8 14 9 13 9 12 9 10 9 9 9 8 9 7 9 7 8 7 7 7 6 7 5 7 4 8 4 9 4 10 4 11 4 12 4 12 5 12 6 12 7 11 7 10 7 9 7 9 6 10 6 14 10 14 11 14 12 14 13 14 14 15 12 16 12 17 12 7 11 7 12 8 12 9 12 9 13 9 14 9 15 11 11 12 11 12 12 12 13 12 14 12 15 12 16 12 17 16 17 17 17 18 17 19 17 19 16 19 15 19 14 19 13 19 12 19 11 19 10 19 9 19 8 20 8 21 8 22 8 23 8 24 8 25 8 25 7 25 6 25 5 25 4 25 3 25 2 24 2 23 2 22 2 20 2 19 2 19 3 19 4 19 6 20 6 19 5 21 6 22 6 23 6 23 5 23 4 21 10 21 11 21 12 21 13 21 14 21 15 21 16 21 17 22 17 23 17 24 17 25 17 26 17 27 17 28 17 29 17 29 14 28 14 27 14 26 14 25 14 24 14 24 12 25 12 26 12 27 12 28 12 29 12 31 12 31 11 31 10 31 9 31 8 31 7 31 6 31 4 31 3 30 3 29 3 28 3 27 3 27 4 27 5 27 6 28 7 28 8 28 9 29 9 29 6 29 5 28 6 23 14 23 15 29 11 24 11 24 10 30 14 31 14 31 15 31 16 31 17 32 12 32 17`
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