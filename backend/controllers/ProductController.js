const Product = require("../models/product");
const Errorhandler = require("../utils/errorhanddler");
const catchAsynError = require("../middleware/catchAsynError");
const ApiFeatures = require("../utils/apifeature");

//Admin
exports.createProducts = catchAsynError(async (req, res, next) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);

  res.status(201).json({ success: true, product });
});

exports.getAllProducts = catchAsynError(async (req, res, next) => {
  const resultperpage = 5;
  const apifeatures = new ApiFeatures(Product, req.query)
    .Search()
    .filter()
    .pagination(resultperpage);
  const products = await apifeatures.query;
  res.status(200).json({ message: "get products sucessfully", products });
});

exports.updateProduct = catchAsynError(async (req, res, next) => {
  let product = await Product.findById(req.params.productid);

  if (!product) {
    return next(new Errorhandler("Product not found ", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.productid, req.body, {
    new: true,
    runValidators: true,
    usefindAndModify: false,
  });

  res.status(200).json({ sucess: true, product });
});

exports.deleteProduct = catchAsynError(async (req, res, next) => {
  const product = await Product.findOneAndRemove(req.params.productid);

  if (!product) {
    return next(new Errorhandler("Product not found ", 404));
  }

  res.json({
    success: true,
    message: "Product deleted successfully",
  });
});

exports.getproductDetails = catchAsynError(async (req, res, next) => {
  const product = await Product.findById(req.params.productid);
  if (!product) {
    return next(new Errorhandler("Product not found ", 404));
  }

  res.json({
    success: true,
    message: "Product fetched successfully",
    product,
  });
});
