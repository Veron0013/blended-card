////Допоміжні функції
//import * as render from "./render-function.js";
//import refs from "./refs";
//import * as storageLib from "./storage.js";

//export function setContFromLocalStorage(element, keyData) {
//	const data = storageLib.StorageService.get(keyData);
//	//JSON.parse(localStorage.getItem(keyData)) || [];
//	const wCount = data.length;
//	console.log(keyData, JSON.parse(localStorage.getItem(keyData)));

//	element.textContent = wCount;
//}

//export function confirmAndCloseModal(buton, keyData) {
//	buton.disabled = true;

//	storageLib.StorageService.add(keyData, refs.productID);
//	render.hideViewElement(refs.sectionModal, 'modal--is-open');
//	buton.disabled = false;

//	storageLib.updateHeader();
//}