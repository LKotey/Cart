export function render<T>(
  productsMap: Map<number, T>,
  HTMLElement: HTMLElement,
  sample: Function
): void {
  HTMLElement.innerHTML = "";
  productsMap.forEach((productMapItem: T) => {
    HTMLElement.insertAdjacentHTML("beforeend", sample(productMapItem));
  });
}
