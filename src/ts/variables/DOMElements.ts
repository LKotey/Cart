const cardsWrapper = (): HTMLElement =>
  document.getElementById("cards-wrapper")!;
const cartWrapper = (): HTMLElement => document.getElementById("cart-wrapper")!;
const cartPopup = (): HTMLElement => document.getElementById("cart-popup")!;
const cartBtn = (): HTMLElement => document.getElementById("cart-btn")!;
const makeOrder = (): HTMLElement => document.getElementById("make-order")!;
const closeCart = (): HTMLElement => document.getElementById("close-btn")!;

export { cardsWrapper, cartWrapper, cartPopup, cartBtn, makeOrder, closeCart };
