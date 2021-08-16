import React from "react";

const Content = ({ course }) => {
	const parts = course.parts;
	return (
		<>
			{parts.map((part) => (
				<p key={part.id}>
					{part.name} {part.exercises}
				</p>
			))}
		</>
	);
};

export default Content;
