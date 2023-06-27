const Errorhandler = require("../utils/errorhanddler");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "internal server error";

  //wrong mongodb id error

  if (error.name === "CastError") {
    const message = `Resource Not FOund . Invalid : ${error.path}`;
    error = new Errorhandler(message, 404);
  }
  //Mongoose duplicate key error
  if (error.code === 110000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} Entered`;
    error = new Errorhandler(message, 404);
  }
  //wrong JWT error
  if (error.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid Try again`;
    error = new Errorhandler(message, 404);
  }
  //Jwt Expire error
  if (error.name === "TokenExpiredError") {
    const message = `Json Web Token is invalid , Try again`;
    error = new Errorhandler(message, 404);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
