const { QueryError } = require("../services/errorService");
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

const addService = async (req, res) => {
  console.log(req.body);
  const { title, price, rate_id } = req.body;
  try {
    const newService = await serviceService.addService(title, price, rate_id);
    res.status(201).json(newService);
  } catch (error) {
    console.error("Erreur lors de l'ajout du nouveau service : ", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({
      error: "Erreur lors de l'ajout du nouveau service",
    });
  }
};

const deleteService = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const rowsAffected = await serviceService.deleteServiceById(serviceId);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "Prestation non trouvée." });
    }
    res.status(200).json({ message: "Prestation supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la Prestation :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la Prestation." });
  }
};

const updateService = async (req, res) => {
  const serviceId = req.params.id;
  const newData = req.body;
  try {
    const updatedService = await serviceService.updateService(
      serviceId,
      newData
    );
    res.status(200).json(updatedService);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la prestation : ${error}`);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la prestation." });
  }
};

module.exports = {
  getServicesWithRates,
  getServices,
  getServicesByRate,
  addService,
  deleteService,
  updateService,
};
