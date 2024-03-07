const router = require("express").Router()
const controller = require("../controllers/user")
const {verifyAccessToken, isAdmin} = require("../middlewares/verifyToken")

router.post("/register", controller.register )
router.post("/login", controller.login )
router.get("/getcurrent", verifyAccessToken ,controller.getCurrent )
router.get("/getall", [verifyAccessToken, isAdmin] ,controller.getAllUser )
router.put("/:uid", [verifyAccessToken, isAdmin] ,controller.updateUserByAdmin )
router.get("/logout" ,controller.logout )
router.put("/cart", verifyAccessToken, controller.updateCart)
router.delete("/:uid", [verifyAccessToken, isAdmin], controller.deleteUserByAdmin)

module.exports = router