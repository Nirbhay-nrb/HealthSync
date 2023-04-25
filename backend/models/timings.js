const mongoose = require('mongoose');

const timingsSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Types.ObjectId, ref: 'Doctor', required: true },
    dayOfWeek: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    roomNo: { type: String, required: true },
});

module.exports = mongoose.model('Timings', timingsSchema);
