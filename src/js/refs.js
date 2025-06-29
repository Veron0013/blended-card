//Обʼєкт з посиланнями на ДОМ елементи

export default {
	BASE_URL: 'https://dummyjson.com/products',
	qCategories: 'https://dummyjson.com/products/categories',
	currentQuery: "",
	currentPage: 1,
	totalItems: 0,
	defLimit: 12,
	productID: 0,
	price: 0,
	inWishList: false,
	inCardList: false,
	//LS vars
	WL_DATA: "wishListData",
	CD_DATA: "cardData",
	TC_REMOVE: "Remove from cart",
	TW_REMOVE: "Remove from Wishlist",
	TC_ADD: "Add to cart",
	TW_ADD: "Add to Wishlist",

	//elements
	categoryList: document.querySelector(".categories"),
	productList: document.querySelector(".products"),
	load_more: document.querySelector(".load-more__btn"),
	searchForm: document.querySelector(".search-form"),
	divNotFound: document.querySelector(".not-found"),
	searchFormButton: document.querySelector(".search-form__btn-clear"),
	//modal
	productModal: document.querySelector(".modal-product"),
	sectionModal: document.querySelector(".modal"),
	closeBtnModal: document.querySelector(".modal__close-btn"),
	//card ==== wishlist
	arrOfCounters: document.querySelectorAll("nav__count"),
	addToWishList: document.querySelector(".modal-product__btn--wishlist"),
	addToCart: document.querySelector(".modal-product__btn--cart"),
	cardCount: document.querySelector("[data-cart-count]"),
	wishCount: document.querySelector("[data-wishlist-count]"),
	//card elements
	cardItemsCount: document.querySelector("[data-count]"),
	cardItemsTotal: document.querySelector("[data-price]")
};
