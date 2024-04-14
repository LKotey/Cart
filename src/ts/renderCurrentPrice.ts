import { Product } from "./getItems";

export function renderCurrentPrice(
  priceInner: HTMLElement,
  currProduct: Product
) {
  const { price, quantity } = currProduct;
  priceInner.insertAdjacentHTML(
    "afterend",
    `<p class="cart-popup__price" data-price-id>${price}р${
      quantity > 1 ? ` x ${quantity} = ${price * quantity}р` : ``
    }</p>`
  );
  priceInner.remove();
}
