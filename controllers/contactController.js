const contactService = require("../services/contactService");
const {
  ValidationError,
  EmailServiceError,
} = require("../services/errorService");

const sendContactEmail = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    await contactService.sendContactEmail(firstName, lastName, email, message);

    res.status(200).json({ message: "Email envoyés avec succès" });
  } catch (error) {
    console.error(error);

    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof EmailServiceError) {
      return res.status(500).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de l'envoi de l'email de contact." });
  }
};

module.exports = { sendContactEmail };
