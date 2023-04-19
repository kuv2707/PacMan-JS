function makeUser(obj)
{
    return new User(obj.name,obj.password)
}
class User
{
    constructor(nam,pwd)
    {
        this.name=nam.trim()
        this.password=pwd
    }
}
module.exports=makeUser