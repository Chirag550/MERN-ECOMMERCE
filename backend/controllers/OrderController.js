const Order = require("../models/OrderModel");
const ErrorHandler = require("../utils/errorhanddler");
const CatchAsyncError = require("../middleware/catchAsynError");
const Product = require("../models/product");

exports.newOrder = CatchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get single Order
exports.getSingleOrder = CatchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

///get logged in  users my Order

exports.myOrder = CatchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getAllOrder = CatchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalamount = 0;

  orders.forEach((order) => {
    totalamount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalamount,
  });
});

//update all order status
exports.updateOrder = CatchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("order not found ", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("you have already delivered this order", 400));
  }
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

exports.DeleteOrder = CatchAsyncError(async (req, res, next) => {
  const order = await Order.findOneAndRemove(req.params.productid);

  if (!order) {
    return next(new ErrorHandler("order not found ", 404));
  }

  res.json({
    success: true,
    message: "Product deleted successfully",
  });
});
