const mongoose = require('mongoose');
const problemSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title Cannot Be Empty'],
	},
	description: {
		type: String,
		required: [true, 'Description Cannot Be Empty'],
	},
	difficulty: {
		type: String,
		enum: ['Easy', 'Medium', 'Hard'],
		required: [true, 'Difficulty Cannot Be Empty'],
		default: 'Easy',
	},
	testCases: [
		{
			input: {
				type: String,
				required: true,
			},
			output: {
				type: String,
				required: true,
			},
			editorial: {
				type: String,
			},
		},
	],
});
const problem = mongoose.model('Problem', problemSchema);
// for executing mongo queries
// 'Problem'- collection name
// 'problemSchema' - schema
module.exports = problem;
