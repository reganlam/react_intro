import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";

const getAll = () => {
	const api = axios.get(baseUrl);
	return api.then((res) => res.data);
};

const create = (newObject) => {
	const api = axios.post(baseUrl, newObject);
	return api.then((res) => res.data);
};

const update = (id, newObject) => {
	const api = axios.put(`${baseUrl}/${id}`, newObject);
	return api.then((res) => res.data);
};

export default {
	getAll,
	create,
	update,
};
