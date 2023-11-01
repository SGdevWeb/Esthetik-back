const emailService = require("../services/emailService");
const bookingService = require("../services/bookingService");
const slotService = require("../services/slotService");
const appointmentService = require("../services/appointmentService");

const createAppointment = async (req, res) => {
  const { firstName, lastName, email, selectedDate, selectedSlot, services } =
    req.body;

  try {
    const { userMessage, adminMessage, appointmentId } =
      await bookingService.createBooking(
        firstName,
        lastName,
        email,
        selectedDate,
        selectedSlot,
        services
      );

    await appointmentService.insertAppointmentServices(appointmentId, services);

    await emailService.sendEmail(
      email,
      "Votre nouveau rendez-vous",
      userMessage
    );

    await emailService.sendEmail(
      "gustin.samuel@gmail.com",
      "Félicitation ! Vous avez un nouveau rendez-vous",
      adminMessage
    );

    await slotService.updateSlotWithAppointmentId(selectedSlot, appointmentId);

    await slotService.updateSlotToBooked(selectedSlot);

    res.status(200).json({ message: "Rendez-vous créé et emails envoyés." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création du rendez-vous." });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des rendez-vous",
    });
  }
};

const getAppointmentsWithDetails = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointmentsWithDetails();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des rendez-vous",
    });
  }
};

const confirmAppointment = async (req, res) => {
  try {
    const { appointmentId, appointment } = req.body;
    await appointmentService.confirmAppointment(appointmentId, appointment);
    res.status(200).json({ message: "Rendez-vous confirmé et email envoyé" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la confirmation du rendez-vous" });
  }
};

const getgroupedAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getgroupedAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des rendez-vous",
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentsWithDetails,
  confirmAppointment,
  getgroupedAppointments,
};
