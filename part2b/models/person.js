const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log('connecting...', url);

mongoose
	.connect(url)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		minLength: 3,
	},
	number: {
		type: String,
		required: true,
		minLength: 8,
		match: /^[0-9]{8,}$/, // At least 8 digits
	},
});

// uniqueValidator
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Person', personSchema);
