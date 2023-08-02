const User = require("../models/userModel");
const Errorhandler = require("../utils/errorhanddler");
const catchAsynError = require("../middleware/catchAsynError");
const SendToken = require("../utils/jwtToken");
const SendMail = require("../utils/SendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = catchAsynError(async (req, res, next) => {
  const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
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
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }

  const resetToken = await user.getResetPasswordToken();
  console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  // const ResetUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/reset/${resetToken}`;
  const ResetUrl = `${process.env.FRONTEND}/reset/${resetToken}`;

  const Message = `Your Password Reset Token is :- \n\n ${ResetUrl} \n\n if you have not requested password reset ,then please ignore it`;

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

  if (req.body.newpassword !== req.body.confirmPassword) {
    return next(new Errorhandler("Password Doesn't Match", 400));
  }

  user.password = req.body.newpassword;
  user.resetPasswordExpirationDate = undefined;
  user.resetPasswordToken = undefined;
  await user.save();

  SendToken(user, 200, res);
});

exports.getUserDetails = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldpassword);

  if (!isPasswordMatched) {
    return next(new Errorhandler("old password is incorrect", 400));
  }

  if (req.body.newpassword !== req.body.confirmPassword) {
    return next(new Errorhandler("password doesn'y match", 400));
  }

  user.password = req.body.newpassword;

  await user.save();
  SendToken(user, 200, res);
});

exports.updateProfile = catchAsynError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//get all users (by admin)
exports.getAllUser = catchAsynError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get single user detail (by admin)
exports.getSingleUser = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new Errorhandler(`User does not exist with Id:${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateRole = catchAsynError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//delete user --Admin
exports.deleteUser = catchAsynError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new Errorhandler(`User does not exist with Id:${req.params.id}`, 400)
    );
  }

  await User.findOneAndRemove(req.params.id);

  res.status(200).json({
    success: true,
  });
});
