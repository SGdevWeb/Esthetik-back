const { QueryError } = require("../services/errorService");
const packageService = require("../services/packageService");

const getPackageByRateId = async (req, res) => {
  const rateId = req.params.id;
  try {
    const package = await packageService.getPackageByRateId(rateId);
    res.json(package);
  } catch (error) {
    console.error("Erreur lors de la récupération des forfaits :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des forfaits." });
  }
};

module.exports = {
  getPackageByRateId,
};
