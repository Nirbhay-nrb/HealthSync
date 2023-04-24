// Update doctor profile

const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctors');

// Updated doctor profile by id
router.put('/update/:id', async (req, res) => { // id is to be passed in the url
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        res.send(doctor);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get doctor profile by id
router.get('/get/:id', async (req, res) => { // id is to be passed in the url
    try {
        const doctor = await Doctor.findById(req.params.id).populate('patients').populate('appointments');
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        res.send(doctor);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete doctor profile by id
router.delete('/delete/:id', async (req, res) => { // id is to be passed in the url
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        res.send('Doctor profile has been successfully deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


module.exports = router;