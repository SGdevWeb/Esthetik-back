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
    console.log(name);
    if (!name) {
      return res.status(400).json({ error: "Le nom de la ville est requis" });
    }
    const result = await locationService.createLocation(name);
    if (result.affectedRows === 1) {
      return res.status(201).json({ message: "Ville créée avec succès" });
    } else {
      return res
        .status(500)
        .json({ error: "Erreur lors de la création de la ville" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création d'une nouvelle ville" });
  }
};

module.exports = {
  getLocations,
  createLocation,
};
