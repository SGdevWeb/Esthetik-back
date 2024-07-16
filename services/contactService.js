const messageService = require("./messageService");
const { ValidationError, EmailServiceError } = require("./errorService");

const sendContactEmail = async (firstName, lastName, email, message) => {
  if (!firstName || !lastName || !email || !message) {
    throw new ValidationError("Tous les champs sont requis");
  }

  const contactMessage = messageService.createContactMessage(
    firstName,
    lastName,
    message
  );

  try {
    await emailService.sendEmail(
      "contact@xn--clatdebeaut-99al.fr",
      "Nouveau message de contact",
      contactMessage,
      null,
      email
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail de contact:", error);
    throw new EmailServiceError("Echec de l'envoi de l'email de contact");
  }
};

module.exports = { sendContactEmail, ValidationError, EmailServiceError };
