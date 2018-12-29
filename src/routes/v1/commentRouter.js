const express = require('express');
const commentController = require('../../../src/controllers/commentController');

const router = express.Router();

router.get('/', commentController.getComments);

router.post('/', commentController.addComment);

module.exports = router;