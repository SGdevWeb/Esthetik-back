const slotService = require("../services/slotService");
const appointmentService = require("../services/appointmentService");

const getSlots = async (req, res) => {
  try {
    const slots = await slotService.getSlots();
    res.json(slots);
  } catch (error) {
    console.error("Erreur lors de la récupération des créneaux :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des créneaux." });
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
    console.error(
      "Erreur lors de la récupération des créneaux disponibles :",
      error
    );
    if (error instanceof QueryError) {
      return res.status(500).json({ error: error.message });
    }
    res.status(500).json({
      error: "Erreur lors de la récupération des créneaux disponibles.",
    });
  }
};

const getSlotsWithDetails = async (req, res) => {
  try {
    const slots = await slotService.getSlotsWithDetails();
    res.json(slots);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des créneaux avec détails :",
      error
    );
    if (error instanceof QueryError) {
      return res.status(500).json({ error: error.message });
    }
    res.status(500).json({
      error: "Erreur lors de la récupération des créneaux avec détails.",
    });
  }
};

const addSlots = async (req, res) => {
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
    console.error("Erreur lors de l'ajout des créneaux :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur lors de l'ajout des créneaux." });
  }
};

const getOneSlot = async (req, res) => {
  const slotId = req.params.id;
  try {
    if (!slotId) {
      return res.status(400).json({ error: "ID du créneau manquant" });
    }

    const slot = await slotService.getSlotById(slotId);

    if (!slot) {
      return res.status(404).json({ error: "Créneau non trouvé" });
    }

    res.json(slot);
  } catch (error) {
    console.error("Erreur lors de la récupération du créneau :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du créneau." });
  }
};

const deleteSlot = async (req, res) => {
  const slotId = req.params.id;

  try {
    if (!slotId) {
      return res.status(400).json({ error: "ID du créneau manquant" });
    }

    const slot = await slotService.getSlotById(slotId);
    if (!slot) {
      return res.status(404).json({ error: "Créneau non trouvé" });
    }

    if (slot.appointment_id) {
      await appointmentService.deleteAppointmentServices(slot.appointment_id);

      const deleteAppointmentResult =
        await appointmentService.deleteAppointmentById(slot.appointment_id);
      if (!deleteAppointmentResult) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la suppression du rendez-vous" });
      }
    }

    const deleteSlotResult = await slotService.deleteSlotById(slotId);
    if (deleteSlotResult === 0) {
      return res
        .status(404)
        .json({ error: "Erreur lors de la suppression du créneau" });
    }

    res
      .status(200)
      .json({ message: "Créneau et rendez-vous lié supprimés avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du créneau :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du créneau." });
  }
};

const updateSlot = async (req, res) => {
  const slotId = req.params.id;
  const updatedSlot = req.body;

  try {
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
    console.error("Erreur lors de la mise à jour du créneau :", error);
    if (error instanceof QueryError) {
      return res.status(500).json({ error: error.message });
    }
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du créneau." });
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
