const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const chalk = require('chalk');
const initDatabase = require('./startUp/initDB');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = config.get('port') ?? 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, '../client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/index.html'));
	});
}

async function start() {
	try {
		mongoose.connection.once('open', () => {
			initDatabase();
		});
		await mongoose.connect(config.get('mongoUri'));
		console.log('MongoDB connected!');
		app.listen(PORT, () => {
			console.log(chalk.green(`Server has been started on port: ${PORT}`));
		});
	} catch (err) {
		console.log(chalk.red(err.message));
		process.exit(1);
	}
}

start();
