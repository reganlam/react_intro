import React from "react";

const Filter = ({ newSearch, handleSearchChange }) => {
	return (
		<>
			<div>
				filter show with{" "}
				<input value={newSearch} onChange={handleSearchChange} />
			</div>
		</>
	);
};

export default Filter;
