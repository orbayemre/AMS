const express = require('express');
const AppointmentController = require('../controllers/appointmentController');
const verifyToken = require('../middleware/authMiddleware');
const {makeAppointmentValidation, closeAppointmentValidation} = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/make', verifyToken, makeAppointmentValidation, AppointmentController.makeAppointment); //User
router.post('/get-appointments', verifyToken, AppointmentController.getAppointmentsByDate); //All
router.get('/get-myappointments', verifyToken, AppointmentController.getMyAppointments); //User
router.post('/close', verifyToken, closeAppointmentValidation, AppointmentController.closeAppointment); //Business
router.post('/approve', verifyToken, AppointmentController.approveAppointment); //Business
router.post('/reject', verifyToken, AppointmentController.rejectAppointment); //Business
router.post('/cancel', verifyToken, AppointmentController.cancelAppointment); //User


module.exports = router;