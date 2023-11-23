const router = require("express").Router();
const productController = require("../controllers/productControllers");

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProduct);
router.get("/search/:key", productController.searchProduct);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct); 
router.delete("/:id", productController.deleteProduct); 

module.exports = router;
