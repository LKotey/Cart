import { ProductInCart } from "../getItems";
import { cardsWrapper, cartWrapper } from "../variables/DOMElements";
import { renderCurrentPrice } from "../render/renderCurrentPrice";
import { NO_ITEMS_MASSAGE, getCartSample } from "../variables/TemplateLiterals";
import { render } from "../render/render";

function deleteItem(itemId: number, cartItems: Map<number, ProductInCart>) {
  const productCardInMain: HTMLElement = cardsWrapper().querySelector(
    `[data-button-id='${itemId}']`
  )!;
  productCardInMain.classList.remove("added");
  productCardInMain.innerText = "В корзину";

  cartItems.delete(itemId);
  localStorage.setItem("cart", JSON.stringify(Object.fromEntries(cartItems)));
  if (cartItems.size === 0) {
    cartWrapper().innerHTML = NO_ITEMS_MASSAGE;
    localStorage.removeItem("cart");
  } else {
    render(cartItems, cartWrapper(), getCartSample);
  }
}

export function changeCurrQuantity(
  clickTarget: HTMLElement,
  cartItems: Map<number, ProductInCart>
) {
  const itemId: number = parseInt(clickTarget.dataset.counterBtnId!);
  const type: string = clickTarget.dataset.type!;

  const currProduct: ProductInCart = cartItems.get(itemId)!;
  const card: HTMLElement = cartWrapper().querySelector(
    `[data-card-id='${itemId.toString()}']`
  )!;

  const counter: HTMLElement = card.querySelector(`[data-counter-id]`)!;
  const price: HTMLElement = card.querySelector(`[data-price-id]`)!;

  if (type === "plus") {
    currProduct.quantity++;
  } else if (type === "minus") {
    currProduct.quantity--;
  } else if (type === "delete") {
    currProduct.quantity = 0;
  }

  counter.innerText = currProduct.quantity.toString();

  localStorage.setItem("cart", JSON.stringify(Object.fromEntries(cartItems)));

  if (currProduct.quantity === 0) {
    deleteItem(itemId, cartItems);
  }

  renderCurrentPrice(price, currProduct);
}
