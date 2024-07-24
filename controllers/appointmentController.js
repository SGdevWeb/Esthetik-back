const emailService = require("../services/emailService");
const bookingService = require("../services/bookingService");
const slotService = require("../services/slotService");
const appointmentService = require("../services/appointmentService");
const {
  EmailServiceError,
  QueryError,
  MessageCreationError,
  SlotError,
} = require("../services/errorService");

const createAppointment = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    selectedDate,
    selectedSlot,
    services,
    prestations,
  } = req.body;

  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !address ||
      !selectedDate ||
      !selectedSlot ||
      !services ||
      !prestations
    ) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires." });
    }

    const { userMessage, adminMessage, appointmentId } =
      await bookingService.createBooking(
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        selectedDate,
        selectedSlot,
        prestations
      );

    try {
      await appointmentService.insertAppointmentServices(
        appointmentId,
        services
      );
      await slotService.updateSlotWithAppointmentId(
        selectedSlot,
        appointmentId
      );
      await slotService.updateSlotToBooked(selectedSlot);
    } catch (error) {
      if (error instanceof QueryError) {
        console.error(
          "Erreur lors de la mise à jour du rendez-vous ou des créneaux : ",
          error
        );
        return res.status(500).json({
          message: error.message,
        });
      }
      console.error(
        "Erreur lors de la mise à jour du rendez-vous ou des créneaux : ",
        error
      );
      return res.status(500).json({
        message:
          "Erreur lors de la mise à jour du rendez-vous ou des créneaux.",
      });
    }

    await emailService.sendEmail(
      email,
      "Votre nouveau rendez-vous",
      userMessage
    );

    await emailService.sendEmail(
      "contact@xn--clatdebeaut-99al.fr",
      "Félicitation ! Vous avez un nouveau rendez-vous",
      adminMessage
    );

    res.status(200).json({ message: "Rendez-vous créé et emails envoyés." });
  } catch (error) {
    if (
      error instanceof EmailServiceError ||
      error instanceof SlotError ||
      error instanceof MessageCreationError ||
      error instanceof QueryError
    ) {
      return res.status(500).json({ message: error.message });
    }
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
    if (error instanceof QueryError) {
      console.error("Erreur lors de la récupération des rendez-vous : ", error);
      return res.status(500).json({
        message: error.message,
      });
    }
    console.error("Erreur lors de la récupération des rendez-vous : ", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des rendez-vous.",
    });
  }
};

const getAppointmentsWithDetails = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointmentsWithDetails();
    res.json(appointments);
  } catch (error) {
    if (error instanceof QueryError) {
      console.error(
        "Erreur lors de la récupération des rendez-vous détaillés : ",
        error
      );
      return res.status(500).json({
        message: error.message,
      });
    }
    console.error(
      "Erreur lors de la récupération des rendez-vous détaillés : ",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des rendez-vous détaillés.",
    });
  }
};

const confirmAppointment = async (req, res) => {
  try {
    const { appointmentId, appointment } = req.body;
    await appointmentService.confirmAppointment(appointmentId, appointment);
    res.status(200).json({ message: "Rendez-vous confirmé et email envoyé" });
  } catch (error) {
    console.error("Erreur lors de la confirmation du rendez-vous : ", error);
    if (
      error instanceof QueryError ||
      error instanceof EmailServiceError ||
      error instanceof MessageCreationError
    ) {
      return res.status(500).json({ message: error.message });
    }
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
    console.error(
      "Erreur lors de la récupération des rendez-vous groupés : ",
      error
    );
    if (error instanceof QueryError) {
      return res.status(500).json({
        message: error.message,
      });
    }
    res.status(500).json({
      message: "Erreur lors de la récupération des rendez-vous groupés",
    });
  }
};

const deleteAppointmentServices = async (req, res) => {
  const appointmentId = req.params.appointmentId;

  try {
    const appointment = await appointmentService.getAppointmentById(
      appointmentId
    );

    if (!appointment) {
      return res.status(404).json({ message: "Rendez-vous non trouvé." });
    }

    await appointmentService.deleteAppointmentServices(appointmentId);

    res.status(200).json({
      message: "Les services du rendez-vous ont été supprimés avec succès.",
    });
  } catch (error) {
    console.error(
      "Erreur lors de la suppression des prestations du rendez-vous :",
      error
    );
    if (error instanceof QueryError) {
      return res.status(500).json({
        message: error.message,
      });
    }
    res.status(500).json({
      message: "Erreur lors de la suppression des prestations du rendez-vous.",
    });
  }
};

const addAppointmentServices = async (req, res) => {
  const appointmentId = req.params.appointmentId;
  const services = req.body.services;

  try {
    const appointment = await appointmentService.getAppointmentById(
      appointmentId
    );
    if (!appointment) {
      return res.status(404).json({ message: "Rendez-vous non trouvé." });
    }

    await appointmentService.addAppointmentServices(appointmentId, services);

    res.status(200).json({
      message: "Les prestations ont été ajoutés au rendez-vous avec succès.",
    });
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout des prestations au rendez-vous :",
      error
    );
    if (error instanceof QueryError) {
      return res.status(500).json({
        message: error.message,
      });
    }
    res.status(500).json({
      message: "Erreur lors de l'ajout des prestations au rendez-vous.",
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentsWithDetails,
  confirmAppointment,
  getgroupedAppointments,
  deleteAppointmentServices,
  addAppointmentServices,
};
