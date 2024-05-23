const { Participant } = require('../../models');

const getParticipantsList = async (req, res) => {
	const { eventId } = req.query;

	const participantsList = await Participant.find({ eventId });

	res.status(200).json(participantsList);
};

module.exports = getParticipantsList;
