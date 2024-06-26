require('dotenv').config();
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { createHash } = require('crypto');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Business = require('../models/businessModel');
const {SubBusiness} = require('../models/businessModel');
const Popularity =  require('../services/popularity');


class BusinessController {
    
    static async createBusiness(req, res) {
        try {
            const { name, long_name, phone, email, password, type, content, services, address, working_days, working_hours, timezone, has_sub } = req.body;
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
                has_sub,
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
    
    static async getMyBusiness(req, res) {
        try {
            const business = await Business.findOne({ _id:req._id, b_type:"main" });
        
            if (!business) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }
        
            return res.status(200).json({ business });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getMySubBusiness(req, res){
        
        try {
            const business_id = req._id;
            const existingBusiness = await Business.findOne({ _id: business_id, b_type:"main" });
            if (!existingBusiness) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }

            const mySubBusinessess = await SubBusiness.find({ business_id:business_id, b_type:"sub" }).select('-__v');
            if (!mySubBusinessess) {
                return res.status(400).json({ message: 'Sub-business not found.' });
            }
            
    
            return res.status(200).json({ mySubBusinessess });
        } catch (error) {
            
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getBusiness(req, res) {
        try {
            const { business_id } = req.body;
            const business = await Business.findOne({ _id:business_id, b_type:"main" });
        
            if (!business) {

                const existingSubBusinessess = await SubBusiness.findOne({ _id:business_id, b_type:"sub" }).select('-__v');;
                if (!existingSubBusinessess) {
                    return res.status(404).json({ message: 'Business not found' });
                }
                else{
                    const baseBusiness = await Business.findOne({ _id:existingSubBusinessess.business_id, b_type:"main" });
                    return res.status(200).json({ status: 'success', type:"sub", data:{ business: baseBusiness, subDetail : existingSubBusinessess }  });
                }
                
                
            }
        
            return res.status(200).json({ status: 'success', data:{ business: business }  });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getSubBusiness(req, res){
        
        try {
            const { business_id } = req.body;

            const existingBusiness = await Business.findOne({ _id: business_id, b_type:"main" });
            if (!existingBusiness) {
                return res.status(400).json({ message: 'Business not found.' });
            }

            const existingSubBusinessess = await SubBusiness.find({ business_id:business_id, b_type:"sub" }).select('-__v');;
            if (!existingSubBusinessess) {
                return res.status(400).json({ message: 'Sub-business not found.' });
            }
            
    
            return res.status(200).json({ status: 'success', data:{ subBusinessess: existingSubBusinessess } });
        } catch (error) {
            
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async changeHasSub(req, res){
        
        try {
            const { has_sub } = req.body;
            const business_id = req._id;

            const existingBusiness = await Business.findOne({ _id: business_id });
            if (!existingBusiness) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }
            
            existingBusiness.has_sub = has_sub ? true : false; 
            await existingBusiness.save();
    
    
            return res.status(200).json({ status: 'success' });
        } catch (error) {
            
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async addSubBusiness(req, res){
        
        try {
            const { name, long_name, phone, content, working_days, working_hours } = req.body;
            const business_id = req._id;

            const existingBusiness = await Business.findOne({ _id: business_id });
            if (!existingBusiness) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }
            else{
                if(!existingBusiness.has_sub){
                    return res.status(400).json({ message: 'Sub-businesses cannot be created.' });
                }
            }
            const existingSubBusiness = await SubBusiness.findOne({ name:name, business_id:business_id, b_type:"sub" });
            if (existingSubBusiness) {
                return res.status(400).json({ message: 'Sub-business already exists' });
            }
    
            const newSubBusiness = new SubBusiness({ 
                business_id,
                name, 
                long_name, 
                phone,
                content, 
                working_days,
                working_hours,
            });
            await newSubBusiness.save();
    
    
            return res.status(201).json({ status: 'success', data:{ subBusiness: newSubBusiness } });
        } catch (error) {
            
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async removeSubBusiness(req, res) {
        try {
            
            const { id } = req.body;
            const business_id = req._id;
            
            const existingBusiness = await Business.findOne({ _id: business_id });
            if (!existingBusiness) {
                return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
            }
            else{
                const existingSubBusiness = await SubBusiness.findOne({ _id: id, b_type:"sub" });
                if (!existingSubBusiness) {
                    return res.status(404).json({ message: 'Sub-business not found' });
                }
                if (existingSubBusiness.business_id != business_id) {
                    return res.status(403).json({ status: "Unauthorized", message: 'Unauthorized action' });
                }
            }

            
            const result = await SubBusiness.deleteOne({ _id: id, business_id:business_id, b_type:"sub" });
    
            if (result.deletedCount === 1) {
                return res.status(200).json({ status: 'success', message: 'Sub-business deleted' });
            }
            return res.status(404).json({ message: 'Sub-business not found' });
            
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
            if(address) { business.address = address; }
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

    static async updateSub(req, res) {
        try {
            const { subId } = req.body;
            const subBusiness = await SubBusiness.findById(subId);
            if (!subBusiness) {
                return res.status(404).json({ message: 'Sub-Business not found' });
            }
            const { name, long_name, phone, content, working_days, working_hours } = req.body;

            if(name) { subBusiness.name = name; }
            if(long_name) { subBusiness.long_name = long_name; }
            if(phone) { subBusiness.phone = phone; }
            if(content) { subBusiness.content = content; }
            if(working_days) { subBusiness.working_days = working_days; }
            if(working_hours) { subBusiness.working_hours = working_hours; }
            await subBusiness.save();
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
            const resetLink = `http://localhost:8080/business/reset-password/${resetToken}`;
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
            await Popularity.updatePopularity(business_id,"forSpecial");
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
    


    static async uploadImage(req, res){
        try{    

            const business = await Business.findById(req._id);
            if (!business) {
                return res.status(404).json({ message: 'Business not found' });
            }
            const imagePath = req.file.destination.split("/client")[1] + "/" + req.file.filename

            if(imagePath) {
                if(business.images.length > 0){
                    business.images = [...business.images,imagePath]; 
                }
                else{
                    business.images = [imagePath]; 
                }
            }
            else{
                return res.status(401).json({ message: 'An error occurred while uploading the image' });
            }
            await business.save();
            return res.status(200).json({ status: 'success', message: 'Image uploaded' });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }

    }
    
    static async deleteImage(req, res){
        try{     
            const business = await Business.findById(req._id);
            if (!business) {
                return res.status(404).json({ message: 'Business not found' });
            }


            const {image} = req.body;

            const images = business.images.filter((img) => image !== img);

            if(images.length > 0){
                business.images = images; 
            }
            else{
                business.images = []; 
            }    
            
            const imagePath = '../client' + image;
            if (fs.existsSync(imagePath)) {

              fs.unlink(imagePath, (err) => {
                if (err) {
                  return res.status(500).json({ message: 'An error occurred while deleting the image.' });
                }
              });
            } else {
              res.status(404).json({ message: 'Image not found.' });
            }

            await business.save();
            return res.status(200).json({ status: 'success', message: 'Image deleted.' });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}


module.exports = BusinessController;