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

    let s=` 0 0 1 0 2 0 3 0 4 0 5 0 6 0 7 0 8 0 9 0 10 0 11 0 12 0 13 0 14 0 15 0 16 0 17 0 18 0 19 0 20 0 21 0 22 0 23 0 24 0 25 0 26 0 27 0 28 0 29 0 30 0 31 0 32 0 33 0 34 0 0 1 10 1 11 1 12 1 13 1 14 1 15 1 16 1 17 1 18 1 19 1 20 1 21 1 22 1 23 1 34 1 0 2 2 2 4 2 5 2 6 2 7 2 8 2 25 2 26 2 27 2 28 2 29 2 30 2 32 2 34 2 0 3 2 3 4 3 8 3 10 3 16 3 17 3 18 3 23 3 25 3 30 3 32 3 34 3 0 4 2 4 4 4 6 4 8 4 10 4 16 4 17 4 18 4 22 4 23 4 25 4 27 4 28 4 30 4 32 4 34 4 0 5 2 5 4 5 6 5 8 5 10 5 11 5 12 5 14 5 15 5 16 5 17 5 18 5 22 5 25 5 27 5 30 5 32 5 34 5 0 6 2 6 4 6 5 6 6 6 8 6 10 6 12 6 14 6 18 6 22 6 25 6 27 6 28 6 29 6 30 6 32 6 34 6 0 7 2 7 8 7 10 7 14 7 18 7 20 7 21 7 22 7 23 7 25 7 32 7 34 7 0 8 2 8 3 8 4 8 5 8 6 8 7 8 8 8 10 8 11 8 12 8 13 8 14 8 16 8 17 8 18 8 20 8 21 8 22 8 23 8 25 8 26 8 27 8 28 8 29 8 30 8 31 8 32 8 34 8 0 9 34 9 0 10 1 10 2 10 3 10 4 10 5 10 6 10 7 10 8 10 10 10 11 10 12 10 13 10 14 10 15 10 16 10 17 10 18 10 19 10 20 10 21 10 22 10 23 10 24 10 25 10 26 10 27 10 28 10 29 10 30 10 31 10 33 10 34 10 0 11 31 11 34 11 0 12 2 12 3 12 4 12 5 12 6 12 7 12 8 12 9 12 10 12 11 12 12 12 13 12 14 12 15 12 16 12 18 12 19 12 20 12 21 12 22 12 23 12 24 12 25 12 26 12 27 12 29 12 30 12 31 12 32 12 34 12 0 13 34 13 0 14 1 14 2 14 3 14 4 14 5 14 6 14 7 14 8 14 9 14 10 14 11 14 12 14 13 14 14 14 15 14 26 14 27 14 28 14 29 14 30 14 31 14 32 14 33 14 34 14 0 15 34 15 0 16 2 16 4 16 5 16 6 16 7 16 8 16 9 16 10 16 11 16 17 16 18 16 19 16 20 16 21 16 22 16 23 16 30 16 31 16 32 16 34 16 0 17 2 17 3 17 4 17 11 17 12 17 13 17 14 17 15 17 16 17 17 17 23 17 24 17 25 17 26 17 27 17 28 17 29 17 30 17 32 17 34 17 0 18 32 18 34 18 0 19 1 19 2 19 3 19 4 19 5 19 6 19 7 19 8 19 9 19 10 19 11 19 12 19 13 19 14 19 15 19 16 19 17 19 18 19 19 19 20 19 21 19 22 19 23 19 24 19 25 19 26 19 27 19 28 19 29 19 30 19 31 19 32 19 33 19 34 19`
    let entries=s.split(" ")
    while(entries.length>2)
    addAt(entries.pop(),entries.pop(),"wall")


    for(let i=0;i<BOARD.length;i++)
    {
        for(let j=0;j<BOARD[0].length;j++)
        {
            if(!BOARD[i][j])
            {
                //add pellet here
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