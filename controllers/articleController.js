const articleService = require("../services/articleService");
const { QueryError, ValidationError } = require("../services/errorService");

const getArticles = async (req, res) => {
  try {
    const articles = await articleService.getArticles();
    res.status(200).json(articles);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({
      message:
        "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.",
    });
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
    return res.status(500).json({
      message:
        "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.",
    });
  }
};

const createArticleController = async (req, res) => {
  console.log(req.body);
  try {
    const { title, content, rateId, publicationDate, author } = req.body;
    if (!title) {
      throw new ValidationError("Le champ titre est requis");
    }
    if (!content) {
      throw new ValidationError("Le champ contenu est requis");
    }

    const image = req.files.image ? req.files.image[0].filename : null;

    const articlecreated = await articleService.createArticle(
      title,
      content,
      rateId,
      publicationDate,
      author,
      image
    );
    return res.status(201).json(articlecreated);
  } catch (error) {
    console.error("Erreur lors de la création de l'article :", error);
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({
      message:
        "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.",
    });
  }
};

const deleteArticle = async (req, res) => {
  const articleId = req.params.id;
  try {
    const rowsAffected = await articleService.deleteArticleById(articleId);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "Article non trouvée." });
    }
    res.status(200).json({ message: "Article supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({
      message:
        "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.",
    });
  }
};

const updateArticleController = async (req, res) => {
  const articleId = req.params.id;
  const { title, content, rateId } = req.body;
  const image = req.files.image && req.files.image[0].filename;

  try {
    const articleUpdated = await articleService.updateArticleById(
      articleId,
      title,
      content,
      rateId,
      image
    );
    if (!articleUpdated) {
      return res.status(404).json({ message: "Article non trouvée." });
    }
    return res.status(200).json(articleUpdated);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'article :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({
      message:
        "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.",
    });
  }
};

module.exports = {
  getArticles,
  getArticleById,
  createArticleController,
  deleteArticle,
  updateArticleController,
};
