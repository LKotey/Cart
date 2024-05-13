import { ProductInCart } from "../getItems";

const cartNum = (): HTMLElement => document.getElementById("cart-num")!;

export const changeNumberOfItemsInCart = (
  cartItems: Map<number, ProductInCart>
) => {
  cartNum().innerText = [...cartItems.values()]
    .reduce((sum: number, item: ProductInCart) => (sum += item.quantity), 0)
    .toString();
};
