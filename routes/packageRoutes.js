const express = require("express");
const packageController = require("../controllers/packageController");
const router = express.Router();

router.get("/packages/rate/:id", packageController.getPackageByRateId);

module.exports = router;
