const express = require('express');
const AppointmentController = require('../controllers/appointmentController');
const verifyToken = require('../middleware/authMiddleware');
const {makeAppointmentValidation} = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/make', verifyToken, makeAppointmentValidation, AppointmentController.makeAppointment);


module.exports = router;