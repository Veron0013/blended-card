import"./assets/styles-BK7AYJoX.js";import{a as u}from"./assets/vendor-DGDcxXwr.js";const r={BASE_URL:"https://dummyjson.com/products",qCategories:"https://dummyjson.com/products/categories",_perPage:10,categoryList:document.querySelector(".categories"),productList:document.querySelector(".products")};function a(t,e,s){t.insertAdjacentHTML("beforeend",s(e))}const p=t=>t.map(({name:e,url:s})=>`<li class="categories__item" data-url="${s}">
					<button  class="categories__btn" type="button">${e}
					</button>
				</li>`).join(""),l=t=>t.map(({id:e,title:s,description:y,dimensions:L,category:o,price:n,discountPercentage:$,rating:b,stock:f,brand:i,sku:h,reviews:C,barcode:P,images:d})=>`<li class="products__item" data-id="${e}">
    <img class="products__image" src="${d[0]}" alt="${s}"/>
    <p class="products__title">${s}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${i}</p>
    <p class="products__category">Category: ${o}</p>
    <p class="products__price">Price: ${n}$</p>
 </li>`).join("");function g(t){t.innerHTML=""}async function c(t){return await u.get(t).then(e=>e).catch(e=>e.message)}const m=async()=>{try{const t=await c(r.qCategories);console.log(t),a(r.categoryList,t.data,p)}catch(t){console.log(t.message)}},_=async t=>{try{const e=await c(t);console.log(e),a(r.productList,e.data.products,l)}catch(e){console.log(e.message)}};r.categoryList.addEventListener("click",t=>{const e=t.target.closest(".categories__item");e&&(g(r.productList),_(e.dataset.url))});m();
//# sourceMappingURL=index.js.map
