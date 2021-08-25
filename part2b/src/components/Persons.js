import React from "react";
import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter }) => {
	const onDelete = ({ name, id }) => {
		const confirm = window.confirm(`Delete ${name}?`);

		if (confirm) {
			personService
				.deletePerson(id)
				.then((res) =>
					setPersons(persons.filter((person) => person.id !== id))
				);
		}
	};

	return (
		<>
			{persons
				.filter((person) => person.name.includes(filter))
				.map((person, index) => (
					<p key={index}>
						{person.name} {person.number}
						<button onClick={() => onDelete(person)}>delete</button>
					</p>
				))}
		</>
	);
};

export default Persons;
