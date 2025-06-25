import"./assets/styles-DT-UWGMR.js";import{a as M}from"./assets/vendor-DGDcxXwr.js";const t={BASE_URL:"https://dummyjson.com/products",qCategories:"https://dummyjson.com/products/categories",currentQuery:"",categoryList:document.querySelector(".categories"),productList:document.querySelector(".products"),load_more:document.querySelector(".load-more__btn"),productModal:document.querySelector(".modal-product"),sectionModal:document.querySelector(".modal"),closeBtnModal:document.querySelector(".modal__close-btn"),searchForm:document.querySelector(".search-form"),divNotFound:document.querySelector(".not-found"),currentPage:1,totalItems:0,defLimit:12};function i(e,o,r,a=!1){a&&(e.innerHTML=""),e.insertAdjacentHTML("beforeend",r(o))}const E=e=>e.map(({name:r,url:a})=>`<li class="categories__item" data-url="${a}">
					<button  class="categories__btn" type="button">${r}
					</button>
				</li>`).join("")+`<li class="categories__item" data-url="${t.BASE_URL}">
					<button  class="categories__btn" type="button">ALL
					</button>
				</li>`,S=e=>e.map(({id:r,title:a,description:s,dimensions:c,category:m,price:p,discountPercentage:b,rating:h,stock:v,brand:n,sku:_,reviews:g,barcode:y,images:d})=>`<li class="products__item" data-id="${r}">
    <img class="products__image" src="${d[0]}" alt="${a}"/>
    <p class="products__title">${a}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${n}</p>
    <p class="products__category">Category: ${m}</p>
    <p class="products__price">Price: ${p}$</p>
 </li>`).join(""),q=({title:e,description:o,dimensions:r,category:a,price:s,discountPercentage:c,rating:m,stock:p,brand:b,sku:h,reviews:v,returnPolicy:n,images:_,shippingInformation:g,tags:y})=>{const d=y.map(P=>`<li class="modal-product__tag-item">#${P}</li>`).join(""),k=c>5?` <p class="modal-product__price-before">Price: <span class="modal-product__price-before-cross">${Math.round(s*(1+c/100))}$</span></p>`:"",f=`<img class="modal-product__img" src="${_[0]}" alt="${e}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${e}</p>
        <ul class="modal-product__tags">${d}</ul>
        <p class="modal-product__description">${o}</p>
        <p class="modal-product__shipping-information">Shipping: ${g}</p>
        <p class="modal-product__return-policy">Return Policy: ${n}</p>${k}
				<p class="modal-product__price">Price: ${s}$</p>
        <button class="load-more__btn" type="button">Buy</button>
      </div>`;return console.log(f),f};function Q(e){e.innerHTML=""}function L(e,o){e.classList.add(o)}function $(e,o){e.classList.remove(o)}async function l(e){return await M.get(e).then(o=>o).catch(o=>o.message)}const w=async()=>{try{const e=await l(t.qCategories);console.log(e),i(t.categoryList,e.data,E,!0)}catch(e){console.log(e.message)}},u=async(e,o=!1)=>{L(t.load_more,"hidden"),$(t.divNotFound,"not-found--visible");try{const r=await l(e);r.data.products.length===0&&L(t.divNotFound,"not-found--visible"),i(t.productList,r.data.products,S,!o),t.totalItems=r.data.total,console.log(t.totalItems,t.currentPage*t.defLimit),t.totalItems>t.currentPage*t.defLimit&&$(t.load_more,"hidden")}catch(r){console.log(r.message)}finally{t.load_more.disabled=!1}},B=async e=>{try{const o=await l(e);console.log(o.data,t.productModal),i(t.productModal,o.data,q,!0),t.sectionModal.classList.add("modal--is-open")}catch(o){console.log(o.message)}};t.categoryList.addEventListener("click",e=>{const o=e.target.closest(".categories__item");if(!o)return;t.currentPage=1,Q(t.productList),t.currentQuery=o.dataset.url;const r=t.currentQuery+`?limit=12&skip=${(t.currentPage-1)*12}`;u(r)});t.load_more.addEventListener("click",e=>{t.load_more.disabled=!0,t.currentPage++;const o=t.currentQuery+`&limit=${t.defLimit}&skip=${(t.currentPage-1)*t.defLimit}`;console.log(o),u(o,!0)});t.productList.addEventListener("click",e=>{const o=e.target.closest(".products__item");if(!o)return;console.log(o);const r=o.dataset.id,a=t.BASE_URL+`/${r}`;console.log(a),B(a)});t.closeBtnModal.addEventListener("click",e=>{t.sectionModal.classList.remove("modal--is-open")});t.searchForm.addEventListener("submit",e=>{e.preventDefault(),t.currentPage=1;const o=e.currentTarget.elements.searchValue.value.trim();if(!o||o.length<1)return;t.currentQuery=t.BASE_URL+`/search?q=${o}`;const r=`${t.currentQuery}&limit=${t.defLimit}&skip=${(t.currentPage-1)*t.defLimit}`;console.log(r),u(r)});w();
//# sourceMappingURL=index.js.map
