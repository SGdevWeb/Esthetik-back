const addressService = require("../services/addressService");

exports.getAutocompleteSuggestions = async (req, res) => {
  try {
    const query = req.query.q;
    const suggestions = await addressService.getAutocompleteSuggestions(query);
    res.json(suggestions);
  } catch (error) {
    console.error("Erreur dans le contrôleur de suggestions d'adresse:", error);
    res.status(500).json({ error: error.message });
  }
};
