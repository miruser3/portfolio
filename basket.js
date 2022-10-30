'use strict';

const basketCounterEl=document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const  basketTotalValueEl = document.querySelector('.basketTotalValue');
const openBasketBtn = document.querySelector('.cartIconWrap');
const basketEl = document.querySelector('.basket');
openBasketBtn.addEventListener('click',function(){
    basketEl.classList.toggle('hidden');
});
// Функция назначает обработку клика на все кнопки "Add to cart".
function addEventListenersForAddToCartButtons(){
    const addToCartBtns=document.querySelectorAll('button[data-productId]');
    addToCartBtns.forEach(function(button){
        button.addEventListener('click',addedProductHandler);
    })
}



// Функция-обработчик события клика по кнопке "Add to cart".
function addedProductHandler(event){
    const productId=event.currentTarget.getAttribute('data-productId');
    addProductIntoBasket(productId);

}
function increaseProductsCount(){
basketCounterEl.textContent++;
}
let basket={};
// Метод добавляет продукт в объект basket.
function  addProductToObject(productId){
if (!( productId in basket)){
    basket[productId]=1;
}else{
    basket[productId]++;
}
}
//Функция пересчитывает стоимость товара умноженное на количество товара // в корзине.
function recalculateSumForProduct(productId){
    const productTotalRowEl=document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    let totalPriceForRow=(basket[productId]*products[productId].price).toFixed(2);
    productTotalRowEl.textContent=totalPriceForRow;
}
// Функция увеличивает количество товаров в строке в корзине.
function increaseProductCount(productId){
    const productCountEl=document.querySelector(`.productCount[data-productId="${productId}"]`);
    productCountEl.textContent++;
}
//Функция срабатывает когда нужно отрисовать продукт в корзине.
function renderProductInBasket(productId){
    let productExist=document.querySelector(`.productCount[data-productId="${productId}"]`);
    if (productExist){
        increaseProductCount(productId);
        recalculateSumForProduct(productId);
    }
    renderNewProductInBasket(productId);
}
//Функция отрисовывает новый товар в корзине.
function renderNewProductInBasket(productId){
        let productRow = `
            <div class="basketRow">
                <div>${products[productId].name}</div>
                <div>
                    <span class="productCount" data-productId="${productId}">1</span> шт.
                </div>
                <div>$${products[productId].price}</div>
                <div>
                    $<span class="productTotalRow" data-productId="${productId}">${products[productId].price}</span>
                </div>
            </div>
        `;
        basketTotalEl.insertAdjacentHTML("beforebegin", productRow);

}
//Функция пересчитывает общую стоимость корзины и выводит это значение на страницу.
 
function calculateAndRenderTotalBasketSum(){
    let totalSum = 0;
    for (let productId in basket){
        totalSum += basket[productId]*products[productId].price;
    }
    basketTotalValueEl.textContent = totalSum.toFixed(2);
}
// Эта функция срабатывает когда добавляют новый товар в корзину.
function addProductIntoBasket(productId){
    increaseProductsCount();
    addProductToObject(productId);
    renderProductInBasket(productId);
    calculateAndRenderTotalBasketSum();
}

addEventListenersForAddToCartButtons();