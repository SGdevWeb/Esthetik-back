const promotionService = require("../services/promotionServices");

const getPromotions = async (req, res) => {
  try {
    const promotions = await promotionService.getPromotions();
    res.json(promotions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des promotions" });
  }
};

module.exports = {
  getPromotions,
};
