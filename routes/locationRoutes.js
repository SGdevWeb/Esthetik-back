const express = require("express");
const locationController = require("../controllers/locationController");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/locations", locationController.getLocations);
router.post("/locations/new", auth, locationController.createLocation);
router.delete("/locations/:id", auth, locationController.deleteLocation);
router.patch("/locations/:id", auth, locationController.updateLocation);

module.exports = router;
