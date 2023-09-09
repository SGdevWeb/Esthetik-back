const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/signIn", adminController.signIn);

module.exports = router;
