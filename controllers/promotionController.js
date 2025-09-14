const { ValidationError, QueryError } = require("../services/errorService");
const promotionService = require("../services/promotionServices");

const getPromotions = async (req, res) => {
  try {
    const promotions = await promotionService.getPromotions();
    res.json(promotions);
  } catch (error) {
    rconsole.error("Erreur lors de la récupération des promotions :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des promotions." });
  }
};

const getPromotionById = async (req, res) => {
  const promotionId = req.params.id;
  try {
    const promotion = await promotionService.getPromotionById(promotionId);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion non trouvée." });
    }
    res.json(promotion);
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la promotion avec l'ID ${promotionId} :`,
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

const createPromotionController = async (req, res) => {
  console.log(req.body);
  try {
    const { title, entitled, description, start, end, rateId } = req.body;
    if (!title) {
      throw new ValidationError("Le champ titre est requis");
    }
    if (!entitled) {
      throw new ValidationError("Le champ intitulé est requis");
    }
    if (!description) {
      throw new ValidationError("Le champ contenu est requis");
    }
    if (!start) {
      throw new ValidationError("La date de début est requise");
    }
    if (!end) {
      throw new ValidationError("La date de fin est requise");
    }
    if (!rateId) {
      throw new ValidationError("La catégorie de la promotion est requise ");
    }

    const picture = req.file ? req.file.filename : null;

    const promotioncreated = await promotionService.createPromotion(
      title,
      entitled,
      description,
      start,
      end,
      picture,
      rateId
    );
    return res.status(201).json(promotioncreated);
  } catch (error) {
    console.error("Erreur lors de la création de la promotion :", error);
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

const deletePromotion = async (req, res) => {
  const promotionId = req.params.id;
  try {
    const rowsAffected = await promotionService.deletePromotionById(
      promotionId
    );
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "Promotion non trouvée." });
    }
    res.status(200).json({ message: "Promotion supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la promotion :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({
      message:
        "Une erreur est survenue sur le serveur. Veuillez réessayer plus tard.",
    });
  }
};

const updatePromotionController = async (req, res) => {
  const promotionId = req.params.id;

  const updateFields = {};

  if (req.body.title !== undefined) updateFields.title = req.body.title;
  if (req.body.entitled !== undefined)
    updateFields.entitled = req.body.entitled;
  if (req.body.description !== undefined)
    updateFields.description = req.body.description;
  if (req.body.rateId !== undefined) updateFields.rate_id = req.body.rateId; // attention à la colonne SQL
  if (req.body.start !== undefined) updateFields.start = req.body.start;
  if (req.body.end !== undefined) updateFields.end = req.body.end;

  if (req.file) {
    updateFields.picture = req.file.filename;
  }

  console.log("PATCH reçu pour ID:", promotionId, "avec champs:", updateFields);

  try {
    const promotionUpdated = await promotionService.updatePromotionById(
      promotionId,
      updateFields
    );

    if (!promotionUpdated) {
      return res.status(404).json({ message: "Promotion non trouvée." });
    }

    return res.status(200).json(promotionUpdated);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la promotion :", error);

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
  getPromotions,
  getPromotionById,
  createPromotionController,
  deletePromotion,
  updatePromotionController,
};
