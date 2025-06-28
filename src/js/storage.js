//Робота з loacalStorage
import refs from "./refs";
import * as render from "./render-function.js";

export function updateHeader() {
	readLocalStorage();
}

export const readLocalStorage = () => {
	const items = [
		{ key: refs.WL_DATA, el: refs.wishCount },
		{ key: refs.CD_DATA, el: refs.cardCount },
	];

	items.forEach(({ key, el }) => {
		if (localStorage.getItem(key)) {
			StorageService.setCountTo(el, key);
		}
	});

}

//= на подумать

export const StorageService = {
	get(key) {
		return JSON.parse(localStorage.getItem(key)) || [];
	},
	add(key, item) {
		const data = this.get(key);
		if (!data.includes(item)) {
			data.push(item);
			localStorage.setItem(key, JSON.stringify(data));
		}
	},
	count(key) {
		return this.get(key).length;
	},
	setCountTo(el, key) {
		el.textContent = this.count(key);
	},
};

export function confirmAndCloseModal(buton, keyData) {
	buton.disabled = true;
	console.log("refID", refs.productID);

	StorageService.add(keyData, refs.productID);
	render.hideViewElement(refs.sectionModal, 'modal--is-open');
	buton.disabled = false;

	updateHeader();
}

updateHeader();