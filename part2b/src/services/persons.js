import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

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

export default { addPerson, updatePerson, deletePerson };
