import axios from "axios";

const baseUrl =
	process.env.NODE_ENV === "development"
		? "http://localhost:3001/api/persons"
		: "/api/persons";

const getPeople = () => {
	const api = axios.get(baseUrl);
	return api.then((res) => res.data);
};

const addPerson = (personObject) => {
	const api = axios.post(`${baseUrl}`, personObject);
	return api.then((res) => res.data);
};

const updatePerson = (personId, personObject) => {
	const api = axios.put(`${baseUrl}/${personId}`, personObject);
	return api.then((res) => res.data);
};

const deletePerson = (personId) => {
	console.log(`Deleting personId: ${personId}`);
	const api = axios.delete(`${baseUrl}/${personId}`);
	return api.then((res) => res.data);
};

export default { getPeople, addPerson, updatePerson, deletePerson };
