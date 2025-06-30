//Логіка сторінки Cart

import refs from "./js/refs.js";
import * as render from "./js/render-function.js";
import * as apiRest from "./js/products-api.js";
import * as storageLib from "./js/storage.js";


document.addEventListener("DOMContentLoaded", () => {
	render.cardListLoad(refs.CD_DATA);
});

//function cardLoad() {
//	console.log("cart");
//	render.clearElement(refs.productList);

//	storageLib.updateHeader();
//	storageLib.StorageService.setCountTo(refs.cardItemsCount, refs.CD_DATA);
//	storageLib.StorageService.setTotalCard(refs.cardItemsTotal);

//	markUpCardProducts();
//}



const renderProducts = async (queryLink) => {
	try {
		const dataProd = await apiRest.getApiData(queryLink);
		console.log(dataProd.data, "render", refs.productModal);
		render.createMarcup(refs.productModal, dataProd.data, render.markUpProductModal, true);
		render.addClassElement(refs.sectionModal, 'modal--is-open');
		//refs.sectionModal.classList.add('modal--is-open');
	}
	catch (e) {
		console.log(e.message);
	}
}

refs.productList.addEventListener("click", (e) => {
	const prodEl = e.target.closest(".products__item");
	if (!prodEl) return;

	console.log(prodEl);
	const prodId = prodEl.dataset.id;

	const vQuery = refs.BASE_URL + `/${prodId}`;
	console.log(vQuery);

	render.renderProductsModal(vQuery);
});
refs.closeBtnModal.addEventListener("click", (e) => {
	render.removeClassElement(refs.sectionModal, 'modal--is-open');
	cardLoad();
});
refs.addToCart.addEventListener("click", (e) => {
	storageLib.toggleStorageItem({
		button: refs.addToCart,
		key: refs.CD_DATA,
		id: refs.productID,
		addHandler: (btn, key) => storageLib.confirmAndCloseModal(btn, key, true),
		checkHandler: storageLib.isInCardListBind,
		removeHandler: storageLib.RemoveFromStorageBind,
		updateButton: render.updateButtonState,
		labelAdd: refs.TC_ADD,
		labelRemove: refs.TC_REMOVE,
		isCard: true
	});
});
refs.addToWishList.addEventListener("click", (e) => {
	storageLib.toggleStorageItem({
		button: refs.addToWishList,
		key: refs.WL_DATA,
		id: refs.productID,
		addHandler: (btn, key) => storageLib.confirmAndCloseModal(btn, key),
		checkHandler: storageLib.isInWishListBind,
		removeHandler: storageLib.RemoveFromStorageBind,
		updateButton: render.updateButtonState,
		labelAdd: refs.TW_ADD,
		labelRemove: refs.TW_REMOVE
	});
});
