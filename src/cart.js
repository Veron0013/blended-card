//Логіка сторінки Cart

import refs from "./js/refs.js";
import * as render from "./js/render-function.js";
import * as apiRest from "./js/products-api.js";
import * as helper from "./js/helpers.js";


document.addEventListener("DOMContentLoaded", () => {
	console.log("cart");

	helper.readLocalStorage();

});
