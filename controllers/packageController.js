const packageService = require("../services/packageService");

const getPackageByRateId = async (req, res) => {
  const rateId = req.params.id;
  try {
    const package = await packageService.getPackageByRateId(rateId);
    res.json(package);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des promotions" });
  }
};

module.exports = {
  getPackageByRateId,
};
