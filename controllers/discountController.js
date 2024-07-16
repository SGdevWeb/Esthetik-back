const discountService = require("../services/discountService");

const getDiscounts = async (req, res) => {
  try {
    const discounts = await discountService.getDiscounts();
    res.json(discounts);
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

module.exports = {
  getDiscounts,
};
