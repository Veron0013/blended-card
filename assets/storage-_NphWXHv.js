const s={BASE_URL:"https://dummyjson.com/products",qCategories:"https://dummyjson.com/products/categories",currentQuery:"",currentPage:1,totalItems:0,defLimit:12,WL_DATA:"wishListData",CD_DATA:"cardData",categoryList:document.querySelector(".categories"),productList:document.querySelector(".products"),load_more:document.querySelector(".load-more__btn"),searchForm:document.querySelector(".search-form"),divNotFound:document.querySelector(".not-found"),productModal:document.querySelector(".modal-product"),sectionModal:document.querySelector(".modal"),closeBtnModal:document.querySelector(".modal__close-btn"),addToWishList:document.querySelector(".modal-product__btn--wishlist"),addToCart:document.querySelector(".modal-product__btn--cart"),cardCount:document.querySelector("[data-cart-count]"),wishCount:document.querySelector("[data-wishlist-count]")};function D(t,o,e,a=!1){a&&(t.innerHTML=""),t.insertAdjacentHTML("beforeend",e(o))}const q=t=>t.map(({name:e,url:a})=>`<li class="categories__item" data-url="${a}">
					<button  class="categories__btn" type="button">${e}
					</button>
				</li>`).join("")+`<li class="categories__item" data-url="${s.BASE_URL}">
					<button  class="categories__btn" type="button">ALL
					</button>
				</li>`,M=t=>t.map(({id:e,title:a,description:c,dimensions:r,category:d,price:u,discountPercentage:b,rating:f,stock:$,brand:n,sku:i,reviews:p,barcode:m,images:l})=>`<li class="products__item" data-id="${e}">
    <img class="products__image" src="${l[0]}" alt="${a}"/>
    <p class="products__title">${a}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${n}</p>
    <p class="products__category">Category: ${d}</p>
    <p class="products__price">Price: ${u}$</p>
 </li>`).join(""),T=({title:t,description:o,dimensions:e,category:a,price:c,discountPercentage:r,rating:d,stock:u,brand:b,sku:f,reviews:$,returnPolicy:n,images:i,shippingInformation:p,tags:m})=>{const l=m.map(L=>`<li class="modal-product__tag-item">#${L}</li>`).join(""),y=r>5?` <p class="modal-product__price-before">Price: <span class="modal-product__price-before-cross">${Math.round(c*(1+r/100))}$</span></p>`:"",_=`<img class="modal-product__img" src="${i[0]}" alt="${t}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${t}</p>
        <ul class="modal-product__tags">${l}</ul>
        <p class="modal-product__description">${o}</p>
        <p class="modal-product__shipping-information">Shipping: ${p}</p>
        <p class="modal-product__return-policy">Return Policy: ${n}</p>${y}
				<p class="modal-product__price">Price: ${c}$</p>
        <button class="load-more__btn" type="button">Buy</button>
      </div>`;return console.log(_),_};function w(t){t.innerHTML=""}function h(t,o){t.classList.remove(o)}function k(t,o){t.classList.add(o)}function g(t,o){const e=JSON.parse(localStorage.getItem(o)).length;console.log(JSON.parse(localStorage.getItem(o))),t.textContent=e}function I(t,o,e){t.disabled=!0,A(o,e),h(s.sectionModal,"modal--is-open"),t.disabled=!1}function A(t,o){const e=localStorage.getItem(o),a=e?JSON.parse(e):[];a.push(t),console.log(localStorage.getItem("ls_data",o)),localStorage.setItem(o,JSON.stringify(a)),S()}const S=()=>{localStorage.getItem(s.WL_DATA)&&g(s.wishCount,s.WL_DATA),localStorage.getItem(s.CD_DATA)&&g(s.cardCount,s.CD_DATA)};function C(){S()}C();export{I as a,D as b,w as c,M as d,T as e,S as f,h,q as m,s as r,k as s};
//# sourceMappingURL=storage-_NphWXHv.js.map
