const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/server.config');
const apiRouter = require('./routers');
const errorHandler = require('./utils/errorHandler');
//const mongoose = require('mongoose');
const connectToDB = require('./config/db.config');
const { StatusCodes } = require('http-status-codes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use('/api', apiRouter);
app.get('/ping', (req, res) => {
	return res
		.status(StatusCodes.OK)
		.json({ message: 'Problem Service is alive' });
});
app.use(errorHandler);
app.listen(PORT, async () => {
	console.log(`Server started at PORT: ${PORT}`);
	await connectToDB();
	console.log(`Successfully connected to the database server`);

	//dummy code
	// const Cat = mongoose.model('Cat', { name: String });

	// const kitty = new Cat({ name: 'Zildjian' });
	// kitty.save().then(() => console.log('meow'));
	// const Cat = mongoose.model('Cat', { name: String });

	// const kitty = new Cat({ name: 'Zildjian' });
	// kitty.save().then(() => console.log('meow'));
});
