const articleService = require("../services/articleService");

const getArticles = async (req, res) => {
  try {
    const articles = await articleService.getArticles();
    res.json(articles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des articles" });
  }
};

const getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await articleService.getArticleById(articleId);
    res.json(article);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'article" });
  }
};

module.exports = {
  getArticles,
  getArticleById,
};
