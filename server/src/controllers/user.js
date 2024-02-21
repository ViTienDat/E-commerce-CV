const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { createAccessToken } = require("../middlewares/jwt");

const register = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing input",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User has existed");
  } else {
    const response = await User.create(req.body);
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "register is success" : "wrong",
      data: response,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing input",
    });
  }
  const response = await User.findOne({ email });
  if (response && (await response?.isCorrectPassword(password))) {
    const { password, role, ...data } = response.toObject();
    const accessToken = createAccessToken(response._id, role);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      message: "login is success",
      data: data,
    });
  } else {
    throw new Error("login is fail");
  }
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.accessToken) {
    throw new Error("no token in cookie");
  }
  res.clearCookie("accessToken", { httpOnly: true, secure: true });

  return res.status(200).json({
    success: true,
    message: "logout is done",
  });
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    return res.status(400).json({
      success: false,
      message: "Missing input",
    });
  }
  const user = await User.findById(_id).select("-role -password -_id");
  return res.status(200).json({
    success: user ? true : false,
    data: user ? user : "user not found",
  });
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-role -password -_id");
  return res.status(200).json({
    success: users ? true : false,
    data: users ? users : "user not found",
  });
});

const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, color, size, quantity } = req.body;
  if (!pid || !quantity || !color || !size) throw new Error("missing input");
  const cart = await User.findById(_id).select("cart");
  const alreadyProduct = cart?.cart.find(
    (el) =>
      el.product.toString() === pid &&
      el.size.toString() === size &&
      el.color.toString() === color
  );
  if (alreadyProduct) {
    const response = await User.updateOne(
      { cart: { $elemMatch: alreadyProduct } },
      { $set: { "cart.$.quantity": quantity } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : null,
    });
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: pid, quantity, color, size } } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response ? response : null,
    });
  }
});

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateCart,
  getAllUser
};
