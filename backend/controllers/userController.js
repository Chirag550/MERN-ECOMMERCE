const User = require("../models/userModel");
const Errorhandler = require("../utils/errorhanddler");
const catchAsynError = require("../middleware/catchAsynError");
const SendToken = require("../utils/jwtToken");
const SendMail = require("../utils/SendEmail");
const crypto = require("crypto");

exports.registerUser = catchAsynError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepictureurl",
    },
  });

  SendToken(user, 201, res);
});

exports.loginUser = catchAsynError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler("please Enter email and password", 401));
  }

  const user = await User.findOne({ email: email }).select("+password");
  console.log(user.comparePassword(password));

  if (!user) {
    return next(new Errorhandler("Invalid Email and password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid Email and password", 401));
  }
  SendToken(user, 201, res);
});

exports.Logout = catchAsynError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.forgetPassword = catchAsynError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }

  const resetToken = await user.getResetPasswordToken();
  console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  const ResetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/reset/${resetToken}`;

  const Message = `Your Pssword Reset Token is :- \n\n ${ResetUrl} \n\n if you have not requested password reset ,then please ignore it`;

  try {
    await SendMail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      Message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpirationDate = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new Errorhandler(err.message, 500));
  }
});

exports.resetPassword = catchAsynError(async (req, res, next) => {
  const RESETTOKEN = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: RESETTOKEN,
    resetPasswordExpirationDate: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new Errorhandler("Reset Password Token is invalid or expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new Errorhandler("Password Doesn't Match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordExpirationDate = undefined;
  user.resetPasswordToken = undefined;
  await user.save();

  SendToken(user, 200, res);
});
