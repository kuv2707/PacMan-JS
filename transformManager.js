export default function addTransformManager(go)
{
    go.scaleVal={x:1,y:1};
    go.rotateVal=0;
    go.translateCoords={x:0,y:0};
    go.updateAppearance=function()
    {
        this.style.transform=
        `translate(${this.translateCoords.x}px,${this.translateCoords.y}px)
        scale(${this.scaleVal.x},${this.scaleVal.y})
        rotate(${this.rotateVal}deg)`;
    }
    go.rotate=function(value)
    {
        let newr=(this.rotateVal+value)%360
        this.rotateVal=newr
        this.updateAppearance();
       
    }
    go.scale=function(valueX,valueY)
    {
        if(valueY==undefined)
        valueY=valueX;
        if(this.scaleVal.x==valueX&&this.scaleVal.y==valueY)
        return;
        this.scaleVal={x:valueX,y:valueY};
        this.updateAppearance();
    }
    go.move=function(xx,yy)
    {
        this.translateCoords.x=xx;
        this.translateCoords.y=yy;
        this.updateAppearance();
    }
    go.moveRight=function(by)
    {
        this.translateCoords.x+=by
        this.updateAppearance();
    }
    
}
window.makeTransformable=addTransformManager