const { google } = require("googleapis");
const jwtClient = require("../google-analytics-auth");

async function getTotalCustomers() {
  const analyticsreporting = google.analyticsreporting("v4");

  // ID de vue de votre propriété Google Analytics
  const VIEW_ID = process.env.VIEW_ID;

  // Paramètres de la requête
  const startDate = "7daysAgo"; // Date de début (7 jours avant aujourd'hui)
  const endDate = "today"; // Date de fin (aujourd'hui)
  const metric = { expression: "ga:users" }; // Métrique pour le nombre d'utilisateurs

  // Configuration de la requête
  const request = {
    auth: jwtClient,
    resource: {
      reportRequests: [
        {
          viewId: VIEW_ID,
          dateRanges: [{ startDate, endDate }],
          metrics: [metric],
        },
      ],
    },
  };

  try {
    const response = await analyticsreporting.reports.batchGet(request);
    const data = response.data;
    const report = data.reports[0];
    const rows = report.data.rows;

    if (rows && rows.length > 0) {
      const totalCustomers = parseInt(rows[0].metrics[0].values[0]);
      return totalCustomers;
    } else {
      console.log("Aucune donnée disponible.");
      return 0; // Vous pouvez gérer la valeur par défaut en cas de données absentes
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données Google Analytics :",
      error
    );
    throw error; // Gérer l'erreur ou la propager vers la route
  }
}

module.exports = { getTotalCustomers };
