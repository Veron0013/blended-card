//Логіка сторінки Wishlist
import refs from "./js/refs.js";
import * as render from "./js/render-function.js";
import * as apiRest from "./js/products-api.js";
import * as storageLib from "./js/storage.js";


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
	render.cardListLoad(refs.WL_DATA);
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

document.addEventListener("DOMContentLoaded", () => {
	render.cardListLoad(refs.WL_DATA);
});
