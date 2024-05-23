const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
	},
	eventDate: {
		type: Date,
		required: [true, 'EventDate is required'],
	},
	organizer: {
		type: String,
		required: [true, 'Organizer is required'],
	},
});

const Event = model('event', eventSchema);

module.exports = { Event };
