const axios = require("axios");

const formatAddress = (data) => {
  return data.features.map((item) => {
    const { housenumber, street, postcode, city, osm_id } = item.properties;
    const address = `${housenumber || ""} ${street || ""}, ${postcode || ""} ${
      city || ""
    }`.trim();
    return { address, osm_id };
  });
};

const getAutocompleteSuggestions = async (query) => {
  if (!query) return [];

  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
      query
    )} Nord Hauts-de-France`;

    const response = await axios.get(url);
    console.log(formatAddress(response.data));
    return formatAddress(response.data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des suggestions d'adresse:",
      error
    );
    throw error;
  }
};

module.exports = {
  getAutocompleteSuggestions,
};
