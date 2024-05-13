import { Product, ProductInCart } from "../getItems";

export const addItemInCart = (
  clickTarget: HTMLElement,
  cartItems: Map<number, ProductInCart>,
  products: Map<number, Product>
) => {
  clickTarget.classList.add("added");
  clickTarget.innerText = "Добавлено в корзину";

  const itemId: number = parseInt(clickTarget.dataset.buttonId!);
  const currProduct: Product = products.get(itemId)!;

  if (!cartItems.has(itemId)) {
    currProduct.isInCart = true;
    cartItems.set(itemId, { ...currProduct, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(Object.fromEntries(cartItems)));
  }
};
