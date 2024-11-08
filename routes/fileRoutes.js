const express = require("express");
const fileController = require("../controllers/fileController");
const corsMiddleware = require("../middlewares/corsMiddleware");
const router = express.Router();

router.get("/uploads/:filename", corsMiddleware, fileController.getFile);

module.exports = router;
