//Функцію для створення, рендеру або видалення розмітки

import refs from "./refs";
import * as storageLib from "./storage.js";
import * as apiRest from "./products-api.js";

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

export function removeClassElement(element, className) {
	element.classList.remove(className);
}

export function addClassElement(element, className) {
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
	//console.log(button, isInStorage, storageKey);
	return isInStorage;
}

export const renderProductsModal = async (queryLink) => {
	try {
		const dataProd = await apiRest.getApiData(queryLink);
		//console.log(dataProd.data, "render", refs.productModal);
		createMarcup(refs.productModal, dataProd.data, markUpProductModal, true);
		addClassElement(refs.sectionModal, 'modal--is-open');

		refs.inWishList = updateButtonState(refs.addToWishList, refs.WL_DATA, refs.TW_ADD, refs.TW_REMOVE, storageLib.isInWishListBind);

		refs.inCardList = updateButtonState(refs.addToCart, refs.CD_DATA, refs.TC_ADD, refs.TC_REMOVE, storageLib.isInCardListBind);
	}
	catch (e) {
		console.log(e.message);
	}
}

export function cardListLoad(mode) {
	console.log("cart/list");
	clearElement(refs.productList);

	storageLib.updateHeader();
	if (mode === refs.CD_DATA) {
		storageLib.StorageService.setCountTo(refs.cardItemsCount, refs.CD_DATA);
		storageLib.StorageService.setTotalCard(refs.cardItemsTotal);
	}
	markUpCardListProducts(mode);

	addClassElement(refs.searchForm, "hidden");
}

export async function markUpCardListProducts(storageKey) {
	const storageData = storageLib.StorageService.get(storageKey);

	console.log(storageKey, storageData);
	//const mkUpData = [];
	//for (const item of storageData) {
	//	const prodId = storageKey === refs.CD_DATA ? item.id : item;

	//	const vQuery = refs.BASE_URL + `/${prodId}`;
	//	try {
	//		const dataProd = await apiRest.getApiData(vQuery);
	//		console.log(dataProd.data.length);
	//		if (dataProd.data) {
	//			mkUpData.push(dataProd.data)
	//		}
	//	} catch (error) {
	//		console.log(error);
	//		continue;
	//	}
	//}
	const promises = storageData.map(item => {
		const prodId = storageKey === refs.CD_DATA ? item.id : item;
		const vQuery = refs.BASE_URL + `/${prodId}`;
		return apiRest.getApiData(vQuery)
			.then(data => data.data)
			.catch(error => {
				console.error("Помилка для id:", prodId, error);
				return null; // Пропускаємо зламані
			});
	});

	//console.log(promises);

	const results = await Promise.all(promises);

	// Фільтруємо null або undefined
	const mkUpData = results.filter(Boolean);

	console.log("марк", mkUpData);

	createMarcup(refs.productList, mkUpData, markUpProducts, false);
}