const express = require('express');

const { addParticipant, getParticipants } = require('../../controllers');
const { schemas } = require('../../models/participantModel');
const { validBody } = require('../../middlewares');

const router = express.Router();

router.get('/', getParticipants);
router.post('/', validBody(schemas.addSchema), addParticipant);

module.exports = router;
