import { Product } from "./getItems";

export function getMainSample(item: Product): string {
  const { id, image, name, price, quantity } = item;
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
    class="catalog__card-btn button ${quantity > 0 ? "added" : ""}"
    type="button"
    data-button-id='${id}'
  >
    ${quantity > 0 ? "Добавлено в корзину" : "В корзину"}
  </button>
</li>`;
}
