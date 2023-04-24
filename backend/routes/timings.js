const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Timings = require('../models/timings');

// Add timing
router.post('/add', async (req, res) => {
    try {
        const newTiming = new Timings({
            doctorId: new mongoose.Types.ObjectId(req.body.doctorId),
            dayOfWeek: req.body.dayOfWeek,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            location: req.body.location,
            roomNo: req.body.roomNo,
        });
        const savedTiming = await newTiming.save();
        res.send(savedTiming);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
// Delete timing by timing ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const timing = await Timings.findByIdAndDelete(req.params.id);
        if (!timing) {
            return res.status(404).send('Timing not found');
        }
        res.send('Timing has been successfully deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get all timings by doctor ID
router.get('/get/:id', async (req, res) => { // doctor id is to be passed in the url
    try {
        const timings = await Timings.find({ doctorId: req.params.id });
        res.send(timings);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


module.exports = router;
