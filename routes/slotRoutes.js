const express = require("express");
const router = express.Router();
const slotController = require("../controllers/slotController");

router.get("/slots", slotController.getSlots);
router.post("/slots/add", slotController.addSlots);

module.exports = router;
