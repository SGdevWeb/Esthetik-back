const discountService = require("../services/discountService");

const getDiscounts = async (req, res) => {
  try {
    const discounts = await discountService.getDiscounts();
    res.json(discounts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des remises" });
  }
};

module.exports = {
  getDiscounts,
};
