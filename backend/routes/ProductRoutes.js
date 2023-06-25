const express = require("express");

const router = express.Router();

const productController = require("../controllers/ProductController");

router.post("/products/new", productController.createProducts);
router.get("/products", productController.getAllProducts);

router.put("/products/:productid", productController.updateProduct);

router.delete("/products/:productid", productController.deleteProduct);
router.get("/products/:productid", productController.getproductDetails);

module.exports = router;
