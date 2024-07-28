const discountService = require("../services/discountService");
const { QueryError } = require("../services/errorService");

const getDiscounts = async (req, res) => {
  try {
    const discounts = await discountService.getDiscounts();
    res.status(200).json(discounts);
  } catch (error) {
    console.error("Erreur lors de la récupération des remises :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des remises." });
  }
};

const deleteDiscount = async (req, res) => {
  const discountId = req.params.id;
  try {
    const rowsAffected = await discountService.deleteDiscountById(discountId);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "Remise non trouvée." });
    }
    res.status(200).json({ message: "Remise supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la remise :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la remise." });
  }
};

const updateDiscount = async (req, res) => {
  const discountId = req.params.id;
  const updatedDiscount = req.body;

  try {
    const rowsAffected = await discountService.updateDiscountById(
      discountId,
      updatedDiscount
    );
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "Remise non trouvée." });
    }
    res.status(200).json({ message: "Remise mise à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la remise :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la remise." });
  }
};

const createDiscount = async (req, res) => {
  try {
    const { title, discount, packageId } = req.body;
    if (!title || !discount || !packageId) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }
    const discountcreated = await discountService.createDiscount(
      title,
      discount,
      packageId
    );
    return res.status(201).json(discountcreated);
  } catch (error) {
    console.error("Erreur lors de la création de la remise :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la remise." });
  }
};

module.exports = {
  getDiscounts,
  deleteDiscount,
  updateDiscount,
  createDiscount,
};
