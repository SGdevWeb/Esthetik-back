const axios = require("axios");
const { ValidationError, AddressServiceError } = require("./errorService");

const formatAddress = (data) => {
  return data.features.map((item) => {
    const { housenumber, street, postcode, city, id } = item.properties;
    const address = `${housenumber ? housenumber + " " : ""}${street || ""}, ${
      postcode || ""
    } ${city || ""}`.trim();
    return { address, osm_id: id };
  });
};

const getAutocompleteSuggestions = async (query) => {
  if (!query) {
    throw new ValidationError("Un paramètre de requête est nécessaire");
  }

  try {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
      query
    )}&limit=15`;

    const response = await axios.get(url);

    return formatAddress(response.data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des suggestions d'adresse : ",
      error
    );
    throw new AddressServiceError(
      "Échec de l'extraction des suggestions d'adresses"
    );
  }
};

module.exports = {
  getAutocompleteSuggestions,
};
