require('dotenv').config();
const jwt = require('jsonwebtoken');
const Appointment = require('../models/appointmentModel');
const Business = require('../models/businessModel');
const {SubBusiness} = require('../models/businessModel');
const User = require('../models/userModel');
const Popularity =  require('../services/popularity');


class AppointmentController {

    static async makeAppointment(req, res) {
        try {
            const { business_id, date, start_time, end_time, is_sub } = req.body;
            const user_id = req._id;

            const existingUser = await User.findById(user_id);
            if (!existingUser) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }
            if(!is_sub){
                const existingBusiness = await Business.findOne({_id:business_id, b_type:"main"});
                if (!existingBusiness) {
                    return res.status(404).json({ message: 'Business not found' });
                }
                if(existingBusiness.has_sub){
                    return res.status(401).json({ message: 'This business working with sub.' });
                }
            }
            else{
                const existingSubBusiness = await SubBusiness.findOne({_id:business_id, b_type:"sub"});
                if (!existingSubBusiness) {
                    return res.status(404).json({ message: 'Sub-business not found' });
                }

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

            if(!is_sub){
                await Popularity.updatePopularity(business_id,"forMake");
            }else{
                const subB = await SubBusiness.findOne({ _id:business_id, b_type:"sub" });
                await Popularity.updatePopularity(subB.business_id,"forMake");
            }
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

    static async getAppointmentsByDate(req, res) {
        try {
            const { business_id, start_date, end_date } = req.body;
            const startDate = new Date(start_date + 'Z');
            const endDate = new Date(end_date + 'Z');

            const appointments = await Appointment.find({
                business_id: business_id,
                'status': { $in: ['pending', 'approved'] },
                'start_time': { $gte: startDate, $lte: endDate },
            }).sort({ 'start_time': 1 }).select('-createdAt -updatedAt -__v');

            return res.status(200).json({ status: 'success', data:{ appointments: appointments } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }    
    
    static async getAppointmentsByType(req, res) {
        try {
            const { id, start_date, type } = req.body;
            const _id = req._id;

            const startDate = new Date(start_date + 'Z');

            const existingUser = await Business.findById(_id);
            if (!existingUser) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }

            if(type == "all"){

                const appointments = await Appointment.find({
                    business_id: id,
                    'start_time': { $gte: startDate },
                }).sort({ 'start_time': 1 }).select('-createdAt -updatedAt -__v');

                return res.status(200).json({ status: 'success', appointments});
            }
            else if(type == "pending"){

                const appointments = await Appointment.find({
                    business_id: id,
                    'start_time': { $gte: startDate },
                    'status' : 'pending'
                }).sort({ 'start_time': 1 }).select('-createdAt -updatedAt -__v');

                return res.status(200).json({ status: 'success', appointments});
            }
            else if(type == "approved"){

                const appointments = await Appointment.find({
                    business_id: id,
                    'start_time': { $gte: startDate },
                    'status' : 'approved'
                }).sort({ 'start_time': 1 }).select('-createdAt -updatedAt -__v');

                return res.status(200).json({ status: 'success', appointments});
            }
            else if(type == "rejected"){

                const appointments = await Appointment.find({
                    business_id: id,
                    'start_time': { $gte: startDate },
                    'status' : 'rejected'
                }).sort({ 'start_time': 1 }).select('-createdAt -updatedAt -__v');

                return res.status(200).json({ status: 'success', appointments});
            }
            else if(type == "past"){

                const appointments = await Appointment.find({
                    business_id: id,
                    'start_time': { $lte: startDate },
                }).sort({ 'start_time': -1 }).select('-createdAt -updatedAt -__v');

                return res.status(200).json({ status: 'success', appointments});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    //User
    static async getMyAppointments(req, res) {
        try {
            const user_id = req._id;
            const { type,startDate } = req.query;

            const existingUser = await User.findById(user_id);
            if (!existingUser) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }
            
            if(type == 'past'){

                const appointments = await Appointment.find({
                    user_id: user_id,
                    'start_time': { $lte: startDate },
                }).sort({ 'start_time': -1 }).limit(50).select('-createdAt -updatedAt -__v');
    
                return res.status(200).json({ status: 'success', data:{ appointments: appointments } });
            }
            else{
                const appointments = await Appointment.find({
                    user_id: user_id,
                    'start_time': { $gte: startDate },
                }).sort({ 'start_time': 1 }).limit(50).select('-createdAt -updatedAt -__v');
    
                return res.status(200).json({ status: 'success', data:{ appointments: appointments } });

            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    //Business
    static async closeAppointment(req, res){
        
        try {
            const {date, start_time, end_time, is_sub, sub_id } = req.body;
            const business_id = req._id;
            const app_business_id = is_sub ? sub_id : req._id;

            if(!is_sub){
                const existingBusiness = await Business.findOne({_id:business_id, b_type:"main"});
                if (!existingBusiness) {
                    return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
                }
                if(existingBusiness.has_sub){
                    return res.status(401).json({ message: 'This business working with sub.' });
                }
            }
            else{
                const existingBusiness = await Business.findOne({_id:business_id, b_type:"main"});
                if (!existingBusiness) {
                    return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
                }

                const existingSubBusiness = await SubBusiness.findOne({ _id: sub_id, b_type:"sub" });
                if (!existingSubBusiness) {
                    return res.status(404).json({ message: 'Sub-business not found' });
                }
                if (existingSubBusiness.business_id != business_id) {
                    return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
                }
            }
            

            const existingAppointment = await Appointment.findOne({
                'business_id':app_business_id,
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
                'business_id':app_business_id,
                date,
                start_time : new Date(start_time + 'Z'),
                end_time : new Date(end_time + 'Z'),
                type: "closed",
                status: "closed",
            });

            await Popularity.updatePopularity(business_id,"forClose");
            await appointment.save();
            return res.status(200).json({ status: 'success', message: 'Appointment closed successfully' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    //Business
    static async approveAppointment(req, res){
        try {
            const { appointment_id, is_sub, sub_id } = req.body;
            const business_id = req._id;
            const app_business_id = is_sub ? sub_id : req._id;

            if(!is_sub){
                const existingBusiness = await Business.findOne({_id:business_id, b_type:"main"});
                if (!existingBusiness) {
                    return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
                }
                if(existingBusiness.has_sub){
                    return res.status(401).json({ message: 'This business working with sub.' });
                }
            }
            else{
                const existingBusiness = await Business.findOne({_id:business_id, b_type:"main"});
                if (!existingBusiness) {
                    return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
                }

                const existingSubBusiness = await SubBusiness.findOne({ _id: sub_id, b_type:"sub" });
                if (!existingSubBusiness) {
                    return res.status(404).json({ message: 'Sub-business not found' });
                }
                if (existingSubBusiness.business_id != business_id) {
                    return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
                }
            }
            

            const appointment = await Appointment.findOne({ _id:appointment_id });
            if (!appointment) {
                return res.status(400).json({ message: 'Appointment not found' });
            }

            if (appointment.business_id != app_business_id) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }
            
            if (appointment.status == "approved"){
                return res.status(400).json({ message: 'Appointment already approved' });
            }
            
            appointment.status = "approved";
            appointment.updatedAt = Date.now();
            
            await Popularity.updatePopularity(business_id,"forApprove");
            await appointment.save();
            return res.status(200).json({ status: 'success', message: 'Appointment approved successfully' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

    }
    //Business
    static async rejectAppointment(req, res){
        try {
            const { appointment_id, closed, is_sub, sub_id} = req.body;
            const business_id = req._id;
            const app_business_id = is_sub ? sub_id : req._id;

            if(!is_sub){
                const existingBusiness = await Business.findOne({_id:business_id, b_type:"main"});
                if (!existingBusiness) {
                    return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
                }
                if(existingBusiness.has_sub){
                    return res.status(401).json({ message: 'This business working with sub.' });
                }
            }
            else{
                const existingBusiness = await Business.findOne({_id:business_id, b_type:"main"});
                if (!existingBusiness) {
                    return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
                }

                const existingSubBusiness = await SubBusiness.findOne({ _id: sub_id, b_type:"sub" });
                if (!existingSubBusiness) {
                    return res.status(404).json({ message: 'Sub-business not found' });
                }
                if (existingSubBusiness.business_id != business_id) {
                    return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
                }
            }

            const appointment = await Appointment.findOne({ _id:appointment_id });
            if (!appointment) {
                return res.status(400).json({ message: 'Appointment not found' });
            }

            if (appointment.business_id != app_business_id) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }

            if(closed){
                if (appointment.status == "rejected" && appointment.type == "closed" ) {
                    return res.status(400).json({ message: 'Appointment already rejected and closed' });
                }
                else if (appointment.status == "rejected"){
                    appointment.type = "closed";
                    await appointment.save();
                    return res.status(200).json({ status: 'success', message: 'Appointment closed successfully' });
                }
            }
            else{
                if (appointment.status == "rejected"){
                    return res.status(400).json({ message: 'Appointment already rejected' });
                }
            }
            
            appointment.status = "rejected";
            appointment.updatedAt = Date.now();
            if(closed){
                appointment.type = "closed";
                await appointment.save();
                return res.status(200).json({ status: 'success', message: 'Appointment rejected and closed successfully' });
            }
            
            await Popularity.updatePopularity(business_id,"forReject");
            await appointment.save();
            return res.status(200).json({ status: 'success', message: 'Appointment rejected successfully' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    //User
    static async cancelAppointment(req, res){
        try {
            const { appointment_id } = req.body;
            const user_id = req._id;

            const existingUser = await User.findById(user_id);
            if (!existingUser) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }

            const appointment = await Appointment.findOne({ _id:appointment_id });
            if (!appointment) {
                return res.status(400).json({ message: 'Appointment not found' });
            }

            if (appointment.user_id != user_id) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }
            
            if (appointment.status == "canceled"){
                return res.status(400).json({ message: 'Appointment canceled approved' });
            }
            
            appointment.status = "canceled";
            appointment.updatedAt = Date.now();
            await appointment.save();
            return res.status(200).json({ status: 'success', message: 'Appointment canceled successfully' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

    }
    



}



module.exports = AppointmentController;