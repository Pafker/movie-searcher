const express = require('express');
const firstVersionRouter = require('./v1/firstVersionRouter')

const router = express.Router();

router.use('/v1', firstVersionRouter);

module.exports = router;