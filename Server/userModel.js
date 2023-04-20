function makeUser(obj)
{
    return new User(obj.name,obj.password)
}
class User
{
    constructor(nam,pwd,hi=0)
    {
        this.name=nam.trim()
        this.password=pwd
        this.hiscore=hi
        this.id=Date.now()
    }
}
module.exports=makeUser