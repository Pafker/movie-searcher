const express = require('express');
const movieRouter = require('./movieRouter');

const router = express.Router();

router.get('/hello', (req, res) => {
    res.status(200).send('Hello');
});

router.use('/movies', movieRouter);

module.exports = router;