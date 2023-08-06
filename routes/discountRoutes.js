const express = require("express");
const discountController = require("../controllers/discountController");
const router = express.Router();

router.get("/discounts", discountController.getDiscounts);

module.exports = router;
