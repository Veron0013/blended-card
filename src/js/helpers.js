//Допоміжні функції
import * as render from "./render-function.js";
import refs from "./refs";

export function setContFromLocalStorage(element, keyData) {
	const wCount = JSON.parse(localStorage.getItem(keyData)).length;
	console.log(JSON.parse(localStorage.getItem(keyData)));

	element.textContent = wCount;
}

export function confirmAnfCloseModal(buton, productId, keyData) {
	buton.disabled = true;

	addProductsToLocalStorage(productId, keyData);

	render.hideViewElement(refs.sectionModal, 'modal--is-open');
	buton.disabled = false;
}

export function addProductsToLocalStorage(productID, keyData) {
	const vData = localStorage.getItem(keyData);

	const pData = !vData ? [] : JSON.parse(vData);

	pData.push(productID);

	console.log(localStorage.getItem("ls_data", keyData));
	localStorage.setItem(keyData, JSON.stringify(pData));

	readLocalStorage();
}

export const readLocalStorage = () => {
	if (localStorage.getItem(refs.WL_DATA)) {
		setContFromLocalStorage(refs.wishCount, refs.WL_DATA);
	}
	if (localStorage.getItem(refs.CD_DATA)) {
		setContFromLocalStorage(refs.cardCount, refs.CD_DATA);
	}
}