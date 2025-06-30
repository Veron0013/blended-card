//Логіка сторінки Home
import refs from "./js/refs.js";
import * as render from "./js/render-function.js";
import * as apiRest from "./js/products-api.js";
import * as storageLib from "./js/storage.js";

const renderCategories = async () => {

	try {
		const dataCat = await apiRest.getApiData(refs.qCategories);
		//console.log(dataCat);
		render.createMarcup(refs.categoryList, dataCat.data, render.markUpCategories, true);
	}
	catch (e) {
		console.log(e.message);
	}

}
const renderProducts = async (queryLink, loadMore = false) => {
	render.addClassElement(refs.load_more, "hidden");
	render.removeClassElement(refs.divNotFound, "not-found--visible");

	try {
		const dataProd = await apiRest.getApiData(queryLink);
		const N_F = !Array.isArray(dataProd.data?.products) || dataProd.data.products.length === 0;

		if (N_F) {
			render.addClassElement(refs.divNotFound, "not-found--visible");
		}
		//console.log(dataProd);
		render.createMarcup(refs.productList, dataProd.data.products, render.markUpProducts, !loadMore);
		refs.totalItems = dataProd.data.total;

		//console.log(refs.totalItems, refs.currentPage * refs.defLimit);

		if (refs.totalItems > refs.currentPage * refs.defLimit) {
			render.removeClassElement(refs.load_more, "hidden");
		}
	}
	catch (e) {
		console.log(e.message);
	}
	finally {
		refs.load_more.disabled = false;
	}
}

refs.categoryList.addEventListener("click", (e) => {
	const li = e.target.closest(".categories__item");
	if (!li) return;

	refs.isSearch = false;
	refs.currentPage = 1;
	render.clearElement(refs.productList);
	refs.currentQuery = li.dataset.url;

	//const vQuery = refs.currentQuery + `?limit=12&skip=${(refs.currentPage - 1) * 12}`;
	const cPage = (refs.currentPage - 1) * 12
	const vQuery = apiRest.buildQuery(refs.currentQuery, cPage, refs.defLimit);
	renderProducts(vQuery);
});
refs.productList.addEventListener("click", (e) => {
	const prodEl = e.target.closest(".products__item");
	if (!prodEl) return;

	console.log(prodEl);
	const prodId = prodEl.dataset.id;

	const vQuery = refs.BASE_URL + `/${prodId}`;
	console.log(vQuery);

	render.renderProductsModal(vQuery);
});
///не читає всі товари
refs.load_more.addEventListener("click", (e) => {
	refs.load_more.disabled = true;
	refs.currentPage++;

	const cPage = (refs.currentPage - 1) * 12
	const sym = refs.isSearch ? "&" : "?";
	const vQuery = apiRest.buildQuery(refs.currentQuery, cPage, refs.defLimit, sym);
	console.log(vQuery);
	renderProducts(vQuery, true);

});

refs.closeBtnModal.addEventListener("click", (e) => {
	render.removeClassElement(refs.sectionModal, 'modal--is-open');
	//.classList.remove('modal--is-open');
});
refs.searchForm.addEventListener("submit", (e) => {
	e.preventDefault();

	localStorage.clear();
	refs.isSearch = true;

	refs.currentPage = 1;
	//renderTools.clearElement(renderTools.productList);
	const searchData = e.currentTarget.elements['searchValue'].value.trim();

	if (!searchData) return;

	if (searchData.length < 1) return;
	refs.currentQuery = refs.BASE_URL + `/search?q=${searchData}`;
	const vQuery = `${refs.currentQuery}&limit=${refs.defLimit}&skip=${(refs.currentPage - 1) * refs.defLimit}`;
	//console.log(vQuery);

	renderProducts(vQuery);
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
	//const isInStorage = storageLib.isInCardListBind(refs.CD_DATA, refs.productID);
	//if (isInStorage) {
	//	storageLib.StorageService.removeFromStorage(refs.CD_DATA, refs.productID, true);
	//} else {
	//	storageLib.confirmAndCloseModal(refs.addToCart, refs.CD_DATA, true);
	//}
	//refs.inCardList = render.updateButtonState(refs.addToCart, refs.CD_DATA, refs.TC_ADD, refs.TC_REMOVE, storageLib.isInCardListBind);

	//storageLib.updateHeader();
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
	//const isInStorage = storageLib.isInWishListBind(refs.WL_DATA, refs.productID);
	//if (isInStorage) {
	//	storageLib.StorageService.removeFromStorage(refs.WL_DATA, refs.productID);
	//} else {
	//	storageLib.confirmAndCloseModal(refs.addToWishList, refs.WL_DATA);
	//}
	//refs.inWishList = render.updateButtonState(refs.addToWishList, refs.WL_DATA, refs.TW_ADD, refs.TW_REMOVE, storageLib.isInWishListBind);

	//storageLib.updateHeader();
});

//////// main load
document.addEventListener("DOMContentLoaded", () => {
	console.log("Кнопка search чистить local storage");

	renderCategories();
	render.removeClassElement(refs.searchForm, "hidden");
});

window.addEventListener("scroll", () => {
	console.log(window.scrollY);

	if (window.scrollY > 600) {
		render.removeClassElement(refs.backoTop, "hidden");
	} else {
		render.addClassElement(refs.backoTop, "hidden");
	}
});

refs.backoTop.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});
