const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Types.ObjectId , ref: 'Patients', required: true },
    name: { type: String, required: true },
    dateOfUpload: { type: String, required: true },
    path: { type: String, required: true },
});

module.exports = mongoose.model('Document', documentSchema);
