//Логіка сторінки Home
import refs from "./js/refs.js";
import * as render from "./js/render-function.js";
import * as apiRest from "./js/products-api.js";


const renderCategories = async () => {

	try {
		const dataCat = await apiRest.getApiData(refs.qCategories);
		console.log(dataCat);
		render.createMarcup(refs.categoryList, dataCat.data, render.markUpCategories);
	}
	catch (e) {
		console.log(e.message);
	}

}

const renderProducts = async (queryLink) => {
	try {
		const dataProd = await apiRest.getApiData(queryLink);
		console.log(dataProd);
		render.createMarcup(refs.productList, dataProd.data.products, render.markUpProducts);
	}
	catch (e) {
		console.log(e.message);
	}
}



refs.categoryList.addEventListener("click", (e) => {
	const li = e.target.closest(".categories__item");
	if (!li) return;
	render.clearElement(refs.productList);
	renderProducts(li.dataset.url);
});

renderCategories();
