const express = require("express");
const { isAuth, authorizeRoles } = require("../middleware/isAuth");

const router = express.Router();

const productController = require("../controllers/ProductController");

router.post(
  "/admin/products/new",
  isAuth,
  authorizeRoles("admin"),
  productController.createProducts
);
router.get("/products", productController.getAllProducts);
router.get(
  "/admin/products",
  isAuth,
  authorizeRoles("admin"),
  productController.getAdminProducts
);

router.put(
  "/admin/product/:productid",
  isAuth,
  authorizeRoles("admin"),
  productController.updateProduct
);

router.delete(
  "/admin/product/:productid",
  isAuth,
  authorizeRoles("admin"),
  productController.deleteProduct
);
router.get("/products/:productid", productController.getproductDetails);

router.put(
  "/review",
  isAuth,

  productController.createProductReview
);

router.get(
  "/reviews",

  productController.getProductReviews
);
router.delete(
  "/reviews",
  isAuth,

  productController.deleteReviews
);
module.exports = router;
