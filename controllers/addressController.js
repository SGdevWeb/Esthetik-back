const addressService = require("../services/addressService");
const {
  ValidationError,
  AddressServiceError,
} = require("../services/errorService");

exports.getAutocompleteSuggestions = async (req, res) => {
  try {
    const query = req.query.q;
    const suggestions = await addressService.getAutocompleteSuggestions(query);
    res.json(suggestions);
  } catch (error) {
    console.error("Erreur dans le contrôleur de suggestions d'adresse:", error);

    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof AddressServiceError) {
      return res.status(500).json({ message: error.message });
    }

    res.status(500).json({
      message: "Erreur lors de la récupération des suggestions d'adresse.",
    });
  }
};
