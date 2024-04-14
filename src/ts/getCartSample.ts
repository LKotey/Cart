import { Product } from "./getItems";

export function getCartSample(item: Product): string {
  const { id, image, name, price, quantity } = item;
  return `<li class="cart-popup__item" data-id="card" data-card-id="${id}">
  <div class="cart-popup__image">
    <img
      src="${image}"
      alt=""
      class="cart-popup__img"
    />
  </div>
  <div class="cart-popup__info">
  <h4 class="cart-popup__title">${name}</h4>
  <p class="cart-popup__price" data-price-id>${price}р${
    quantity > 1 ? ` x ${quantity} = ${price * quantity}р` : ``
  }</p>
  <div class="cart-popup__counter">
    <button
      class="cart-popup__counter-btn"
      type="button"
      data-type="minus"
      data-counter-btn-id="${id}"
    >
      -
    </button>
    <span class="cart-popup__counter-num" data-counter-id
      >${quantity}</span
    >
    <button
      class="cart-popup__counter-btn"
      type="button"
      data-type="plus"
      data-counter-btn-id="${id}"
    >
      +
    </button>
  </div>
  <button class="cart-popup__delete-btn"
  type="button" data-delete-btn ="${id}"> Удалить товар из корзины</button>
  </div>
</li>`;
}
