const express = require("express");
const statController = require("../controllers/statController");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/daily-visits", auth, statController.getDailyVisitors);
router.get("/most-visited-page", auth, statController.getMostVisitedPage);
router.get("/average-time", auth, statController.getAverageTime);
router.get("/bounce-rate", auth, statController.getBounceRate);

module.exports = router;
