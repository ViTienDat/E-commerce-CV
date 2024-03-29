const router = require("express").Router()
const controller = require("../controllers/order")
const {verifyAccessToken, isAdmin} = require("../middlewares/verifyToken")

router.post("/", verifyAccessToken, controller.createOrder)
router.put("/status/:oid", [verifyAccessToken, isAdmin], controller.updateStatus)
router.get("/all", [verifyAccessToken, isAdmin], controller.getAllOrder)
router.get("/", verifyAccessToken, controller.getOrderByUser)

module.exports = router