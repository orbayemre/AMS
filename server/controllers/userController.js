
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { createHash } = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');



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
    
            return res.status(201).json({ status: 'success', token, data:{ user: newUser } });
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
            return res.status(200).json({ status: 'success', token, data:{ user: user } });
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
        
            return res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async logout(req, res){
        try {
            const user = await User.findById(req._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            user.lastonline_time = Date.now();
            //Ya burada ya ön tarafta token tutan cookie temizlenecek

            await user.save();
            return res.status(200).json({ status: 'success', message: 'User logout' });
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
            return res.status(200).json({ status: 'success', message: 'User updated' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteAccount(req, res) {
        try {
            const result = await User.deleteOne({ _id: req._id });
    
            if (result.deletedCount === 1) {
                return res.status(200).json({ status: 'success', message: 'User deleted' });
            }
            return res.status(404).json({ message: 'User not found' });
            
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
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_FORGOT_TOKEN_EXPIRES_IN });
            const resetLink = `http://localhost:3000/user/reset-password/${resetToken}`;
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
            const user = await User.findOne({ email: email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.password =  createHash("md5").update(password).digest("hex");
            await user.save();

            return res.status(200).json({ status: 'success',  message: 'Password reset successful' });
        } catch (error) {

            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


}


module.exports = UserController;