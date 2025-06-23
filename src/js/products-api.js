// Функції для роботи з бекендом
import axios from "axios";
import refs from "./refs";

export async function getApiData(url) {
	return await axios.get(url)
		.then(data => data)
		.catch(error => error.message);
};


