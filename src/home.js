//Логіка сторінки Home
import refs from "./js/refs.js";
import * as render from "./js/render-function.js";
import * as apiRest from "./js/products-api.js";
import * as storageLib from "./js/storage.js";



const renderCategories = async () => {

	try {
		const dataCat = await apiRest.getApiData(refs.qCategories);
		console.log(dataCat);
		render.createMarcup(refs.categoryList, dataCat.data, render.markUpCategories, true);
	}
	catch (e) {
		console.log(e.message);
	}

}
const renderProducts = async (queryLink, loadMore = false) => {
	render.showViewElement(refs.load_more, "hidden");
	render.hideViewElement(refs.divNotFound, "not-found--visible");

	try {
		const dataProd = await apiRest.getApiData(queryLink);
		const N_F = !Array.isArray(dataProd.data?.products) || dataProd.data.products.length === 0;
		console.log(queryLink, N_F);

		if (!Array.isArray(dataProd.data?.products) || dataProd.data.products.length === 0) {
			render.showViewElement(refs.divNotFound, "not-found--visible");
		}
		//console.log(dataProd);
		render.createMarcup(refs.productList, dataProd.data.products, render.markUpProducts, !loadMore);
		refs.totalItems = dataProd.data.total;

		console.log(refs.totalItems, refs.currentPage * refs.defLimit);

		if (refs.totalItems > refs.currentPage * refs.defLimit) {
			render.hideViewElement(refs.load_more, "hidden");
		}
	}
	catch (e) {
		console.log(e.message);
	}
	finally {
		refs.load_more.disabled = false;
	}
}
const renderProductsModal = async (queryLink) => {
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

refs.categoryList.addEventListener("click", (e) => {
	const li = e.target.closest(".categories__item");
	if (!li) return;

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

	renderProductsModal(vQuery);
});
refs.load_more.addEventListener("click", (e) => {
	refs.load_more.disabled = true;
	refs.currentPage++;

	const cPage = (refs.currentPage - 1) * 12
	const vQuery = apiRest.buildQuery(refs.currentQuery, cPage, refs.defLimit);
	//onst vQuery = refs.currentQuery + `&limit=${refs.defLimit}&skip=${(refs.currentPage - 1) * refs.defLimit}`;
	console.log(vQuery);
	renderProducts(vQuery, true);

});

refs.closeBtnModal.addEventListener("click", (e) => {
	render.hideViewElement(refs.sectionModal, 'modal--is-open');
	//.classList.remove('modal--is-open');
});
refs.searchForm.addEventListener("submit", (e) => {
	e.preventDefault();

	localStorage.clear();

	refs.currentPage = 1;
	//renderTools.clearElement(renderTools.productList);
	const searchData = e.currentTarget.elements['searchValue'].value.trim();

	if (!searchData) return;

	if (searchData.length < 1) return;
	refs.currentQuery = refs.BASE_URL + `/search?q=${searchData}`;
	const vQuery = `${refs.currentQuery}&limit=${refs.defLimit}&skip=${(refs.currentPage - 1) * refs.defLimit}`;
	console.log(vQuery);

	renderProducts(vQuery);
});

refs.addToCart.addEventListener("click", (e) => {
	storageLib.confirmAndCloseModal(refs.addToCart, refs.CD_DATA);
});
refs.addToWishList.addEventListener("click", (e) => {
	storageLib.confirmAndCloseModal(refs.addToWishList, refs.WL_DATA);
});

//////// main load
document.addEventListener("DOMContentLoaded", () => {
	console.log("home");

	renderCategories();
});
