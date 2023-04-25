// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Set up Express app
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({limit : "50mb", extended: true }));
app.use(cors());


// Connect to MongoDB using Mongoose
const mongoURI = 'mongodb+srv://GoodEvil:Ni%40110802@healthsync.usinl1q.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log('Error connecting to database:', error);
    });

// Import routes
const testRoute = require('./routes/test');
const authRoute = require('./routes/auth');
const docProfRoute = require('./routes/doctor_profile');
const patProfRoute = require('./routes/patient_profile');
const documentRoute = require('./routes/documents');
const appointmentRoute = require('./routes/appointments');
const timingRoute = require('./routes/timings');

// Use routes
app.use('/', testRoute);
app.use('/auth', authRoute);
app.use('/docprofile', docProfRoute);
app.use('/patprofile', patProfRoute);
app.use('/documents', documentRoute);
app.use('/appointments', appointmentRoute);
app.use('/timings', timingRoute);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
