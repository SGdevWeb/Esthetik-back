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
    services
  ) {
    // Vérifier la disponibilité du créneau
    const slotDetails = await slotService.getSlotById(selectedSlot);
    if (!slotDetails) {
      throw new Error("Créneau non trouvé.");
    }
    if (slotDetails.is_booked) {
      throw new Error("Ce créneau est déjà réservé.");
    }

    // Récupérer les détails des services
    const servicesDetails = await Promise.all(
      services.map(async (service) => {
        return await serviceService.getServiceById(service.serviceId);
      })
    );

    const servicesContent = servicesDetails
      .map((serviceDetail) => {
        return `${serviceDetail.title} -> ${serviceDetail.price}`;
      })
      .join("\n");

    // Créer les messages pour l'utilisateur et l'administrateur
    const userMessage = createUserMessage(
      firstName,
      lastName,
      selectedDate,
      slotDetails,
      servicesContent
    );
    const adminMessage = createAdminMessage(
      firstName,
      lastName,
      selectedDate,
      slotDetails,
      servicesContent
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
