
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const User = require('../models/userModel');
const verifyToken = require('../middleware/authMiddleware');



class UserController {


    static async createUser(req, res) {
        try {
            const { name, surname, email, phone, password, address } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
    
            const newUser = new User({ 
                name, 
                surname, 
                phone,
                email, 
                password : createHash("md5").update(password).digest("hex"),
                address
            });
            await newUser.save();
    
            const token = jwt.sign({ _id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    
            res.status(201).json({ status: 'success', token, data:{ user: newUser } });
        } catch (error) {
            
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    static async login(req, res){
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (user.password !== createHash("md5").update(password).digest("hex")) {
              return res.status(401).json({message: 'Password is wrong' });
            }
        
            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.status(200).json({ status: 'success', token, data:{ user: user } });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getMe(req, res) {
        try {
            const user = await User.findById(req._id);
        
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateAccount(req, res) {
        try {
            const user = await User.findById(req._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const { name, surname, email, password, phone, profile_image, address } = req.body;

            if(name) { user.name = name; }
            if(surname) { user.surname = surname; }
            if(phone) { user.phone = phone; }
            if(email) { user.email = email; }
            if(password) { user.password = createHash("md5").update(password).digest("hex"); }
            if(profile_image) { user.profile_image = profile_image; }
            if(address) { user.address = address; }

            await user.save();
            return res.status(200).json({ message: 'User updated' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteAccount(req, res) {
        try {
            const result = await User.deleteOne({ _id: req._id });
    
            if (result.deletedCount === 1) {
                return res.status(200).json({ message: 'User deleted' });
            }
            return res.status(404).json({ message: 'User not found' });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


}


module.exports = UserController;