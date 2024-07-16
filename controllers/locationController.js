const { QueryError } = require("../services/errorService");
const locationService = require("../services/locationService");

const getLocations = async (req, res) => {
  try {
    const locations = await locationService.getLocations();
    res.json(locations);
  } catch (error) {
    console.error("Erreur lors de la récupération des villes :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des villes." });
  }
};

const createLocation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Le nom de la ville est requis" });
    }
    const newLocation = await locationService.createLocation(name);
    return res.status(201).json(newLocation);
  } catch (error) {
    console.error("Erreur lors de la création de la ville :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la ville." });
  }
};

const deleteLocation = async (req, res) => {
  const locationId = req.params.id;
  try {
    const rowsAffected = await locationService.deleteLocationById(locationId);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "ville non trouvée." });
    }
    res.status(200).json({ message: "ville supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la ville :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la ville." });
  }
};

const updateLocation = async (req, res) => {
  const locationId = req.params.id;
  const updatedLocation = req.body;

  try {
    const rowsAffected = await locationService.updateLocationById(
      locationId,
      updatedLocation
    );
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "ville non trouvée." });
    }
    res.status(200).json({ message: "ville mise à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'ville :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la ville." });
  }
};

module.exports = {
  getLocations,
  createLocation,
  deleteLocation,
  updateLocation,
};
