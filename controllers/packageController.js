const { QueryError } = require("../services/errorService");
const packageService = require("../services/packageService");

const getPackageByRateId = async (req, res) => {
  const rateId = req.params.id;
  try {
    const package = await packageService.getPackageByRateId(rateId);
    res.json(package);
  } catch (error) {
    console.error("Erreur lors de la récupération des forfaits :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des forfaits." });
  }
};

const deletePackage = async (req, res) => {
  const PackageId = req.params.id;
  try {
    const rowsAffected = await packageService.deletePackageById(PackageId);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "Forfait non trouvée." });
    }
    res.status(200).json({ message: "Forfait supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du forfait :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du forfait." });
  }
};

const createPackage = async (req, res) => {
  try {
    const { name, rateId, discounts } = req.body;
    if (!name || !rateId || !discounts) {
      return res
        .status(400)
        .json({ error: "Nom, ID du tarif et réductions sont requis." });
    }
    const newPackage = await packageService.createPackage(
      name,
      rateId,
      discounts
    );
    return res.status(201).json(newPackage);
  } catch (error) {
    console.error("Erreur lors de la création du forfait :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: "Erreur lors de la création du forfait." });
  }
};

const updatePackage = async (req, res) => {
  const packageId = req.params.id;
  const updatedPackage = req.body;
  const { name, rateId, discounts } = updatedPackage;

  try {
    const rowsAffected = await packageService.updatePackage(
      packageId,
      rateId,
      name,
      discounts
    );
    if (rowsAffected === 0) {
      return res.status(404).json({ message: "Forfait non trouvé" });
    }
    res.status(200).json({ message: "Forfait mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du forfait :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du forfait." });
  }
};

module.exports = {
  getPackageByRateId,
  deletePackage,
  createPackage,
  updatePackage,
};
