import React from "react";
import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter, showNotification }) => {
	const onDelete = ({ name, id }) => {
		const confirm = window.confirm(`Delete ${name}?`);

		if (confirm) {
			personService.deletePerson(id).then((res) => {
				showNotification("Deleted User", false);
				setPersons(persons.filter((person) => person.id !== id));
			});
		}
	};

	return (
		<>
			{persons &&
				persons.map((person, index) => {
					if (person === null) return <></>;

					if (person.name.includes(filter) === false) return <></>;

					return (
						<p key={index}>
							{person.name} {person.number}
							<button onClick={() => onDelete(person)}>
								delete
							</button>
						</p>
					);
				})}
		</>
	);
};

export default Persons;
