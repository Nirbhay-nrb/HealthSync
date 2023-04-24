const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Appointment = require('../models/appointments');

// Route to add an appointment
router.post('/add', async (req, res) => {
    try {
        const newAppointment = new Appointment({
            doctorId: new mongoose.Types.ObjectId(req.body.doctorId),
            patientId: new mongoose.Types.ObjectId(req.body.patientId),
            date: req.body.date,
            timingId: new mongoose.Types.ObjectId(req.body.timingId)
        });
        const savedAppointment = await newAppointment.save();
        res.send(savedAppointment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route to delete an appointment with appointment ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send('Appointment not found');
        }
        await Appointment.findByIdAndDelete(req.params.id);
        res.send('Appointment has been successfully deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route to get all appointments with patient id
router.get('/patient/:patientId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: new mongoose.Types.ObjectId(req.params.patientId) })
            .populate('doctorId', 'name')
            .populate('patientId', 'name')
            .populate('timingId', ['dayOfWeek', 'startTime', 'endTime', 'location', 'roomNo']);
        res.send(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route to get all appointments with doctor id
router.get('/doctor/:doctorId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorId: new mongoose.Types.ObjectId(req.params.doctorId) })
            .populate('doctorId', 'name')
            .populate('patientId', 'name')
            .populate('timingId', ['dayOfWeek', 'startTime', 'endTime', 'location', 'roomNo']);
        res.send(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;