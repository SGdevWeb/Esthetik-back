const serviceService = require("../services/serviceService");

const getServices = async (req, res) => {
  try {
    const rates = await serviceService.getServices();
    res.json(rates);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des services" });
  }
};

const getServicesByRate = async (req, res) => {
  const rateId = req.params.rateId;
  try {
    const rates = await serviceService.getServicesByRate(rateId);
    res.json(rates);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des services" });
  }
};

const getServicesWithRates = async (req, res) => {
  try {
    const rates = await serviceService.getServicesWithRates();
    res.json(rates);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des services" });
  }
};

module.exports = {
  getServicesWithRates,
  getServices,
  getServicesByRate,
};
