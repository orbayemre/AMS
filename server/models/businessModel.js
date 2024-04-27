const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: { type: String , default: null},
    district: { type: String , default: null},
    street: { type: String , default: null},
    address_text: { type: String , default: null},   
    latitude: { type: String , default: null},
    longitude: { type: String , default: null},
});

const workingDaysSchema = new mongoose.Schema({
    monday: { type: Boolean , required: true},
    tuesday: { type: Boolean , required: true},
    wednesday: { type: Boolean , required: true},
    thursday: { type: Boolean , required: true},
    friday: { type: Boolean , required: true},
    saturday: { type: Boolean , required: true},
    sunday: { type: Boolean , required: true},
    days: { type: [Boolean] },
});
workingDaysSchema.pre('save', function(next) {
    this.days = [
        this.monday,
        this.tuesday,
        this.wednesday,
        this.thursday,
        this.friday,
        this.saturday,
        this.sunday,
    ];
    next();
});


const workingHoursSchema = new mongoose.Schema({
    start: { type: String , required: true},
    end: { type: String , required: true},
    appointment_duration: { type: String , default: "50"},
    break_time: { type: String , default: "10"},
    lunch: { type: String , default: null},
});

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    long_name: { type: String, default: null },
    phone: { type: String , default: null},
    email: { type: String, required: true,unique: true },
    password: { type: String, required: true },
    type: { type: String , enum: ['hairdresser','beauty-salon','psychologist','dental-clinic','astroturf','auto-service','massage-center','consultancy-service'], required: true},
    profile_image: { type: String , default: null},
    images: { type: Array , default: null},
    content: { type: String , default: null},
    services: { type: Array , default: null},
    address: { type: addressSchema , default: {city: null,district: null,street: null,address_text: null,latitude: null,longitude: null} } ,
    has_sub :{ type: Boolean, default: false},
    b_type: { type: String, enum: ['main', 'sub'], default: 'main' },
    working_days : { type: workingDaysSchema , required: true},
    working_hours : { type: workingHoursSchema , required: true},
    special_off_times : { type: Array , default: null },
    timezone : {type: String, default: "UTC+3"},
    popularity: { type: Number, default: 1.0 },
    created_time: { type: Date, default: Date.now },
    lastonline_time: { type: Date, default: Date.now },
});
const Business = mongoose.model('Business', businessSchema,'businesses');

const subBusinessSchema = new mongoose.Schema({
    business_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    name: { type: String, required: true, unique: true },
    long_name: { type: String, default: null },
    phone: { type: String , default: null},
    image: { type: Array , default: null},
    content: { type: String , default: null},
    b_type: { type: String, enum: ['main', 'sub'], default: 'sub' },
    working_days : { type: workingDaysSchema , required: true},
    working_hours : { type: workingHoursSchema , required: true},
    special_off_times : { type: Array , default: null },
});

const SubBusiness = mongoose.model('SubBusiness', subBusinessSchema,'businesses');

module.exports = Business;
module.exports.SubBusiness = SubBusiness;