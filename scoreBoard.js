export default class 
{
    /**
     * shows:
     * score
     * lives
     */
    constructor(parameters)
    {
        let score=document.querySelector(".score")
        this.params=parameters
        this.board=score
        this.update()

    }
    setParameter(name,val)
    {
        this.params[name]=val;

        this.update()
    }
    getParameter(name)
    {
        return this.params[name]
    }
    update()
    {
        this.board.innerText=""
        for(let key of Object.keys(this.params))
        {
            this.board.innerText+=`  ${key}: ${this.params[key]}`
        }
    }
}