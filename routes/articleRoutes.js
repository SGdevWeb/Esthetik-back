const express = require("express");
const articleController = require("../controllers/articleController");
const router = express.Router();

router.get("/articles", articleController.getArticles);
router.get("/articles/:id", articleController.getArticleById);

module.exports = router;
