const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('The server is running on port 3000');
});

module.exports = router;
