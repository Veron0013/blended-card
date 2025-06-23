//Функцію для створення, рендеру або видалення розмітки

import refs from "./refs";

export function createMarcup(element, data, callBack) {
	element.insertAdjacentHTML("beforeend", callBack(data));
}

export const markUpCategories = (data) => {
	return data.map(({ name, url }) => {
		return `<li class="categories__item" data-url="${url}">
					<button  class="categories__btn" type="button">${name}
					</button>
				</li>`;
	})
		.join("");
}

export const markUpProducts = (data) => {
	return data.map(({ id, title, description, dimensions, category, price, discountPercentage, rating, stock, brand, sku, reviews, barcode, images }) => {
		return `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${images[0]}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${brand}</p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>`	})
		.join("");
}

export function clearElement(element) {
	element.innerHTML = '';
}