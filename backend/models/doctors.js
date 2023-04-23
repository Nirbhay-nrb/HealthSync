// models/doctor.js

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId,
    },

    isDoctor: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
    },
    ageGroup: {
        type: String,
    },
    highestQualification: {
        type: String,
    },
    achievements: {
        type: [String],
    },
    timings: {
        type: [mongoose.Types.ObjectId],
        ref : 'Timings',
    },
    patients: {
        type: [mongoose.Types.ObjectId],
        ref : 'Patients',
    },
    appointments: {
        type: [mongoose.Types.ObjectId],
        ref: 'Appointments',
    },
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
