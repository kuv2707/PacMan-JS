const express=require("express")
const router=express.Router()
const gameController= require("./gameController")

router.route("/board").get(gameController.getBoard)

module.exports=router