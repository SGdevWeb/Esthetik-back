const db = require("../db/dbConfig");
const { QueryError } = require("./errorService");
const { format } = require("date-fns");

const getSlots = () => {
  const query = "SELECT * FROM slot ORDER BY date";

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            "Erreur lors de la récupération des créneaux : ${error.message}"
          )
        );
      } else {
        // conversion de la date en chaîne de caractères
        results.forEach((row) => {
          row.date = format(new Date(row.date), "yyyy-MM-dd");
        });
        resolve(results);
      }
    });
  });
};

const getSlotById = (slotId) => {
  const query = "SELECT * FROM slot WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [slotId], (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération du créneau : ${error.message}`
          )
        );
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          // conversion de la date en chaîne de caractères
          results[0].date = format(new Date(results[0].date), "yyyy-MM-dd");
          resolve(results[0]);
        }
      }
    });
  });
};

const getAvailableSlots = () => {
  const query =
    "SELECT * FROM slot WHERE is_booked = 0 ORDER BY date, start_time";

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération des créneaux disponibles : ${error.message}`
          )
        );
      } else {
        // conversion de la date en chaîne de caractères
        results.forEach((row) => {
          row.date = format(new Date(row.date), "yyyy-MM-dd");
        });
        resolve(results);
      }
    });
  });
};

const getSlotsWithDetails = () => {
  const query = `
  SELECT  slot.*,
          appointment.firstname, 
          appointment.lastname, 
          appointment.email,
          appointment.is_confirmed, 
          service.id AS service_id,
          service.title, 
          service.price,
          rate.name AS type_de_prestation
  FROM slot 
  LEFT JOIN appointment ON slot.appointment_id = appointment.id 
  LEFT JOIN appointment_service ON appointment.id = appointment_service.appointment_id 
  LEFT JOIN service ON appointment_service.service_id = service.id
  LEFT JOIN rate ON service.rate_id = rate.id;
`;

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération des créneaux avec détails : ${error.message}`
          )
        );
      } else {
        results.forEach((row) => {
          row.date = format(new Date(row.date), "yyyy-MM-dd");
        });
        resolve(results);
      }
    });
  });
};

const addSlots = (slots) => {
  const query = "INSERT INTO slot (date, start_time, end_time) VALUES ?";

  const decomposeSlot = (slot) => {
    const startHour = parseInt(slot.startTime.split(":")[0], 10);
    const endHour = parseInt(slot.endTime.split(":")[0], 10);
    const oneHourSlots = [];

    for (let i = startHour; i < endHour; i++) {
      oneHourSlots.push({
        date: slot.date,
        startTime: `${i.toString().padStart(2, "0")}:00`,
        endTime: `${(i + 1).toString().padStart(2, "0")}:00`,
      });
    }
    return oneHourSlots;
  };

  const allOneHourSlots = [];
  slots.forEach((slot) => {
    const decomposedSlots = decomposeSlot(slot);
    allOneHourSlots.push(...decomposedSlots);
  });

  const values = allOneHourSlots.map((slot) => {
    return [slot.date, slot.startTime, slot.endTime];
  });

  return new Promise((resolve, reject) => {
    db.query(query, [values], (error, result) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de l'ajout des créneaux : ${error.message}`
          )
        );
      } else {
        resolve(result);
      }
    });
  });
};

const updateSlotToBooked = (slotId) => {
  const query = "UPDATE slot SET is_booked = 1 WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [slotId], (error, results) => {
      if (error) {
        reject(
          new QueryError(
            "Erreur lors de la mise à jour du créneau pour réserver : ${error.message}"
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

const updateSlotWithAppointmentId = (slotId, appointmentId) => {
  const query = "UPDATE slot SET appointment_id = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [appointmentId, slotId], (error, result) => {
      if (error) {
        reject(
          new QueryError(
            "Erreur lors de la mise à jour du créneau : ${error.message}"
          )
        );
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

const deleteSlotById = (slotId) => {
  const query = "DELETE FROM slot WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [slotId], (error, result) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la suppression du créneau : ${error.message}`
          )
        );
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

const updateSlotById = (slotId, updatedSlot) => {
  const query = "UPDATE slot SET start_time = ?, end_time = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [updatedSlot.start_time, updatedSlot.end_time, slotId],
      (error, result) => {
        if (error) {
          reject(
            new QueryError(
              `Erreur lors de la mise à jour du créneau : ${error.message}`
            )
          );
        } else {
          resolve(result.affectedRows);
        }
      }
    );
  });
};

module.exports = {
  getSlots,
  addSlots,
  getSlotById,
  getSlotsWithDetails,
  updateSlotToBooked,
  getAvailableSlots,
  updateSlotWithAppointmentId,
  deleteSlotById,
  updateSlotById,
};
