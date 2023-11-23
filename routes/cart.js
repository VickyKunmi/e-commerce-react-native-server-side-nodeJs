const router = require("express").Router();
const cartController = require("../controllers/cartController");
const {verifyToken} = require("../middleware/verifyToken");




router.get("/find",verifyToken, cartController.getCart);
router.post("/",verifyToken, cartController.addTocart);
router.post("/quantity", cartController.decrementcartItem);
router.delete("/:cartItemId", cartController.deleteCartItem);

module.exports = router;