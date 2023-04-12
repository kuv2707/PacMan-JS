export default function addTransformManager(element)
{
    element.scaleVal={x:1,y:1};
    element.rotateVal=0;
    element.translateCoords={x:0,y:0};
    element.updateAppearance=function()
    {
        this.style.transform=
        `translate(${this.translateCoords.x}px,${this.translateCoords.y}px)
        scale(${this.scaleVal.x},${this.scaleVal.y})
        rotate(${this.rotateVal}deg)`;
    }
    element.rotate=function(value)
    {
        let newr=(this.rotateVal+value)%360
        this.rotateVal=newr
        this.updateAppearance();
       
    }
    element.scale=function(valueX,valueY)
    {
        if(valueY==undefined)
        valueY=valueX;
        if(this.scaleVal.x==valueX&&this.scaleVal.y==valueY)
        return;
        this.scaleVal={x:valueX,y:valueY};
        this.updateAppearance();
    }
    element.move=function(xx,yy)
    {
        this.translateCoords.x=xx;
        this.translateCoords.y=yy;
        this.updateAppearance();
    }
}
window.makeTransformable=addTransformManager