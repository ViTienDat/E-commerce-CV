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
  const user = await User.findById(_id)
    .select("-password")
    .populate({
      path: "cart",
      populate: {
        path: "product",
        select: "title thumbnail price slug",
      },
    })
    .populate({
      path: "wislist",
      populate: {
        path: "product",
        select: "title thumbnail price slug",
      },
    })
  return res.status(200).json({
    success: user ? true : false,
    data: user ? user : "user not found",
  });
});

const getAllUser = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString.replace(/\b(get|gt|lt|lte)\b/g, (macthedEl) => `$${macthedEl}`);
  const formatQueries = JSON.parse(queryString);

  if (queries?.email)
    formatQueries.email = { $regex: queries.email, $options: "i" };
  if (req?.query?.q) {
    delete formatQueries.q;
    formatQueries["$or"] = [
      { name: { $regex: req?.query?.q, $options: "i" } },
      { email: { $regex: req?.query?.q, $options: "i" } },
      { mobile: { $regex: req?.query?.q, $options: "i" } },
    ];
  }
  let queryCommand = User.find(formatQueries);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = limit * (page - 1);

  queryCommand.skip(skip).limit(limit);
  //execute query
  queryCommand
    .then(async (response) => {
      const counts = await User.find(formatQueries).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        data: response ? response : null,
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password");

  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "update user success" : "update user wrong!",
  });
});

const deleteUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const response = await User.findByIdAndDelete(uid);

  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "delete user success" : "delete user wrong!",
  });
});

const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, color, size, quantity = 1 } = req.body;
  if (!pid || !quantity) throw new Error("missing input");
  const cart = await User.findById(_id).select("cart");
  const alreadyProduct = cart?.cart.find(
    (el) =>
      el?.product?.toString() === pid &&
      el?.size?.toString() === size &&
      el?.color?.toString() === color
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

const removeCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid } = req.params;
  const response = await User.findByIdAndUpdate(
    _id,
    { $pull: { cart: { _id: pid } } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "Remove product success!" : "Remove product wrong",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name, email, mobile } = req.body;
  if (!name || !email || !mobile) throw new Error("missing input");
  const response = await User.findByIdAndUpdate(
    _id,
    { name, email, mobile },
    { new: true }
  ).select("-password -role");
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "Update user success" : "Update user wrong",
  });
});

const updateWislist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid } = req.params;
  if (!pid) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { wislist: { product: pid } } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
  });
});

const removeWislist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid } = req.params;
  if (!pid) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(
    _id,
    { $pull: { wislist: {_id: pid}} },
    { multi: true  }
  );
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
  });
});

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateCart,
  getAllUser,
  updateUserByAdmin,
  deleteUserByAdmin,
  updateUser,
  removeCart,
  updateWislist,
  removeWislist
};
