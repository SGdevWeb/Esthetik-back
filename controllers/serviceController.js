const serviceService = require("../services/serviceService");

const getServices = async (req, res) => {
  try {
    const services = await serviceService.getServices();
    res.json(services);
  } catch (error) {
    console.error("Erreur lors de la récupération des prestations :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des prestations." });
  }
};

const getServicesByRate = async (req, res) => {
  const rateId = req.params.rateId;
  try {
    const services = await serviceService.getServicesByRate(rateId);
    res.json(services);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des prestations par rateId :",
      error
    );
    if (error instanceof QueryError) {
      return res.status(500).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des prestations." });
  }
};

const getServicesWithRates = async (req, res) => {
  try {
    const services = await serviceService.getServicesWithRates();
    res.json(services);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des prestations avec tarifs :",
      error
    );
    if (error instanceof QueryError) {
      return res.status(500).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des prestations." });
  }
};

module.exports = {
  getServicesWithRates,
  getServices,
  getServicesByRate,
};
