const express = require("express");
const rateController = require("../controllers/rateController");
const router = express.Router();

router.get("/rates", rateController.getRates);
router.get("/rates/name/:name", rateController.getRateIdByName);
router.get("/rates/id/:id", rateController.getRateById);

module.exports = router;
