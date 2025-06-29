// Функції для роботи з бекендом
import axios from "axios";

export async function getApiData(url) {
	return await axios.get(url)
		.then(data => data)
		.catch(error => error.message);
};

export const buildQuery = (base, page, limit, sym = "?") => {
	return `${base}${sym}limit=${limit}&skip=${page}`;
};
