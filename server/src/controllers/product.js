const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  const { color, size, ...body } = req.body;
  if (color) body.color = color.split(",");
  if (size) body.size = size.split(",");
  if (Object.keys(body).length === 0) {
    throw new Error("Missing input");
  }
  const thumbnail = req?.files?.thumbnail[0]?.path;
  const images = req?.files?.images?.map((el) => el.path);
  if (body && body.title) body.slug = slugify(body.title);
  if (thumbnail) body.thumbnail = thumbnail;
  if (images) body.images = images;
  const newProduct = await Product.create(body);
  return res.status(200).json({
    success: newProduct ? true : false,
    data: newProduct ? newProduct : null,
    message: newProduct ? "success" : "fail",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid).populate("category", "title");

  return res.status(200).json({
    success: product ? true : false,
    data: product ? product : null,
    message: product ? "success" : "fail",
  });
});

const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  // tách các trường đặc biệt
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // format theo cú pháp mongodb
  let queryString = JSON.stringify(queries);
  queryString.replace(/\b(get|gt|lt|lte)\b/g, (macthedEl) => `$${macthedEl}`);
  const formatQueries = JSON.parse(queryString);

  // filter
  if (queries?.title) {
    formatQueries.title = { $regex: queries.title, $options: "i" };
  }
  let queryCommand = Product.find(formatQueries).populate("category", "title");

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy).populate("category", "title");
  }
  // fields
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields).populate("category", "title");
  }

  // phân trang
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = limit * (page - 1);

  queryCommand.skip(skip).limit(limit);
  //execute query
  queryCommand
    .then(async (response) => {
      const counts = await Product.find(formatQueries)
        .populate("category", "title")
        .countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        data: response ? response : null,
        message: response ? "success" : "fail",
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const response = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "success" : "fail",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const response = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "success" : "fail",
  });
});

const uploadImage = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing input");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "success" : "fail",
  });
});

const uploadThumb = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.file) throw new Error("Missing input");
  const response = await Product.findByIdAndUpdate(
    pid,
    { thumbnail: req.file.path },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "success" : "fail",
  });
});

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  uploadImage,
  uploadThumb,
};
