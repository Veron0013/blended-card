//Логіка сторінки Cart

import refs from "./js/refs.js";
import * as render from "./js/render-function.js";
import * as apiRest from "./js/products-api.js";
import * as storageLib from "./js/storage.js";


document.addEventListener("DOMContentLoaded", () => {
	console.log("cart");

	storageLib.updateHeader();

});
