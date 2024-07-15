const messageService = require("./messageService");
const emailService = require("./emailService");

const sendContactEmail = async (firstName, lastName, email, message) => {
  const contactMessage = messageService.createContactMessage(
    firstName,
    lastName,
    message
  );

  await emailService.sendEmail(
    "contact@xn--clatdebeaut-99al.fr",
    "Nouveau message de contact",
    contactMessage,
    null,
    email
  );
};

module.exports = { sendContactEmail };
