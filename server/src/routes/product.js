const router = require("express").Router()
const controller = require("../controllers/product")
const {verifyAccessToken, isAdmin} = require("../middlewares/verifyToken")
const uploader = require("../config/cloudinary.config")

router.post("/create", [verifyAccessToken, isAdmin] , controller.createProduct)
router.get("/:pid", controller.getProduct)
router.get("/", controller.getProducts)
router.put("/:pid", [verifyAccessToken, isAdmin] , controller.updateProduct)
router.put("/uploadimage/:pid", [verifyAccessToken, isAdmin], uploader.array("images", 10) , controller.uploadImage)
router.put("/uploadthumb/:pid", [verifyAccessToken, isAdmin], uploader.single("images") , controller.uploadThumb)
router.delete("/:pid", [verifyAccessToken, isAdmin] , controller.deleteProduct)

module.exports = router