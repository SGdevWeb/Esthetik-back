const slotService = require("./slotService");
const serviceService = require("./serviceService");
const { createUserMessage, createAdminMessage } = require("./messageService");
const appointmentService = require("./appointmentService");

module.exports = {
  createBooking: async function (
    firstName,
    lastName,
    email,
    selectedDate,
    selectedSlot,
    prestations
  ) {
    // Vérifier la disponibilité du créneau
    const slotDetails = await slotService.getSlotById(selectedSlot);
    if (!slotDetails) {
      throw new Error("Créneau non trouvé.");
    }
    if (slotDetails.is_booked) {
      throw new Error("Ce créneau est déjà réservé.");
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
  },
};
