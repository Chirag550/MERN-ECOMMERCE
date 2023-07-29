const express = require("express");
const { isAuth, authorizeRoles } = require("../middleware/isAuth");
const paymentcontroller = require("../controllers/PaymentController");

const router = express.Router();

router.post("/payment/process", isAuth, paymentcontroller.processPayment);
router.get("/StripeApiKey", paymentcontroller.sendStripeAPiKey);
module.exports = router;
