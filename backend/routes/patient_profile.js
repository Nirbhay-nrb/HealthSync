// Patient profile

const express = require('express');
const router = express.Router();
const Patient = require('../models/patients');

// Update patient profile
router.put('/patient_profile/:id', async (req, res) => { // id is to be passed in the url
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) {
            return res.status(404).send('Patient not found');
        }
        res.send(patient);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get patient profile by id
router.get('/patient_profile/:id', async (req, res) => { // id is to be passed in the url
    try {
        const patient = await Patient.findById(req.params.id).populate('doctors').populate('appointments');
        if (!patient) {
            return res.status(404).send('Patient not found');
        }
        res.send(patient);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete patient profile by id
router.delete('/patient_profile/:id', async (req, res) => { // id is to be passed in the url
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).send('Patient not found');
        }
        res.send('Patient profile has been successfully deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});