const { QueryError } = require("../services/errorService");
const statService = require("../services/statService");

const getDailyVisitors = async (req, res) => {
  try {
    const dailyVisitors = await statService.getDailyVisitors();
    res.status(200).json(dailyVisitors);
  } catch (error) {
    console.error("Erreur lors de la récupération des stats :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des stats." });
  }
};

const getMostVisitedPage = async (req, res) => {
  try {
    const mostVisitedPage = await statService.getMostVisitedPage();
    res.status(200).json(mostVisitedPage);
  } catch (error) {
    console.error("Erreur lors de la récupération des stats :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des stats." });
  }
};

const getAverageTime = async (req, res) => {
  try {
    const averageTime = await statService.getAverageTime();
    res.status(200).json(averageTime);
  } catch (error) {
    console.error("Erreur lors de la récupération des stats :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des stats." });
  }
};

const getBounceRate = async (req, res) => {
  try {
    const bounceRate = await statService.getBounceRate();
    res.status(200).json(bounceRate);
  } catch (error) {
    console.error("Erreur lors de la récupération des stats :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des stats." });
  }
};

module.exports = {
  getDailyVisitors,
  getMostVisitedPage,
  getAverageTime,
  getBounceRate,
};
