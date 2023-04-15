const express=require("express")
const router=express.Router()
const userController= require("./userController")

router.route("/sayHi").get(userController.sayHi)
router.route("/login").post(userController.login)

module.exports=router