const locationService = require("../services/locationService");

const getLocations = async (req, res) => {
  try {
    const locations = await locationService.getLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération du secteur géographique",
    });
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
    res
      .status(500)
      .json({ error: "Erreur lors de la création d'une nouvelle ville" });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const locationId = req.params.id;

    if (!locationId) {
      return res.status(400).json({ error: "ID de la ville manquant" });
    }

    const result = await locationService.deleteLocationById(locationId);

    if (result === 0) {
      return res.status(404).json({ error: "Ville non trouvée" });
    }

    res.status(200).json({ message: "Ville supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la ville : ", error });
  }
};

const updateLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const updatedLocation = req.body;

    if (!locationId) {
      return res.status(400).json({ error: "Id de la ville manquant" });
    }

    const result = await locationService.updateLocationById(
      locationId,
      updatedLocation
    );

    if (result === 0) {
      return res.status(404).json({ error: "Ville non trouvé" });
    }

    res.status(200).json({ message: "Ville mise à jour avec succès" });
  } catch (error) {
    console.log("Erreur lors de la mise à jour de la ville : ", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la ville" });
  }
};

module.exports = {
  getLocations,
  createLocation,
  deleteLocation,
  updateLocation,
};
