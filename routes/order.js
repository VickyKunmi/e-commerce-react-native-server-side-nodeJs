const router = require("express").Router();
const orderController = require("../controllers/ordersController");
const {verifyToken} = require("../middleware/verifyToken");


router.get("/",verifyToken, orderController.getUserOrders)
router.get("/all", orderController.getAllOrders)

module.exports = router;
