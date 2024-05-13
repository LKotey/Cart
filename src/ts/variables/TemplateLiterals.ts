import { Product, ProductInCart } from "../getItems";

const NO_ITEMS_MASSAGE: string = `<p class="cart-popup__no-items-in-cart"> В корзине нет товаров </p>`;

function getCartSample(item: ProductInCart): string {
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
    type="button" data-counter-btn-id="${id}" data-type="delete"> Удалить товар из корзины</button>
    </div>
  </li>`;
}

function getMainSample(item: Product): string {
  const { id, image, name, price, isInCart } = item;
  return `<li class="catalog__card" data-item-id="${id}">
    <div class="catalog__card-image">
      <img
        src="${image}"
        alt=""
        class="catalog__card-img"
      />
    </div>
    <h4 class="catalog__card-title">${name}</h4>
    <p class="catalog__card-price">${price}р</p>
    <button
      class="catalog__card-btn button ${isInCart ? "added" : ""}"
      type="button"
      data-button-id='${id}'
    >
      ${isInCart ? "Добавлено в корзину" : "В корзину"}
    </button>
  </li>`;
}

export { NO_ITEMS_MASSAGE, getCartSample, getMainSample };
