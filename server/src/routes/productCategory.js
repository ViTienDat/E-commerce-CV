const router = require("express").Router()
const controller = require("../controllers/productCategory")
const {verifyAccessToken, isAdmin} = require("../middlewares/verifyToken")

router.post("/", [verifyAccessToken, isAdmin] , controller.createProductCategory)
router.get("/", controller.getProductCategories)
router.put("/:pcid", [verifyAccessToken, isAdmin] , controller.updateductCategory)
router.delete("/:pcid", [verifyAccessToken, isAdmin] , controller.deleteductCategory)


module.exports = router