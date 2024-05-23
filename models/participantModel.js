const { model, Schema } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegExp =
	// eslint-disable-next-line no-control-regex
	/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

const participantSchema = new Schema({
	fullName: {
		type: String,
		required: [true, 'FullName is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		match: emailRegExp,
	},
	eventId: {
		type: Schema.Types.ObjectId,
		ref: 'events',
		required: true,
	},
	birth: { type: String },
	whereHeard: { type: String },
	registrationTime: { type: String },
});

participantSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
	fullName: Joi.string().min(2).max(30).required(),
	email: Joi.string().pattern(emailRegExp).required(),
	birth: Joi.string(),
	whereHeard: Joi.string(),
	eventId: Joi.string().required(),
	registrationTime: Joi.string().required(),
});

const schemas = { addSchema };

const Participant = model('participant', participantSchema);

module.exports = { Participant, schemas };
