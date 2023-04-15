const express=require("express")
const router=express.Router()
const userController= require("./userController")

router.route("/sayHi").get(userController.sayHi)

module.exports=router