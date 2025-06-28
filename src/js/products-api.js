// Функції для роботи з бекендом
import axios from "axios";
import refs from "./refs";

export async function getApiData(url) {
	return await axios.get(url)
		.then(data => data)
		.catch(error => error.message);
};

export const buildQuery = (base, page, limit) => {
	return `${base}?limit=${limit}&skip=${(page - 1) * limit}`;
};
