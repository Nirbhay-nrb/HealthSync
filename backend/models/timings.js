const mongoose = require('mongoose');

const timingsSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Types.ObjectId,
    //     default: new mongoose.Types.ObjectId,
    // },
    doctorId: { type: mongoose.Types.ObjectId, ref: 'Doctor', required: true },
    dayOfWeek: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    roomNo: { type: String, required: true },
});

module.exports = mongoose.model('Timings', timingsSchema);
