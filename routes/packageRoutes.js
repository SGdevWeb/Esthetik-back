const express = require("express");
const packageController = require("../controllers/packageController");
const router = express.Router();

router.get("/packages/rate/:id", packageController.getPackageByRateId);
router.delete("/packages/:id", packageController.deletePackage);
router.post("/packages", packageController.createPackage);
router.patch("/packages/:id", packageController.updatePackage);

module.exports = router;
