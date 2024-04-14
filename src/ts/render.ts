import { Product } from "./getItems";

export function render(
  productsArray: Product[],
  HTMLElement: HTMLElement,
  sample: Function
): void {
  HTMLElement.innerHTML = "";
  productsArray.forEach((productArrayItem: Product) => {
    HTMLElement.insertAdjacentHTML("beforeend", sample(productArrayItem));
  });
}
