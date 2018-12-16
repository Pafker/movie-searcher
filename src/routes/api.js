const express = require('express');
const movieRouter = require('./movieRouter');
const commentRouter = require('./commentRouter');

const router = express.Router();

router.use('/movies', movieRouter);

router.use('/comments', commentRouter);

module.exports = router;