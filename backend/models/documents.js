const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId,
    },
    patientId: { type: mongoose.Types.ObjectId , ref: 'Patients', required: true },
    name: { type: String, required: true },
    dateOfUpload: { type: Date, required: true },
    relatedDoctor: { type: String, required: true },
    path: { type: String, required: true },
});

module.exports = mongoose.model('Document', documentSchema);
