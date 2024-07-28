const express = require("express");
const discountController = require("../controllers/discountController");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/discounts", discountController.getDiscounts);
router.post("/discounts", auth, discountController.createDiscount);
router.delete("/discounts/:id", auth, discountController.deleteDiscount);
router.patch("/discounts/:id", auth, discountController.updateDiscount);

module.exports = router;
