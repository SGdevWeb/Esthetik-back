const express = require("express");
const serviceController = require("../controllers/serviceController");
const router = express.Router();

router.get("/services", serviceController.getServices);
router.get("/services/:rateId", serviceController.getServicesByRate);

module.exports = router;
