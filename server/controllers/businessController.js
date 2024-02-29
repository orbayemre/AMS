require('dotenv').config();
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { createHash } = require('crypto');
const nodemailer = require('nodemailer');
const Business = require('../models/businessModel');


class BusinessController {
    
    static async createBusiness(req, res) {
        try {
            const { name, long_name, phone, email, password, type, content, services, address, working_days, working_hours, timezone } = req.body;
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
                working_hours,
                timezone
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
            const { name, long_name, phone, email, password, type, profile_image, images, content, services, address, working_days, working_hours, timezone } = req.body;

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
            if(timezone) { business.timezone = timezone; }
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


    static async addSpecialOffTime(req, res){
        
        try {
            const { off_times } = req.body;
            const business_id = req._id;

            if(!off_times){
                return res.status(401).json({ message: 'off_times not provided' });
            }
            if(off_times.length === 0){
                return res.status(401).json({ message: 'off_times is empty' });
            }


            const business = await Business.findById(business_id);
            if (!business) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }
            var convertedOffTimes = [];
            off_times.map((item) =>{
                    item.start = new Date(item.start + 'Z')
                    item.end = new Date(item.end + 'Z')

                    if (business.special_off_times.length > 0){
                        var isExist = false;
                        business.special_off_times.forEach(currentTime => {
                            if (item.start.toString() === currentTime.start.toString() &&  item.end.toString() === currentTime.end.toString() ){
                               isExist = true;
                            }
                        });
                        
                        if(!isExist) {
                            convertedOffTimes.push(item);
                        }
                    }
                    else{
                        convertedOffTimes.push(item)
                    }
                    
                }
            )

            if(convertedOffTimes.length > 0){
                business.special_off_times.push(...convertedOffTimes);
            }
            else{
                return res.status(401).json({ message: 'New special off times not provided' });
            }
            await business.save();
            return res.status(200).json({ status: 'success', message: 'Special off times updated' });

        } catch (error) {

            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async removeSpecialOffTime(req, res){
        
        try {
            const { remove_off_time } = req.body;
            const business_id = req._id;

            if(!remove_off_time){
                return res.status(401).json({ message: 'remove_off_time not provided' });
            }

            const business = await Business.findById(business_id);
            if (!business) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }
            
            var convertedOffTime = {
                "start" : new Date(remove_off_time.start + 'Z'),
                "end" : new Date(remove_off_time.end + 'Z'),
            }
            const startLen = business.special_off_times.length;
            business.special_off_times = business.special_off_times.filter((item) => ( !(item.start.toString() === convertedOffTime.start.toString() &&  item.end.toString() === convertedOffTime.end.toString()) ));
            if(startLen === business.special_off_times.length){
                return res.status(401).json({ message: 'Special off time not found or special off time could not be removed' });
            }

            await business.save();
            return res.status(200).json({ status: 'success', message: 'Special off time removed' });

        } catch (error) {

            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    


}



module.exports = BusinessController;