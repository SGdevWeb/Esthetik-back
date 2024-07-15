const contactService = require("../services/contactService");

const sendContactEmail = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    await contactService.sendContactEmail(firstName, lastName, email, message);

    res.status(200).json({ message: "Email envoyés avec succès" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'envoi de l'email de contact." });
  }
};

module.exports = { sendContactEmail };
