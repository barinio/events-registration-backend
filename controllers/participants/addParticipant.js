const { HttpError } = require('../../helpers');
const { Participant } = require('../../models');

const addParticipant = async (req, res) => {
	const { eventId, email } = req.body;

	const existingParticipant = await Participant.findOne({ email });
	if (existingParticipant) {
		throw HttpError(
			400,
			'This email is already registered for this or another event. Please use another email.'
		);
	}

	const addNewParticipant = await Participant.create({ ...req.body, eventId });
	res.status(201).json(addNewParticipant);
};

module.exports = addParticipant;
