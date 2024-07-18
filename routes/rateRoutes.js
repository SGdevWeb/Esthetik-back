const express = require("express");
const rateController = require("../controllers/rateController");
const router = express.Router();

router.get("/rates", rateController.getRates);
router.get("/rates/name/:name", rateController.getRateIdByName);
router.get("/rates/id/:id", rateController.getRateById);
router.post("/rates", rateController.addRate);
router.patch("/rates/:id", rateController.updateRate);
router.delete("/rates/:id", rateController.deleteRate);

module.exports = router;
