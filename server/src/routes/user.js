const router = require("express").Router()
const controller = require("../controllers/user")
const {verifyAccessToken, isAdmin} = require("../middlewares/verifyToken")

router.post("/register", controller.register )
router.post("/login", controller.login )
router.get("/getcurrent", verifyAccessToken ,controller.getCurrent )
router.get("/getall", [verifyAccessToken, isAdmin] ,controller.getAllUser )
router.get("/logout" ,controller.logout )
router.put("/cart", verifyAccessToken, controller.updateCart)
router.delete("/remove-cart/:pid", verifyAccessToken, controller.removeCart)
router.put("/updatecurrent", verifyAccessToken, controller.updateUser)
router.delete("/deletebyadmin/:uid", [verifyAccessToken, isAdmin], controller.deleteUserByAdmin)
router.put("/updateadmin/:uid", [verifyAccessToken, isAdmin] ,controller.updateUserByAdmin )

module.exports = router