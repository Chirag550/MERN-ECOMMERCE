const Product = require("../models/product");
const Errorhandler = require("../utils/errorhanddler");
const catchAsynError = require("../middleware/catchAsynError");
const ApiFeatures = require("../utils/apifeature");
const cloudinary = require("cloudinary");

//Admin
exports.createProducts = catchAsynError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLink;
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

//Admin ALl product list
exports.getAdminProducts = catchAsynError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    message: "get products sucessfully",
    products,
  });
});

exports.updateProduct = catchAsynError(async (req, res, next) => {
  let product = await Product.findById(req.params.productid);

  if (!product) {
    return next(new Errorhandler("Product not found ", 404));
  }

  //images

  let images = [];

  if (typeof req.body.images !== "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 1; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    let imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLink;
  }
  product = await Product.findByIdAndUpdate(req.params.productid, req.body, {
    new: true,
    runValidators: true,
    usefindAndModify: false,
  });

  res.status(200).json({ sucess: true, product });
});

exports.deleteProduct = catchAsynError(async (req, res, next) => {
  const product1 = await Product.findById(req.params.productid);

  if (!product1) {
    return next(new Errorhandler("Product not found ", 404));
  }

  for (let i = 1; i < product1.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product1.images[i].public_id);
  }

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
  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numofReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productid,
    { reviews, ratings, numofReviews },
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
