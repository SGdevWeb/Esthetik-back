const serviceService = require("../services/serviceService");

const getServices = async (req, res) => {
  try {
    const services = await serviceService.getServices();
    res.json(services);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des services" });
  }
};

const getServicesByRate = async (req, res) => {
  const rateId = req.params.rateId;
  try {
    const services = await serviceService.getServicesByRate(rateId);
    res.json(services);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des services" });
  }
};

const getServicesWithRates = async (req, res) => {
  try {
    const services = await serviceService.getServicesWithRates();
    console.log(services);
    res.json(services);
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
