// Import necessary packages
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Import user model
const Patient = require('../models/patients');
const Doctor = require('../models/doctors');

// Registration route
router.post('/register', (req, res, next) => {
    // Hash password before storing in database
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Create new user object
            const user = req.body.isDoctor ? new Doctor({
                name: req.body.name,
                dob: req.body.dob,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                isDoctor: req.body.isDoctor,
                gender: '',
                speciality: '',
                ageGroup: '',
                highestQualification: '',
                achievements: [],
                timings: [],
                patients: [],
                appointments: [],

            }) : new Patient({
                name: req.body.name,
                dob: req.body.dob,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                isDoctor: req.body.isDoctor,
                gender: '',
                height: '',
                weight: '',
                bloodGroup: '',
                medicalConditions: [],
                documents: [],
                doctors: [],
                appointments: [],
            });

            // Save user to database
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created successfully'
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({
                        error: error
                    });
                });
        });
});

// Login route
router.post('/login', (req, res, next) => {
    let fetchedUser;
    // Find user with matching username
    const user = req.body.isDoctor ? Doctor : Patient;
    user.findOne({ email: req.body.email })
        .then(userFound => {
            if (!userFound) {
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }
            fetchedUser = userFound;
            // Compare password with hashed password in database
            return bcrypt.compare(req.body.password, fetchedUser.password);
        })
        .then(result => {
            if (!result) {
                res.status(401).json({
                    message: 'Authentication failed'
                });
            }
            else {
                res.status(200).json({
                    message: 'Login Successful',
                    userId : fetchedUser._id,
                    // store this id in local storage for making further communication with the server
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});

module.exports = router;
