const { formatDate } = require("./dateService");

const createUserMessage = (
  firstName,
  lastName,
  selectedDate,
  slotDetails,
  servicesContent
) => {
  const userMessage = `
    <p>Bonjour ${firstName} ${lastName},</p>

    <p>Votre réservation pour le ${formatDate(
      selectedDate,
      slotDetails.start_time
    )} a bien été prise en compte.</p>

    <p>Prestations réservées :</p> 
    <p>${servicesContent}</p>

    <p>Vous recevrez un mail de confirmation très prochainement.</p>

    
    <p>Merci de votre confiance.</p>

    <p>Eclat de beauté by virginie</p>
    `;

  return userMessage;
};

const createAdminMessage = (
  firstName,
  lastName,
  selectedDate,
  slotDetails,
  servicesContent
) => {
  const dashboardLink = "http://éclatdebeauté.fr/admin";

  const adminMessage = `
  <p>Bonjour Virginie,</p>

  <p>Vous avez une nouvelle demande de rendez-vous pour le ${formatDate(
    selectedDate,
    slotDetails.start_time
  )} , pour ${firstName} ${lastName}.</p>

  <p>Prestation(s) à réaliser :</p> 
  <p>${servicesContent}</p>

  <p>Merci de confirmer celui-ci rapidement en vous <a href="${dashboardLink}">connectant sur votre dashboard</a>.</p>
  `;

  return adminMessage;
};

const createConfirmMessage = (
  firstname,
  lastname,
  date,
  start_time,
  prestations
) => {
  const confirmMessage = `
  <p>Bonjour ${firstname} ${lastname},</p>

  <p>Votre rendez-vous du ${formatDate(date, start_time)} a été confirmé.</p>

  <p>Prestations demandées :<br> 
    ${prestations
      .map(
        (prestation) => `
        - ${prestation.type} : ${prestation.prestation}`
      )
      .join("<br>")}
  </p>

  <p>A bientôt</p>

  <p>Eclat de beauté by Virginie</p>
  `;

  return confirmMessage;
};

module.exports = {
  createUserMessage,
  createAdminMessage,
  createConfirmMessage,
};
