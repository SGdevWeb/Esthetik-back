const express = require("express");
const locationController = require("../controllers/locationController");
const router = express.Router();

router.get("/locations", locationController.getLocations);

module.exports = router;
