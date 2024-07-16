const articleService = require("../services/articleService");
const { QueryError } = require("../services/errorService");

const getArticles = async (req, res) => {
  try {
    const articles = await articleService.getArticles();
    res.json(articles);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des articles" });
  }
};

const getArticleById = async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await articleService.getArticleById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé." });
    }
    res.json(article);
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de l'article avec l'ID ${articleId} :`,
      error
    );
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de l'article." });
  }
};

module.exports = {
  getArticles,
  getArticleById,
};
