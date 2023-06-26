const express = require("express");
const { isAuth, authorizeRoles } = require("../middleware/isAuth");

const router = express.Router();

const productController = require("../controllers/ProductController");

router.post(
  "/products/new",
  isAuth,
  authorizeRoles("admin"),
  productController.createProducts
);
router.get("/products", productController.getAllProducts);

router.put(
  "/products/:productid",
  isAuth,
  authorizeRoles("admin"),
  productController.updateProduct
);

router.delete(
  "/products/:productid",
  isAuth,
  authorizeRoles("admin"),
  productController.deleteProduct
);
router.get("/products/:productid", productController.getproductDetails);

module.exports = router;
