require('dotenv').config();
const jwt = require('jsonwebtoken');
const Appointment = require('../models/appointmentModel');
const Business = require('../models/businessModel');



class AppointmentController {

    static async makeAppointment(req, res) {
        try {
            const { business_id, date, start_time, end_time } = req.body;
            const user_id = req._id;

            
            const existingBusiness = await Business.findById(business_id);
            if (!existingBusiness) {
                return res.status(404).json({ message: 'Business not found' });
            }

            const existingAppointment = await Appointment.findOne({
                business_id,
                'date.day': date.day,
                'date.month': date.month,
                'date.year': date.year,
                'date.start': date.start,
                'date.end': date.end,
            });
            if (existingAppointment) {
                return res.status(400).json({ message: 'Appointment already exists for the selected time' });
            }
            
            const appointment = new Appointment({ 
                user_id, 
                business_id,
                date,
                start_time : new Date(start_time + 'Z'),
                end_time : new Date(end_time + 'Z'),
                type: "normal",
                status: "pending",
            });

            await appointment.save();
            return res.status(201).json({ status: 'success', message: 'Appointment created successfully' });

        } catch (error) {
            if (error.name === 'ValidationError') {
                const errorMessage = error.errors.array()[0]
                return res.status(400).json({ message: errorMessage });
            }
        
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

    }


}



module.exports = AppointmentController;