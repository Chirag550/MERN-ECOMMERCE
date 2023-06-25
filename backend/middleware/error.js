module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "internal server error";

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
