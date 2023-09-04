const express = require("express");
const { createCarProduct, getAllProducts } = require("../controllers/carProductController");
const router = express.Router();

router.route("/product/new").post(createCarProduct);
router.route("/products").get(getAllProducts);

module.exports = router;
