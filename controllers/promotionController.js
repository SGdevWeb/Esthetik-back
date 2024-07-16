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

module.exports = {
  getPromotions,
};
