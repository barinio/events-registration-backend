const express = require('express');

const { getEventsList } = require('../../controllers');

const router = express.Router();

router.get('/', getEventsList);

module.exports = router;
