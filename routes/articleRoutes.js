const express = require("express");
const articleController = require("../controllers/articleController");
const router = express.Router();
const auth = require("../middlewares/auth");
const uploadMiddleware = require("../middlewares/multer");
const loggerMiddleware = require("../middlewares/loggerMiddleware");

router.get("/articles", articleController.getArticles);
router.get("/articles/:id", articleController.getArticleById);
router.post(
  "/articles",
  loggerMiddleware,
  auth,
  uploadMiddleware,
  articleController.createArticleController
);
router.delete("/articles/:id", auth, articleController.deleteArticle);
router.patch(
  "/articles/:id",
  loggerMiddleware,
  auth,
  uploadMiddleware,
  articleController.updateArticleController
);

module.exports = router;
