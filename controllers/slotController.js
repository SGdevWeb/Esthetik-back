const slotService = require("../services/slotService");

const getSlots = async (req, res) => {
  try {
    const slots = await slotService.getSlots();
    res.json(slots);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des créneaux" });
  }
};

const addSlots = async (req, res) => {
  console.log(req.body);
  try {
    const slots = req.body;

    // Valider les données entrantes
    if (!Array.isArray(slots)) {
      return res.status(400).json({
        message: "Le corps de la requête doit contenir un tableau de créneaux.",
      });
    }

    // Validation basique des créneaux (vous pourriez avoir besoin de validations plus détaillées)
    for (let slot of slots) {
      if (!slot.date || !slot.startTime || !slot.endTime) {
        return res.status(400).json({
          message:
            "Chaque créneau doit avoir une date, une heure de début et une heure de fin.",
        });
      }
    }

    const result = await slotService.addSlots(slots);
    console.log("result", result);
    res
      .status(201)
      .json({ message: `${result.affectedRows} créneaux ajoutés avec succès` });
  } catch (error) {
    console.error("Erreur lors de l'ajout des créneaux : ", error);
    res.status(500).json({ error: "Erreur lors de l'ajout de créneaux" });
  }
};

module.exports = {
  getSlots,
  addSlots,
};
