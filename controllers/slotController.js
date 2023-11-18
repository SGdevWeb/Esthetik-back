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

const getAvailableSlots = async (req, res) => {
  try {
    const slots = await slotService.getAvailableSlots();
    if (slots.length === 0) {
      return res.status(200).json([]);
    }
    res.json(slots);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des créneaux" });
  }
};

const getSlotsWithDetails = async (req, res) => {
  try {
    const slots = await slotService.getSlotsWithDetails();
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

    if (!Array.isArray(slots)) {
      return res.status(400).json({
        message: "Le corps de la requête doit contenir un tableau de créneaux.",
      });
    }

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

const getOneSlot = async (req, res) => {
  try {
    const slotId = req.params.id;

    if (!slotId) {
      return res.status(400).json({ error: "ID du créneau manquant" });
    }

    const slot = await slotService.getSlotById(slotId);

    if (!slot) {
      return res.status(404).json({ error: "Créneau non trouvé" });
    }

    res.json(slot);
  } catch (error) {
    console.error("Erreur lors de la récupération du créneau : ", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du créneau" });
  }
};

const deleteSlot = async (req, res) => {
  try {
    const slotId = req.params.id;

    if (!slotId) {
      return res.status(400).json({ error: "ID du créneau manquant" });
    }

    const result = await slotService.deleteSlotById(slotId);

    if (result === 0) {
      return res.status(404).json({ error: "Créneau non trouvé" });
    }

    res.status(200).json({ message: "Créneau supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du créneau : ", error);
    res.status(500).json({ error: "Erreur lors de la suppression du créneau" });
  }
};

const updateSlot = async (req, res) => {
  try {
    const slotId = req.params.id;
    const updatedSlot = req.body;
    console.log(updatedSlot);

    if (!slotId) {
      return res.status(400).json({ error: "Id du créneau manquant" });
    }

    const result = await slotService.updateSlotById(slotId, updatedSlot);

    if (result === 0) {
      return res
        .status(404)
        .json({ error: "Créneau non trouvé ou pas de changement effectué" });
    }

    res.status(200).json({ message: "Créneau mis à jour avec succès" });
  } catch (error) {
    console.log("Erreur lors de la mise à jour du créneau : ", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du créneau" });
  }
};

module.exports = {
  getSlots,
  addSlots,
  getOneSlot,
  getAvailableSlots,
  getSlotsWithDetails,
  deleteSlot,
  updateSlot,
};
