const express = require("express");
const router = express.Router();
const slotController = require("../controllers/slotController");
const auth = require("../middlewares/auth");

router.get("/slots", slotController.getSlots);
router.get("/slots/available", slotController.getAvailableSlots);
router.get("/slots/details", slotController.getSlotsWithDetails);
router.post("/slots/add", auth, slotController.addSlots);
router.patch("/slots/:id", auth, slotController.updateSlot);
router.delete("/slots/:id", auth, slotController.deleteSlot);

module.exports = router;
