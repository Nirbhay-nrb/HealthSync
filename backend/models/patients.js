// models/patient.js

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    documents: {
        type: [String],
    },
    bloodGroup: {
        type: String,
    },
    medicalConditions: {
        type: [String],
    },
    documents: {
        type: [mongoose.Types.ObjectId],
        ref: 'Document',
    },
    doctors: {
        type: [mongoose.Types.ObjectId],
        ref: 'Doctor',
    },
    appointments: {
        type: [mongoose.Types.ObjectId],
        ref: 'Appointments',
    },
}, { timestamps: true });

const Patient = mongoose.model('Patients', patientSchema);

module.exports = Patient;
