const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    patientId: {
        type: mongoose.Types.ObjectId,
        ref: 'Patients',
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    timingId: {
        type: mongoose.Types.ObjectId,
        ref: 'Timings',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Appointments', appointmentSchema);
