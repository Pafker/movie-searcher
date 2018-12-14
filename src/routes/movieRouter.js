const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/', movieController.getMovies);

router.post('/', movieController.addMovie);

module.exports = router;