const googleAnalyticsService = require("../services/googleAnalyticsService");

async function getTotalCustomers(req, res) {
  try {
    const totalCustomers = await googleAnalyticsService.getTotalCustomers();
    res.json({ totalCustomers });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données Google Analytics :",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des données Google Analytics",
    });
  }
}

module.exports = { getTotalCustomers };
