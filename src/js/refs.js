//Обʼєкт з посиланнями на ДОМ елементи

export default {
	BASE_URL: 'https://dummyjson.com/products',
	qCategories: 'https://dummyjson.com/products/categories',
	currentQuery: "",
	categoryList: document.querySelector(".categories"),
	productList: document.querySelector(".products"),
	load_more: document.querySelector(".load-more__btn"),
	productModal: document.querySelector(".modal-product"),
	sectionModal: document.querySelector(".modal"),
	closeBtnModal: document.querySelector(".modal__close-btn"),
	searchForm: document.querySelector(".search-form"),
	divNotFound: document.querySelector(".not-found"),
	currentPage: 1,
	totalItems: 0,
	defLimit: 12
};
