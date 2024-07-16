const { formatDate } = require("./dateService");
const { MessageCreationError } = require("./errorService");

const createUserMessage = (
  firstName,
  lastName,
  selectedDate,
  slotDetails,
  prestations
) => {
  try {
    const userMessage = `
    <p>Bonjour ${firstName} ${lastName},</p>

    <p>Votre réservation pour le ${formatDate(
      selectedDate,
      slotDetails.start_time
    )} a bien été prise en compte.</p>

    <p>Prestations réservées :<br> 
    ${prestations
      .map(
        (prestation) => `
        \t - ${prestation}`
      )
      .join("<br>")}
    </p>

    <p>Vous recevrez un mail de confirmation très prochainement.</p>

    
    <p>Merci de votre confiance.</p>

    <p>Eclat de beauté by virginie</p>
    `;

    return userMessage;
  } catch (error) {
    console.error(
      "Erreur lors de la création du message utilisateur : ",
      error
    );
    throw new MessageCreationError(
      "Erreur lors de la création du message utilisateur."
    );
  }
};

const createAdminMessage = (
  firstName,
  lastName,
  selectedDate,
  slotDetails,
  prestations
) => {
  try {
    const dashboardLink = "http://éclatdebeauté.fr/admin";

    const adminMessage = `
    <p>Bonjour Virginie,</p>
  
    <p>Vous avez une nouvelle demande de rendez-vous pour le ${formatDate(
      selectedDate,
      slotDetails.start_time
    )} , pour ${firstName} ${lastName}.</p>
  
    <p>Prestation(s) à réaliser :<br> 
    ${prestations
      .map(
        (prestation) => `
        \t - ${prestation}`
      )
      .join("<br>")}
    </p> 
  
    <p>Merci de confirmer celui-ci rapidement en vous <a href="${dashboardLink}">connectant sur votre dashboard</a>.</p>
    `;

    return adminMessage;
  } catch (error) {
    console.error(
      "Erreur lors de la création du message administrateur : ",
      error
    );
    throw new MessageCreationError(
      "Erreur lors de la création du message administrateur."
    );
  }
};

const createConfirmMessage = (
  firstname,
  lastname,
  date,
  start_time,
  prestations
) => {
  try {
    const confirmMessage = `
    <p>Bonjour ${firstname} ${lastname},</p>
  
    <p>Votre rendez-vous du ${formatDate(date, start_time)} a été confirmé.</p>
  
    <p>Prestations demandées :<br> 
      ${prestations
        .map(
          (prestation) => `
          \t - ${prestation.type} : ${prestation.prestation}`
        )
        .join("<br>")}
    </p>
  
    <p>A bientôt</p>
  
    <p>Eclat de beauté by Virginie</p>
    `;

    return confirmMessage;
  } catch (error) {
    console.error(
      "Erreur lors de la création du message de confirmation de rdv : ",
      error
    );
    throw new MessageCreationError(
      "Erreur lors de la création du message de confirmation de rdv."
    );
  }
};

const createContactMessage = (firstName, lastName, message) => {
  try {
    const contactMessage = `
  <p>Bonjour Virginie,</p>

  <p>Vous avez un nouveau message de ${firstName} ${lastName}.</p>

  <p>${message}</p>
  `;

    return contactMessage;
  } catch (error) {
    console.error("Erreur lors de la création du message de contact : ", error);
    throw new MessageCreationError(
      "Erreur lors de la création du message de contact."
    );
  }
};

module.exports = {
  createUserMessage,
  createAdminMessage,
  createConfirmMessage,
  createContactMessage,
};
