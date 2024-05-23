const axios = require('axios');
const { Event } = require('../models');
const { RAPIDAPI_KEY } = process.env;

const options = {
	method: 'GET',
	url: 'https://real-time-events-search.p.rapidapi.com/search-events',
	params: {
		query: 'concerts in san-francisco',
		date: 'any',
		is_virtual: 'false',
		start: '0',
	},
	headers: {
		'x-rapidapi-key': RAPIDAPI_KEY,
		'x-rapidapi-host': 'real-time-events-search.p.rapidapi.com',
	},
};

const fetchAndStoreEvents = async () => {
	try {
		const response = await axios.request(options);
		const eventsData = response.data.data;

		await Promise.all(
			eventsData.map(async event => {
				const existingEvent = await Event.findOne({ externalId: event.event_id });

				if (!existingEvent) {
					const newEvent = new Event({
						externalId: event.event_id,
						title: event.name,
						description: event.description,
						eventDate: event.start_time_utc,
						organizer: event.publisher,
					});

					await newEvent.save();
				}
			})
		);

		console.log('Events fetched and stored in the database.');
	} catch (error) {
		console.error('Error fetching or storing events:', error);
	}
};

module.exports = fetchAndStoreEvents;
