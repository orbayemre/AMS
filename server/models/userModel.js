const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: { type: String },
    district: { type: String },
    street: { type: String },
    address_text: { type: String },
});

const userSchema = new mongoose.Schema({
    name: { type: String,  required: true },
    surname: { type: String,  required: true },
    phone: { type: String , default: null},
    email: { type: String, required: true,unique: true },
    password: { type: String, required: true },
    profile_image: { type: String , default: null},
    address: { type: addressSchema , default: {city: null,district: null,street: null,address_text: null,} } ,
    created_time: { type: Date, default: Date.now },
    lastonline_time: { type: Date, default: Date.now },
});
const User = mongoose.model('users', userSchema);

module.exports = User;