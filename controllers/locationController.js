const locationService = require("../services/locationService");

const getLocations = async (req, res) => {
  try {
    const locations = await locationService.getLocations();
    res.json(locations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tarifs" });
  }
};

module.exports = {
  getLocations,
};
