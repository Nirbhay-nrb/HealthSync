// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');

// Set up Express app
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Use routes
app.use('/', testRoute);
app.use('/auth', authRoute);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
