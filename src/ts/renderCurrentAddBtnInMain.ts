import { Product } from "./getItems";

export function renderCurrentAddBtnInMain(
  addButton: HTMLElement,
  currProduct: Product
) {
  const { id, quantity } = currProduct;
  addButton.insertAdjacentHTML(
    "afterend",
    `<button
      class="catalog__card-btn button ${quantity > 0 ? "added" : ""}"
      type="button"
      data-button-id='${id}'
    >
      ${quantity > 0 ? "Добавлено в корзину" : "В корзину"}
    </button>`
  );
  addButton.remove();
}
