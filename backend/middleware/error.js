const Errorhandler = require("../utils/errorhanddler");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "internal server error";

  //wrong mongodb id error

  if (error.name === "CastError") {
    const message = `Resource Not FOund . Invalid : ${error.path}`;
    error = new Errorhandler(message, 404);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
