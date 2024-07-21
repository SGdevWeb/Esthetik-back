const { QueryError } = require("../services/errorService");
const statService = require("../services/statService");

const getVisitors = async (req, res) => {
  try {
    const visitors = await statService.getVisitors();
    console.log(visitors);
    res.json(visitors);
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
  getVisitors,
};
