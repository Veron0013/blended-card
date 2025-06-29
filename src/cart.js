//Логіка сторінки Cart

import refs from "./js/refs.js";
import * as render from "./js/render-function.js";
import * as apiRest from "./js/products-api.js";
import * as storageLib from "./js/storage.js";


document.addEventListener("DOMContentLoaded", () => {
	console.log("cart");

	storageLib.updateHeader();

	storageLib.StorageService.setCountTo(refs.cardItemsCount, refs.CD_DATA);
	storageLib.StorageService.setTotalCard(refs.cardItemsTotal);
	markUpCardProducts();
});

async function markUpCardProducts() {
	const storageData = storageLib.StorageService.get(refs.CD_DATA);
	const mkUpData = [];
	for (const item of storageData) {
		const vQuery = refs.BASE_URL + `/${item.id}`;
		try {
			const dataProd = await apiRest.getApiData(vQuery);
			console.log(dataProd.data.length);
			if (dataProd.data) {
				mkUpData.push(dataProd.data)
			}
		} catch (error) {
			console.log(error);
			continue;
		}
	}

	console.log("марк", mkUpData);

	render.createMarcup(refs.productList, mkUpData, render.markUpProducts, false);

}

const renderProducts = async (queryLink) => {
	try {
		const dataProd = await apiRest.getApiData(queryLink);
		console.log(dataProd.data, "render", refs.productModal);
		render.createMarcup(refs.productModal, dataProd.data, render.markUpProductModal, true);
		render.showViewElement(refs.sectionModal, 'modal--is-open');
		//refs.sectionModal.classList.add('modal--is-open');
	}
	catch (e) {
		console.log(e.message);
	}
}
