const express = require("express");
const serviceController = require("../controllers/serviceController");
const router = express.Router();

router.get("/services/details", serviceController.getServicesWithRates);
router.get("/services/:rateId", serviceController.getServicesByRate);
router.get("/services", serviceController.getServices);
router.post("/services", serviceController.addService);
router.delete("/services/:id", serviceController.deleteService);
router.patch("/services/:id", serviceController.updateService);

module.exports = router;
