const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");
const { isAuth, authorizeRoles } = require("../middleware/isAuth");

router.post("/order/new", isAuth, OrderController.newOrder);

router.get(
  "/order/:id",
  isAuth,

  OrderController.getSingleOrder
);

//get logged in user orders
router.get("/orders/me", isAuth, OrderController.myOrder);

router.get(
  "/admin/orders",
  isAuth,
  authorizeRoles("admin"),
  OrderController.getAllOrder
);

router.put(
  "/admin/order/:id",
  isAuth,
  authorizeRoles("admin"),
  OrderController.updateOrder
);

router.delete(
  "/admin/order/:id",
  isAuth,
  authorizeRoles("admin"),
  OrderController.DeleteOrder
);
module.exports = router;
