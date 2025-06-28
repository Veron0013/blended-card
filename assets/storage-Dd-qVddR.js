const s={BASE_URL:"https://dummyjson.com/products",qCategories:"https://dummyjson.com/products/categories",currentQuery:"",currentPage:1,totalItems:0,defLimit:12,productID:0,WL_DATA:"wishListData",CD_DATA:"cardData",categoryList:document.querySelector(".categories"),productList:document.querySelector(".products"),load_more:document.querySelector(".load-more__btn"),searchForm:document.querySelector(".search-form"),divNotFound:document.querySelector(".not-found"),productModal:document.querySelector(".modal-product"),sectionModal:document.querySelector(".modal"),closeBtnModal:document.querySelector(".modal__close-btn"),arrOfCounters:document.querySelectorAll("nav__count"),addToWishList:document.querySelector(".modal-product__btn--wishlist"),addToCart:document.querySelector(".modal-product__btn--cart"),cardCount:document.querySelector("[data-cart-count]"),wishCount:document.querySelector("[data-wishlist-count]")};function A(t,o,e,c=!1){c&&(t.innerHTML=""),t.insertAdjacentHTML("beforeend",e(o))}const k=t=>{const o=t.map(({name:e,url:c})=>`<li class="categories__item" data-url="${c}">
					<button  class="categories__btn" type="button">${e}
					</button>
				</li>`).join("");return`<li class="categories__item" data-url="${s.BASE_URL}">
					<button  class="categories__btn" type="button">ALL
					</button>
				</li>${o}`},M=t=>t.map(({id:e,title:c,description:g,dimensions:n,category:a,price:d,discountPercentage:y,rating:b,stock:$,brand:u,sku:l,reviews:i,barcode:p,images:r})=>`<li class="products__item" data-id="${e}">
    <img class="products__image" src="${r[0]}" alt="${c}"/>
    <p class="products__title">${c}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${u}</p>
    <p class="products__category">Category: ${a}</p>
    <p class="products__price">Price: ${d}$</p>
 </li>`).join(""),T=({id:t,title:o,description:e,dimensions:c,category:g,price:n,discountPercentage:a,rating:d,stock:y,brand:b,sku:$,reviews:u,returnPolicy:l,images:i,shippingInformation:p,tags:r})=>{const f=((r==null?void 0:r.map(L=>`<li class="modal-product__tag-item">#${L}</li>`))||[]).join(""),S=a>5?` <p class="modal-product__price-before">Price: <span class="modal-product__price-before-cross">${Math.round(n*(1+a/100))}$</span></p>`:"",h=`<img class="modal-product__img" src="${i[0]}" alt="${o}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${o}</p>
        <ul class="modal-product__tags">${f}</ul>
        <p class="modal-product__description">${e}</p>
        <p class="modal-product__shipping-information">Shipping: ${p}</p>
        <p class="modal-product__return-policy">Return Policy: ${l}</p>${S}
				<p class="modal-product__price">Price: ${n}$</p>
        <button class="load-more__btn" type="button">Buy</button>
      </div>`;return s.productID=t,h};function w(t){t.innerHTML=""}function D(t,o){t.classList.remove(o)}function I(t,o){t.classList.add(o)}function m(){C()}const C=()=>{[{key:s.WL_DATA,el:s.wishCount},{key:s.CD_DATA,el:s.cardCount}].forEach(({key:o,el:e})=>{localStorage.getItem(o)&&_.setCountTo(e,o)})},_={get(t){return JSON.parse(localStorage.getItem(t))||[]},add(t,o){const e=this.get(t);e.includes(o)||(e.push(o),localStorage.setItem(t,JSON.stringify(e)))},count(t){return this.get(t).length},setCountTo(t,o){t.textContent=this.count(o)}};function v(t,o){t.disabled=!0,console.log("refID",s.productID),_.add(o,s.productID),D(s.sectionModal,"modal--is-open"),t.disabled=!1,m()}m();export{v as a,A as b,w as c,M as d,T as e,D as h,k as m,s as r,I as s,m as u};
//# sourceMappingURL=storage-Dd-qVddR.js.map
