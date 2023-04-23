const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId,
    },
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'Patients',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    timingId: {
        type: mongoose.Types.ObjectId,
        ref: 'Timings',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Appointments', appointmentSchema);
