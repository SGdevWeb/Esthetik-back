const rateService = require("../services/rateService");

const getRates = async (req, res) => {
  try {
    const rates = await rateService.getRates();
    res.json(rates);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tarifs" });
  }
};

const getRateIdByName = async (req, res) => {
  const rateName = req.params.name;
  try {
    const data = await rateService.getRateIdByName(rateName);
    const rateId = data[0].id;
    res.json(rateId);
  } catch {
    res.status(500).json({
      error: "Erreur lors de la récupération de l'id du tarif",
    });
  }
};

const getRateById = async (req, res) => {
  const rateId = req.params.id;
  try {
    const response = await rateService.getRateById(rateId);
    res.json(response);
  } catch {
    res.status(500).json({
      error: "Erreur lors de la récupération de l'id du tarif",
    });
  }
};

module.exports = {
  getRates,
  getRateIdByName,
  getRateById,
};
