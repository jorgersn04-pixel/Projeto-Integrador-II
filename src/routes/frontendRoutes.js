const express = require('express');
const path = require('path');

const router = express.Router();

const publicPath = path.join(__dirname, '..', '..', 'public');

router.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

router.use(express.static(publicPath));

module.exports = router;
