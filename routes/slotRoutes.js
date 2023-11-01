const express = require("express");
const router = express.Router();
const slotController = require("../controllers/slotController");
const auth = require("../middlewares/auth");

router.get("/slots", slotController.getSlots);
router.get("/slots/available", slotController.getAvailableSlots);
router.post("/slots/add", auth, slotController.addSlots);

module.exports = router;
