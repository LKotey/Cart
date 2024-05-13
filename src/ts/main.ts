import "../scss/style.scss";
import {
  cardsWrapper,
  cartWrapper,
  cartPopup,
  cartBtn,
  makeOrder,
  closeCart,
} from "./variables/DOMElements";
import { getItems, Product, ProductInCart } from "./getItems";
import { render } from "./render/render";
import { changeTotalPrice } from "./Cart/changeTotalPrice";
import { changeNumberOfItemsInCart } from "./Cart/changeNumberOfItemsInCart";
import { changeCurrQuantity } from "./Cart/changeCurrQuantity";
import {
  NO_ITEMS_MASSAGE,
  getCartSample,
  getMainSample,
} from "./variables/TemplateLiterals";
import { checkLS } from "./checkLS";
import { addItemInCart } from "./Cart/addItemInCart";

window.onload = async () => {
  const cartItems: Map<number, ProductInCart> = new Map();
  const products: Map<number, Product> = await getItems();

  //Check if is it anything in localStorage
  checkLS(cartItems, products);
  changeNumberOfItemsInCart(cartItems);

  //Render main list of items
  render<Product>(products, cardsWrapper(), getMainSample);

  // Click to add item in cart
  cardsWrapper().addEventListener("click", (e) => {
    const clickTarget = e.target as HTMLElement;

    if (clickTarget.hasAttribute(`data-button-id`)) {
      addItemInCart(clickTarget, cartItems, products);
      changeNumberOfItemsInCart(cartItems);
    }
  });

  // Click to increase/decrease quantity of current item in cart and update total price
  cartWrapper().addEventListener("click", (e) => {
    const clickTarget = e.target as HTMLElement;

    if (clickTarget.hasAttribute(`data-counter-btn-id`)) {
      changeCurrQuantity(clickTarget, cartItems);
      changeTotalPrice(cartItems);
    }
  });

  // Click to show the cart
  cartBtn().addEventListener("click", () => {
    cartPopup().classList.remove("hidden");
    if (cartItems.size === 0) {
      cartWrapper().innerHTML = NO_ITEMS_MASSAGE;
      changeTotalPrice(cartItems);
    } else {
      render<ProductInCart>(cartItems, cartWrapper(), getCartSample);
      changeTotalPrice(cartItems);
    }
  });

  // Click to make final order composition
  makeOrder().addEventListener("click", () => {
    console.log(...cartItems.values());
  });

  // stopPropagation to disable click on the cart list
  cartPopup()
    .querySelector(".cart-popup__box")!
    .addEventListener("click", (e) => {
      e.stopPropagation();
    });

  // Click to hide the cart
  cartPopup().addEventListener("click", function () {
    changeNumberOfItemsInCart(cartItems);
    this.classList.add("hidden");
  });

  // Click to hide the cart
  closeCart().addEventListener("click", function () {
    changeNumberOfItemsInCart(cartItems);
    cartPopup().classList.add("hidden");
  });
};
