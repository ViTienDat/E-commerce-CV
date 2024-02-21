const Order = require("../models/order");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { address } = req.body;
  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title price");
  const products = userCart?.cart?.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    color: el.color,
    size: el.size,
  }));
  let total = userCart?.cart.reduce(
    (sum, el) => el.product.price * el.quantity + sum,
    0
  );
  const response = await Order.create({
    products,
    total,
    address,
    orderBy: _id,
  });
  if(response) {
    await User.findByIdAndUpdate(_id, {cart: []}, {new: true})
  }
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "Success" : "Fail",
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing input");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "Success" : "Fail",
  });
});

const getOrderByUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order.find({orderBy: _id})
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "Success" : "Fail",
  });
});

const getAllOrder = asyncHandler(async (req, res) => {
  const response = await Order.find()
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "Success" : "Fail",
  });
});

module.exports = {
  createOrder,
  updateStatus,
  getOrderByUser,
  getAllOrder
};
