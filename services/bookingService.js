const slotService = require("./slotService");
const { createUserMessage, createAdminMessage } = require("./messageService");
const appointmentService = require("./appointmentService");
const { SlotError } = require("./errorService");

module.exports = {
  createBooking: async function (
    firstName,
    lastName,
    email,
    selectedDate,
    selectedSlot,
    prestations
  ) {
    try {
      // Vérifier la disponibilité du créneau
      const slotDetails = await slotService.getSlotById(selectedSlot);
      if (!slotDetails) {
        throw new SlotError("Créneau non trouvé.");
      }
      if (slotDetails.is_booked) {
        throw new SlotError("Ce créneau est déjà réservé.");
      }

      // Créer les messages pour l'utilisateur et l'administrateur
      const userMessage = createUserMessage(
        firstName,
        lastName,
        selectedDate,
        slotDetails,
        prestations
      );
      const adminMessage = createAdminMessage(
        firstName,
        lastName,
        selectedDate,
        slotDetails,
        prestations
      );

      // Ajouter le rendez-vous
      const appointmentId = await appointmentService.addAppointment(
        firstName,
        lastName,
        email
      );

      return { userMessage, adminMessage, appointmentId };
    } catch (error) {
      if (error instanceof SlotError || error instanceof MessageCreationError) {
        throw error;
      }
      console.error("Erreur lors de la création du rendez-vous :", error);
      throw new Error("Erreur lors de la création du rendez-vous.");
    }
  },
};
