const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router.get("/autocomplete", addressController.getAutocompleteSuggestions);

module.exports = router;
