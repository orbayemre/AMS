require('dotenv').config();
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { createHash } = require('crypto');
const nodemailer = require('nodemailer');
const Business = require('../models/businessModel');


class BusinessController {
    
    static async createBusiness(req, res) {
        try {
            const { name, long_name, phone, email, password, type, content, services, address, working_days, working_hours } = req.body;
            const existingBusiness = await Business.findOne({ email });
            if (existingBusiness) {
                return res.status(400).json({ message: 'Business already exists' });
            }
    
            const newBusiness = new Business({ 
                name, 
                long_name, 
                phone,
                email, 
                password : createHash("md5").update(password).digest("hex"),
                type, 
                content, 
                services,
                address,
                working_days,
                working_hours
            });
            await newBusiness.save();
    
            const token = jwt.sign({ _id: newBusiness._id, email: newBusiness.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    
            return res.status(201).json({ status: 'success', token, data:{ business: newBusiness } });
        } catch (error) {
            
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    static async login(req, res){
        try {
            const { email, password } = req.body;
            const business = await Business.findOne({ email });

            if (!business) {
                return res.status(404).json({ message: 'Business not found' });
            }
            if (business.password !== createHash("md5").update(password).digest("hex")) {
              return res.status(401).json({message: 'Password is wrong' });
            }
        
            const token = jwt.sign({ _id: business._id, email: business.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.status(200).json({ status: 'success', token, data:{ business: business } });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    static async getMyBusiness(req, res) {
        try {
            const business = await Business.findById(req._id);
        
            if (!business) {
              return res.status(404).json({ message: 'Business not found' });
            }
        
            return res.status(200).json({ business });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    static async logout(req, res){
        try {
            console.log(req._id)
            const business = await Business.findById(req._id);
            if (!business) {
                return res.status(404).json({ message: 'Business not found' });
            }
            
            business.lastonline_time = Date.now();
            //Ya burada ya ön tarafta token tutan cookie temizlenecek

            await business.save();
            return res.status(200).json({ status: 'success', message: 'Business logout' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateAccount(req, res) {
        try {
            const business = await Business.findById(req._id);
            if (!business) {
                return res.status(404).json({ message: 'Business not found' });
            }
            const { name, long_name, phone, email, password, type, profile_image, images, content, services, address, working_days, working_hours } = req.body;

            if(name) { business.name = name; }
            if(long_name) { business.long_name = long_name; }
            if(phone) { business.phone = phone; }
            if(email) { business.email = email; }
            if(password) { business.password = createHash("md5").update(password).digest("hex"); }
            if(type) { business.type = type; }
            if(profile_image) { business.profile_image = profile_image; }
            if(images) { business.images = images; }
            if(content) { business.content = content; }
            if(services) { business.services = services; }
            if(images) { business.images = images; }
            if(working_days) { business.working_days = working_days; }
            if(working_hours) { business.working_hours = working_hours; }
            await business.save();
            return res.status(200).json({ status: 'success', message: 'Business updated' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    static async deleteAccount(req, res) {
        try {
            const result = await Business.deleteOne({ _id: req._id });
    
            if (result.deletedCount === 1) {
                return res.status(200).json({ status: 'success', message: 'Business deleted' });
            }
            return res.status(404).json({ message: 'Business not found' });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async forgotPassword(req, res){
        const transporter = nodemailer.createTransport({
            host: 'smtp.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.AUTH_EMAIL_USER,
                pass: process.env.AUTH_EMAIL_PASS,
            },
        });
        const { email } = req.body;

        try {
            const business = await Business.findOne({ email });
            if (!business) {
                return res.status(404).json({ message: 'Business not found' });
            }

            const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_FORGOT_TOKEN_EXPIRES_IN });
            const resetLink = `http://localhost:3000/business/reset-password/${resetToken}`;
            // Burası ön taraftaki password reset sayfasının tokenlı linki olacak

            const mailOptions = {
                from: process.env.AUTH_EMAIL_USER,
                to: email,
                subject: 'Password Reset',
                html: `<p>Please click the following link to reset your password:</p><p>${resetLink}</p>`,
            };

            await transporter.sendMail(mailOptions);
            return res.status(200).json({ status: 'success', message: 'Password reset link sent to your email' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async resetPassword(req, res){
        const { token } = req.params;
        const { password } = req.body;
        var email = "";

        try {
            try {
                const decoded = await promisify(jwt.verify)(token,  process.env.JWT_SECRET);
                email = decoded.email;
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    return res.status(401).json({ status: "Unauthorized", message: 'Token has expired' });
                }
                return res.status(401).json({ status: "Unauthorized" , message: 'Invalid token' });
            }
            const business = await Business.findOne({ email: email });

            if (!business) {
                return res.status(404).json({ message: 'Business not found' });
            }

            business.password =  createHash("md5").update(password).digest("hex");
            await business.save();

            return res.status(200).json({ status: 'success',  message: 'Password reset successful' });
        } catch (error) {

            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


}



module.exports = BusinessController;