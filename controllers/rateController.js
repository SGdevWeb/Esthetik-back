const { QueryError } = require("../services/errorService");
const rateService = require("../services/rateService");

const getRates = async (req, res) => {
  try {
    const rates = await rateService.getRates();
    res.json(rates);
  } catch (error) {
    console.error("Erreur lors de la récupération des tarifs : ", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tarifs" });
  }
};

const getRateIdByName = async (req, res) => {
  const rateName = req.params.name;
  try {
    const data = await rateService.getRateIdByName(rateName);
    if (data.length === 0) {
      return res.status(404).json({ message: "Le tarif n'a pas été trouvé" });
    }
    const rateId = data[0].id;
    res.json(rateId);
  } catch {
    console.error("Erreur lors de la récupération de l'id du tarif : ", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({
      error: "Erreur lors de la récupération de l'id du tarif",
    });
  }
};

const getRateById = async (req, res) => {
  const rateId = req.params.id;
  try {
    const rate = await rateService.getRateById(rateId);
    if (!rate) {
      return res.status(404).json({ message: "Tarif non trouvé." });
    }
    res.status(200).json(rate);
  } catch {
    console.error("Erreur lors de la récupération du tarif : ", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({
      error: "Erreur lors de la récupération du tarif : ",
    });
  }
};

const addRate = async (req, res) => {
  const { name, description, img_name, img_title } = req.body;
  try {
    const newRate = await rateService.addRate(
      name,
      description,
      img_name,
      img_title
    );
    res.status(201).json(newRate);
  } catch (error) {
    console.error("Erreur lors de l'ajout du tarif : ", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({
      error: "Erreur lors de l'ajout du tarif",
    });
  }
};

const updateRate = async (req, res) => {
  const rateId = req.params.id;
  const newData = req.body;
  try {
    const updatedRate = await rateService.updateRate(rateId, newData);
    res.status(200).json(updatedRate);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du tarif : ${error}`);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ error: "Erreur lors de la mise à jour du tarif." });
  }
};

const deleteRate = async (req, res) => {
  const rateId = req.params.id;
  try {
    const rowsAffected = await rateService.deleteRateById(rateId);
    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ message: "Type de prestation non trouvée." });
    }
    res
      .status(200)
      .json({ message: "Type de prestation supprimée avec succès." });
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du type de prestation :",
      error
    );
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({
      message: "Erreur lors de la suppression du type de prestation.",
    });
  }
};

module.exports = {
  getRates,
  getRateIdByName,
  getRateById,
  addRate,
  updateRate,
  deleteRate,
};
