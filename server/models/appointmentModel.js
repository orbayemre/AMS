const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
});

const appointmentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    business_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    date: { type: dateSchema, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    type: { type: String, enum: ['normal', 'closed'], default: 'normal' },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'canceled', 'closed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const Appointment = mongoose.model('Appointment', appointmentSchema,'appointments');

module.exports = Appointment;