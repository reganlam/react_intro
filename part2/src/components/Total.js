import React from "react";

const Total = ({ course }) => {
	const parts = course.parts;

	const total = parts.reduce((s, p) => {
		return s + p.exercises;
	}, 0);

	return (
		<>
			<p>total of {total} exercises</p>
		</>
	);
};

export default Total;
