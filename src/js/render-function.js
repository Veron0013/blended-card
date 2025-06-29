//Функцію для створення, рендеру або видалення розмітки

import refs from "./refs";
import * as storageLib from "./storage.js";

export function createMarcup(element, data, callBack, clearElement = false) {
	if (clearElement) {
		element.innerHTML = "";
	}
	element.insertAdjacentHTML("beforeend", callBack(data));
}

export const markUpCategories = (data) => {
	const mkData = data.map(({ name, url }) => {
		return `<li class="categories__item" data-url="${url}">
					<button  class="categories__btn" type="button">${name}
					</button>
				</li>`;
	})
		.join("");
	return `<li class="categories__item" data-url="${refs.BASE_URL}">
					<button  class="categories__btn" type="button">ALL
					</button>
				</li>${mkData}`
}

export const markUpProducts = (data) => {
	const mkData = data.map(({ id, title, description, dimensions, category, price, discountPercentage, rating, stock, brand, sku, reviews, barcode, images }) => {
		return `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${images[0]}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${brand}</p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>`	})
		.join("");

	return mkData;
}

export const markUpProductModal = ({ id, title, description, dimensions, category, price, discountPercentage, rating, stock, brand, sku, reviews, returnPolicy, images, shippingInformation, tags }) => {
	const tagsList = tags?.map(tag => `<li class="modal-product__tag-item">#${tag}</li>`) || [];
	const tagsMark = tagsList.join('');

	const dicsount = discountPercentage > 5 ? ` <p class="modal-product__price-before">Price: <span class="modal-product__price-before-cross">${Math.round(price * (1 + (discountPercentage / 100)))}$</span></p>` : ``;

	const mkData = `<img class="modal-product__img" src="${images[0]}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tagsMark}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>${dicsount}
				<p class="modal-product__price">Price: ${price}$</p>
        <button class="load-more__btn" type="button">Buy</button>
      </div>`;
	//console.log("mark", mkData);

	refs.productID = id;
	refs.price = price;

	return mkData;
}

export function clearElement(element) {
	element.innerHTML = '';
}

export function hideViewElement(element, className) {
	element.classList.remove(className);
}

export function showViewElement(element, className) {
	element.classList.add(className);
}

export function validateStorageData(button, dataKey, refConst, addConst, removeConst) {

	refConst = storageLib.StorageService.isInWishList(dataKey, refs.productID);
	button.textContent = refConst ? addConst : removeConst;
}

//refs.isInWishList = storageLib.StorageService.isInCardList(refs.CD_DATA, refs.productID);
//refs.addToCart.textContent = refs.isInWishList ? refs.TC_REMOVE : refs.TC_ADD;

//validateStorageData(refs.addToCart, refs.CD_DATA, refs.isInWishList, refs.TC_ADD, refs.TC_REMOVE);

export function updateButtonState(button, storageKey, labelAdd, labelRemove, callBack) {
	const isInStorage = callBack(storageKey, refs.productID);
	button.textContent = isInStorage ? labelRemove : labelAdd;
	console.log(button, isInStorage, storageKey);

	return isInStorage;
}