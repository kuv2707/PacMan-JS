export default class 
{
    /**
     * shows:
     * score
     * lives
     */
    constructor(parameters)
    {
        let score=document.querySelector(".scoreBoard")
        this.params=parameters
        this.board=score
        let len=Object.keys(parameters).length
        score.style.gridTemplateColumns=`repeat(${len},${100/len}%)`
        for(let i of Object.keys(this.params))
            {
                let param=this.params[i]
                console.log(i)
                param.key=i
                let dis=document.createElement("label")
                dis.className="scoreBoard__label"
                score.append(dis)
                param.display=dis
                this.update(param)
            }
    }
    setParameter(name,val)
    {
        this.params[name].value=val
        this.update(this.params[name])
    }
    getParameter(name)
    {
        return this.params[name].value
    }
    update(ob)
    {
        ob.display.innerText=`${ob.key}: ${ob.value}`
    }
}