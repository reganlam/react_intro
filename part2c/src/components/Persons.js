import React from "react";

const Persons = ({ persons, filter }) => {
	return (
		<>
			{" "}
			{persons
				.filter((person) => person.name.includes(filter))
				.map((person, index) => (
					<p key={index}>
						{person.name} {person.number}
					</p>
				))}
		</>
	);
};

export default Persons;
