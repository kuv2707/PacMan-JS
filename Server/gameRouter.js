const express=require("express")
const router=express.Router()
const gameController= require("./gameController")

router.route("/board").get(gameController.getBoard)
router.route("/ghostFace/:color").get(gameController.getGhostFace)
// router.route("/findPath").get(gameController.findPath)

module.exports=router