const { ctrlWrapper } = require('../helpers');

const getEventsList = require('./events/getEventsList');

const addParticipant = require('./participants/addParticipant');
const getParticipants = require('./participants/getParticipants');

module.exports = {
	getEventsList: ctrlWrapper(getEventsList),

	addParticipant: ctrlWrapper(addParticipant),
	getParticipants: ctrlWrapper(getParticipants),
};
