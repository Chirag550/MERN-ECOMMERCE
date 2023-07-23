const catchAsyncErrors = require("../middleware/catchAsynError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Online Shop",
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeAPiKey = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .json({ success: true, StripeApiKey: process.env.STRIPE_API_KEY });
});
