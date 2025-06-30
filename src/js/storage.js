//Робота з loacalStorage
import refs from "./refs.js";
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

export const StorageService = {
	get(key) {
		return JSON.parse(localStorage.getItem(key)) || [];
	},
	addToWishList(key, item) {
		const data = this.get(key);
		if (!data.includes(item)) {
			data.push(item);
			localStorage.setItem(key, JSON.stringify(data));
		}
	},
	addToCard(key, id, price, qty = 1) {
		const data = this.get(key);
		const index = data.findIndex(itm => itm.id === id);

		if (index === -1) {
			data.push({ id, price, qty });
		} else {
			console.log("izitoast");
			//data[index].qty += qty;
		}
		localStorage.setItem(key, JSON.stringify(data));
	},
	// isCard = true → масив об'єктів з id, false → масив простих id
	removeFromStorage(key, id, isCard = false) {
		const data = this.get(key);
		const fArray = data.filter(itm => isCard ? itm.id !== id : itm !== id);
		localStorage.setItem(key, JSON.stringify(fArray));
	},
	setTotalCard(el) {
		const arrOfItems = this.get(refs.CD_DATA);
		let total = 0;
		if (arrOfItems.length) {
			total = arrOfItems.reduce((acc, val) => acc + val.price * val.qty, 0);
		}
		console.log(total);

		el.textContent = `${total.toFixed(2)} $`;
	},
	count(key) {
		return this.get(key).length;
	},
	isInCardList(key, id) {
		return this
			.get(key)
			.find(x => x.id === id) !== undefined;
	},
	isInWishList(key, id) {
		return this
			.get(key)
			.find(x => x === id) !== undefined;
	},
	setCountTo(el, key) {
		el.textContent = this.count(key) || 0;
	},
};

export function confirmAndCloseModal(button, keyData, addToCard = false) {
	button.disabled = true;
	console.log("refID", refs.productID);


	if (addToCard) {
		StorageService.addToCard(keyData, refs.productID, refs.price);
		//button.textContent = "Remove from card";
	} else {
		StorageService.addToWishList(keyData, refs.productID);
	}
	//render.removeClassElement(refs.sectionModal, 'modal--is-open');
	button.disabled = false;

	updateHeader();
}


//ai допоміг скласти
export function toggleStorageItem({
	button,
	key,
	id,
	addHandler,
	checkHandler,
	removeHandler,
	updateButton,
	labelAdd,
	labelRemove,
	isCard = false
}) {
	const isInStorage = checkHandler(key, id);

	if (isInStorage) {
		removeHandler(key, id, isCard);
	} else {
		addHandler(button, key);
	}

	updateButton(button, key, labelAdd, labelRemove, checkHandler);

	updateHeader();
}

updateHeader();

export const isInWishListBind = StorageService.isInWishList.bind(StorageService);
export const isInCardListBind = StorageService.isInCardList.bind(StorageService);
export const RemoveFromStorageBind = StorageService.removeFromStorage.bind(StorageService);
