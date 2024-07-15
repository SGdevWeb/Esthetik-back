const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.post("/contact/send-email", contactController.sendContactEmail);

module.exports = router;
