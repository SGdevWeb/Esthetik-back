const db = require("../db/dbConfig");
const emailService = require("./emailService");
const messageService = require("./messageService");

const addAppointment = async (firstname, lastname, email) => {
  const query =
    "INSERT INTO appointment (firstname, lastname, email) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.query(query, [firstname, lastname, email], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.insertId); // Renvoie l'id de l'appointment crée
      }
    });
  });
};

const confirmAppointment = async (appointmentId, appointment) => {
  // Confirmation du rdv dans la bdd
  await updateAppointmentToConfirmed(appointmentId);

  // Envoie d'un email de confirmation au client
  const { firstname, lastname, email, date, start_time, prestations } =
    appointment;
  const message = messageService.createConfirmMessage(
    firstname,
    lastname,
    date,
    start_time,
    prestations
  );
  await emailService.sendEmail(
    email,
    "Confirmation de votre rendez-vous",
    message
  );
};

const updateAppointmentToConfirmed = (appointmentId) => {
  const query = "UPDATE appointment SET is_confirmed = 1 WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [appointmentId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const insertAppointmentServices = async (appointmentId, services) => {
  const promises = services.map((service) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO appointment_service(appointment_id, service_id) VALUES (?, ?)";
      db.query(query, [appointmentId, service.serviceId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });

  return Promise.all(promises);
};

const getAppointments = async () => {
  const query = "SELECT * FROM appointment ORDER BY created_at";

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getAppointmentsWithDetails = async () => {
  const query = `
  SELECT
    a.id AS appointment_id,
    a.firstname,
    a.lastname,
    a.email,
    r.name AS 'type_de_prestation',
    s.title AS prestation,
    slot.date,
    slot.start_time,
    a.is_confirmed
  FROM
    appointment a
  JOIN 
    appointment_service aps ON aps.appointment_id = a.id
  JOIN 
    service s ON aps.service_id = s.id
  JOIN 
    slot ON slot.appointment_id = a.id
  JOIN 
    rate r ON r.id = s.rate_id
  `;

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getAppointmentById = async (appointmentId) => {
  const query = "SELECT * FROM appointment WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [appointmentId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const getAppointmentWithDetailsById = async (appointmentId) => {
  const query = `
  SELECT
    a.id AS appointment_id,
    a.firstname,
    a.lastname,
    a.email,
    r.name AS 'type_de_prestation',
    s.title AS prestation,
    slot.date,
    slot.start_time,
    a.is_confirmed
  FROM
    appointment a
  JOIN 
    appointment_service aps ON aps.appointment_id = a.id
  JOIN 
    service s ON aps.service_id = s.id
  JOIN 
    slot ON slot.appointment_id = a.id
  JOIN 
    rate r ON r.id = s.rate_id
  WHERE 
    a.id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [appointmentId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const getgroupedAppointments = async () => {
  const appointments = await getAppointmentsWithDetails();
  const groupedAppointments = {};

  appointments.forEach((appointment) => {
    const { appointment_id, prestation, type_de_prestation, ...rest } =
      appointment;

    if (!groupedAppointments[appointment_id]) {
      groupedAppointments[appointment_id] = {
        appointment_id,
        ...rest,
        prestations: [
          {
            type: type_de_prestation,
            prestation: prestation,
          },
        ],
      };
    } else {
      groupedAppointments[appointment_id].prestations.push({
        type: type_de_prestation,
        prestation: prestation,
      });
    }
  });

  return groupedAppointments;
};

module.exports = {
  addAppointment,
  getAppointments,
  insertAppointmentServices,
  getAppointmentsWithDetails,
  updateAppointmentToConfirmed,
  confirmAppointment,
  getAppointmentById,
  getAppointmentWithDetailsById,
  getgroupedAppointments,
};
