const Errorhandler = require("../utils/errorhanddler");
const catchAsynError = require("./catchAsynError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuth = catchAsynError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new Errorhandler("Please Login to access this resource", 401));
  }

  const decodedata = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedata.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Errorhandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
