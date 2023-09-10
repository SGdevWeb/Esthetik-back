const express = require("express");
const googleAnalyticsController = require("../controllers/googleAnalyticsController");
const router = express.Router();

router.get("/customers", googleAnalyticsController.getTotalCustomers);

module.exports = router;
