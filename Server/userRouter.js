const express=require("express")
const router=express.Router()
const userController= require("./userController")

router.route("/login").post(userController.login)
router.route("/signup").post(userController.signup)
router.route("/hiscore").get(userController.gethiscore).patch(userController.updatehiscore)

module.exports=router