//Обʼєкт з посиланнями на ДОМ елементи

export default {
	BASE_URL: 'https://dummyjson.com/products',
	qCategories: 'https://dummyjson.com/products/categories',
	currentQuery: "",
	currentPage: 1,
	totalItems: 0,
	defLimit: 12,
	productID: 0,
	//LS vars
	WL_DATA: "wishListData",
	CD_DATA: "cardData",

	//elements
	categoryList: document.querySelector(".categories"),
	productList: document.querySelector(".products"),
	load_more: document.querySelector(".load-more__btn"),
	searchForm: document.querySelector(".search-form"),
	divNotFound: document.querySelector(".not-found"),
	//modal
	productModal: document.querySelector(".modal-product"),
	sectionModal: document.querySelector(".modal"),
	closeBtnModal: document.querySelector(".modal__close-btn"),
	//card ==== wishlist
	arrOfCounters: document.querySelectorAll("nav__count"),
	addToWishList: document.querySelector(".modal-product__btn--wishlist"),
	addToCart: document.querySelector(".modal-product__btn--cart"),
	cardCount: document.querySelector("[data-cart-count]"),
	wishCount: document.querySelector("[data-wishlist-count]")

};
