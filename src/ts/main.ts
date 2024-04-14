import "../scss/style.scss";
import { getItems, Product } from "./getItems";
import { render } from "./render";
import { getMainSample } from "./getMainSample";
import { getCartSample } from "./getCartSample";
import { renderCurrentAddBtnInMain } from "./renderCurrentAddBtnInMain";
import { renderCurrentPrice } from "./renderCurrentPrice";

(async function () {
  const cardsWrapper: HTMLElement = document.getElementById("cards-wrapper")!;
  const cartWrapper: HTMLElement = document.getElementById("cart-wrapper")!;
  const cartPopup: HTMLElement = document.getElementById("cart-popup")!;
  const cartBtn: HTMLElement = document.getElementById("cart-btn")!;
  const cartNum: HTMLElement = document.getElementById("cart-num")!;
  const totalPrice: HTMLElement = document.getElementById("total-price")!;
  const makeOrder: HTMLElement = document.getElementById("make-order")!;
  const closeCart: HTMLElement = document.getElementById("close-btn")!;
  const NO_ITEMS_MASSAGE: string = `<p class="cart-popup__no-items-in-cart"> В корзине нет товаров </p>`;

  let cartItems: Product[];

  if (localStorage.length) {
    cartItems = JSON.parse(localStorage.getItem("cart")!);
  } else cartItems = [];

  const products: Product[] = await getItems();

  if (cartItems.length) {
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < cartItems.length; j++) {
        if (cartItems[j].id === products[i].id) {
          products.splice(products.indexOf(products[i]), 1, cartItems[j]);
        }
      }
    }
  }

  function changeTotalPrice() {
    totalPrice.innerText = `${cartItems
      .reduce(
        (totalSum: number, product: Product) =>
          (totalSum += product.price * product.quantity),
        0
      )
      .toString()} руб.`;
  }

  function changeNumberOfItemsInCart() {
    cartNum.innerText = cartItems
      .reduce((sum: number, item: Product) => (sum += item.quantity), 0)
      .toString();
  }

  function deleteItem(itemId: string, currProduct: Product) {
    const productCardInMain: HTMLElement = cardsWrapper.querySelector(
      `[data-button-id='${itemId}']`
    )!;
    renderCurrentAddBtnInMain(productCardInMain, currProduct);
    cartItems.splice(cartItems.indexOf(currProduct), 1);
    if (cartItems.length === 0) {
      cartWrapper.innerHTML = NO_ITEMS_MASSAGE;
      localStorage.removeItem("cart");
    } else {
      render(cartItems, cartWrapper, getCartSample);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }

  render(products, cardsWrapper, getMainSample);
  changeNumberOfItemsInCart();

  cardsWrapper.addEventListener("click", (e) => {
    const clickTarget = e.target as HTMLElement;

    if (clickTarget.hasAttribute(`data-button-id`)) {
      clickTarget.classList.add("added");
      clickTarget.innerText = "Добавлено в корзину";

      const itemId: string = clickTarget.dataset.buttonId!;
      const currProduct: Product = products.find(
        (product) => product.id === parseInt(itemId!)
      )!;

      if (!cartItems.includes(currProduct)) {
        currProduct.quantity++;
        cartItems.push(currProduct);
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }

      changeNumberOfItemsInCart();
    }
  });

  cartWrapper.addEventListener("click", (e) => {
    const clickTarget = e.target as HTMLElement;

    if (clickTarget.hasAttribute(`data-counter-btn-id`)) {
      const itemId: string = clickTarget.dataset.counterBtnId!;
      const currProduct: Product = products.find(
        (product) => product.id === parseInt(itemId!)
      )!;

      const card: HTMLElement = cartWrapper.querySelector(
        `[data-card-id='${itemId}']`
      )!;

      const counter: HTMLElement = card.querySelector(`[data-counter-id]`)!;

      const price: HTMLElement = card.querySelector(`[data-price-id]`)!;

      if (clickTarget.dataset.type === "minus") {
        currProduct.quantity--;
        counter.innerText = currProduct.quantity.toString();
        localStorage.setItem("cart", JSON.stringify(cartItems));

        if (currProduct.quantity === 0) {
          deleteItem(itemId, currProduct);
        }
      } else if (clickTarget.dataset.type === "plus") {
        currProduct.quantity++;
        counter.innerText = currProduct.quantity.toString();
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }

      renderCurrentPrice(price, currProduct);
      changeTotalPrice();
    }

    if (clickTarget.hasAttribute(`data-delete-btn`)) {
      const itemId: string = clickTarget.dataset.deleteBtn!;
      const currProduct: Product = products.find(
        (product) => product.id === parseInt(itemId!)
      )!;
      currProduct.quantity = 0;

      deleteItem(itemId, currProduct);
      changeTotalPrice();
    }
  });

  cartBtn.addEventListener("click", () => {
    cartPopup.classList.remove("hidden");
    if (cartItems.length === 0) {
      cartWrapper.innerHTML = NO_ITEMS_MASSAGE;
      totalPrice.innerText = `0 руб.`;
    } else {
      render(cartItems, cartWrapper, getCartSample);
      changeTotalPrice();
    }

    closeCart.addEventListener("click", function () {
      changeNumberOfItemsInCart();
      cartPopup.classList.add("hidden");
    });

    cartPopup
      .querySelector(".cart-popup__box")!
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });

    cartPopup.addEventListener("click", function () {
      changeNumberOfItemsInCart();
      this.classList.add("hidden");
    });
  });

  makeOrder.addEventListener("click", () => {
    // Final order composition
    console.log(cartItems);
  });
})();
