const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log(
		'Please provide the password as an argument: node mongo.js <password>'
	);
	process.exit(1);
}

// node mongo.js yourpassword Anna 040-1234556
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.isvmt.mongodb.net/phonebook-app?retryWrites=true`;
// mongodb+srv://fullstack:<password>@cluster0.isvmt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

// List every person
if (process.argv.length === 3) {
	Person.find({}).then((res) => {
		res.forEach((person) => console.log(person));
		mongoose.connection.close();
	});
}
// Add person to DB
else {
	const person = new Person({
		name: name,
		number: number,
	});

	person.save().then(() => {
		console.log(`Added ${name} ${number} to phonebook`);
		mongoose.connection.close();
	});
}
