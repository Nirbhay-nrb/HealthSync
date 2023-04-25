const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const Document = require('../models/documents');
const fs = require('fs');
const path = require('path');

// Set up multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route to get document by ID
router.get('/get/:id', async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).send('Document not found');
        }
        const filePath = document.path;
        const absolutePath = path.resolve(filePath);
        res.sendFile(absolutePath);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route to upload files to the server
router.post('/upload', upload.single('file'), async (req, res) => {
    // req.skipMiddleware = true;
    try {
        console.log(req.file.path);
        const newDocument = new Document({
            patientId: new mongoose.Types.ObjectId(req.body.patientId),
            name: req.body.name,
            dateOfUpload: req.body.dateOfUpload,
            path: req.file.path
        });
        const savedDocument = await newDocument.save();
        res.send(savedDocument);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route to delete file by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).send('File not found');
        }
        // Delete file from server
        fs.unlinkSync(document.path);
        // Delete document from database
        await Document.findByIdAndDelete(req.params.id);
        res.send('File has been successfully deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// get all the documents via patient ID
router.get('/patient/:id', async (req, res) => {
    try {
        const documents = await Document.find({ patientId: new mongoose.Types.ObjectId(req.params.id) });
        // .populate('doctorId', 'name');
        res.send(documents);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
