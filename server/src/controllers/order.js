const Order = require("../models/order");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { address, payment } = req.body;
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
    payment,
    address,
    orderBy: _id,
  });
  if (response) {
    await User.findByIdAndUpdate(_id, { cart: [] }, { new: true });
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
  const response = await Order.find({ orderBy: _id }).populate({
    path: "products",
    populate: {
      path: "product",
      select: "thumbnail price title slug",
    },
  });
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "Success" : "Fail",
  });
});

const getAllOrder = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString.replace(/\b(get|gt|lt|lte)\b/g, (macthedEl) => `$${macthedEl}`);
  const formatQueries = JSON.parse(queryString);

  if (req?.query?.q) {
    delete formatQueries.q;
    formatQueries["$or"] = [
      { status: { $regex: req?.query?.q, $options: "i" } },
    ];
  }
  let queryCommand = Order.find(formatQueries)
    .populate({
      path: "orderBy",
      select: "email mobile",
    })
    .populate({
      path: "products",
      populate: {
        path: "product",
        select: "thumbnail price title slug",
      },
    });

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
      const counts = await Order.find(formatQueries)
        .countDocuments()
        .populate({
          path: "orderBy",
          select: "email mobile",
        })
        .populate({
          path: "products",
          populate: {
            path: "product",
            select: "thumbnail price title slug",
          },
        });
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


module.exports = {
  createOrder,
  updateStatus,
  getOrderByUser,
  getAllOrder,
};
