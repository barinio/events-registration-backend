const mongoose = require('mongoose');

const app = require('./app');
const fetchAndStoreEvents = require('./services/fetchRapidApiEvents');

const { MONGO_HOST, DB_NAME, PORT } = process.env;

mongoose
	.connect(MONGO_HOST, { dbName: DB_NAME })
	.then(() => {
		app.listen(PORT);
		console.log('Database connection successful');

		fetchAndStoreEvents();
		setInterval(fetchAndStoreEvents, 24 * 60 * 60 * 1000);
	})
	.catch(({ message }) => {
		console.log('Error connecting to the database:', message);
		process.exit(1);
	});
