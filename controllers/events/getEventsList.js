const { Event } = require('../../models');

const getEventsList = async (req, res) => {
	const { page = 1, limit = 12 } = req.query;

	const events = await Event.find()
		.limit(limit * 1)
		.skip((page - 1) * limit)
		.exec();

	const count = await Event.countDocuments();

	res.json({
		events,
		totalPages: Math.ceil(count / limit),
		currentPage: page,
	});
};

module.exports = getEventsList;
