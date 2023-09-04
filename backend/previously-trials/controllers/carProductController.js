const CarProduct = require("../models/carModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

exports.createCarProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const carProduct = await CarProduct.create(req.body);
  res.status(201).json({
    success: true,
    carProduct,
  });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await CarProduct.countDocuments();
  const apiFeature = new ApiFeatures(CarProduct.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const product = await apiFeature.query;

  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});
