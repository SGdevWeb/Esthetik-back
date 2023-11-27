const express = require("express");
const appointmentController = require("../controllers/appointmentController");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/appointment/create", appointmentController.createAppointment);
router.get("/appointments", appointmentController.getAppointments);
router.get(
  "/appointments/details",
  appointmentController.getAppointmentsWithDetails
);
router.get(
  "/appointments/grouped",
  appointmentController.getgroupedAppointments
);
router.post(
  "/appointments/confirm",
  auth,
  appointmentController.confirmAppointment
);
router.delete(
  "/appointments/:appointmentId/services",
  auth,
  appointmentController.deleteAppointmentServices
);
router.post(
  "/appointments/:appointmentId/services",
  auth,
  appointmentController.addAppointmentServices
);

module.exports = router;
