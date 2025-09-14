const express = require("express");
const promotionController = require("../controllers/promotionController");
const router = express.Router();
const auth = require("../middlewares/auth");
const loggerMiddleware = require("../middlewares/loggerMiddleware");
const uploadMiddleware = require("../middlewares/multer");

router.get("/promotions", promotionController.getPromotions);
router.get("/promotions/:id", promotionController.getPromotionById);
router.post(
  "/promotions",
  loggerMiddleware,
  auth,
  uploadMiddleware,
  promotionController.createPromotionController
);
router.delete("/promotions/:id", auth, promotionController.deletePromotion);
router.patch(
  "/promotions/:id",
  loggerMiddleware,
  auth,
  uploadMiddleware,
  promotionController.updatePromotionController
);

module.exports = router;
