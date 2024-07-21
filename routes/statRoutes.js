const express = require("express");
const statController = require("../controllers/statController");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/visitors", statController.getVisitors);

module.exports = router;
