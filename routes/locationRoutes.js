const express = require("express");
const locationController = require("../controllers/locationController");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.get("/locations", locationController.getLocations);
router.post(
  "/locations/new",
  authMiddleware,
  locationController.createLocation
);

module.exports = router;
