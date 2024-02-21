const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify")

const createProductCategory = asyncHandler(async (req, res) => {
  if(req.body.title) req.body.slug = slugify(req.body.title)
  const response = await ProductCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "success" : "fail",
  });
});

const getProductCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find().select("title _id slug");
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "success" : "fail",
  });
});

const updateductCategory = asyncHandler(async (req, res) => {
    const {pcid} = req.params
  const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {new: true});
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "success" : "fail",
  });
});

const deleteductCategory = asyncHandler(async (req, res) => {
    const {pcid} = req.params
  const response = await ProductCategory.findByIdAndDelete(pcid);
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : null,
    message: response ? "success" : "fail",
  });
});

module.exports = {
    createProductCategory,
    getProductCategories,
    updateductCategory,
    deleteductCategory
}