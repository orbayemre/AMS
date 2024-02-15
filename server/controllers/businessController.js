require('dotenv').config();
const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
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
    
            res.status(201).json({ status: 'success', token, data:{ business: newBusiness } });
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
        
            res.status(200).json({ business });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


}



module.exports = BusinessController;