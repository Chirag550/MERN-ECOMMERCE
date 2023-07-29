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
  const productsCount = await Product.countDocuments();
  const resultperpage = 3;
  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .Search()
    .filter();

  let products = await apifeatures.query;
  let filteredCount = products.length;

  apifeatures.pagination(resultperpage);

  products = await apifeatures.query.clone();

  res.status(200).json({
    message: "get products sucessfully",
    products,
    productsCount,
    resultperpage,
    filteredCount,
  });
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

exports.createProductReview = catchAsynError(async (req, res, next) => {
  const { rating, comment, productid } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productid);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => (avg += rev.rating));

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res
    .status(200)
    .json({ success: true, message: "Reviews added successfully" });
});

exports.getProductReviews = catchAsynError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReviews = catchAsynError(async (req, res, next) => {
  const product = await Product.findById(req.query.productid);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;

  const numofReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productid,
    reviews,
    ratings,
    numofReviews,
    {
      new: true,
      runValidators: true,
      usefindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
