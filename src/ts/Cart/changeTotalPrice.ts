import { ProductInCart } from "../getItems";

const totalPrice = (): HTMLElement => document.getElementById("total-price")!;

export const changeTotalPrice = (cartItems: Map<number, ProductInCart>) => {
  if (cartItems.size) {
    totalPrice().innerText = `${[...cartItems.values()]
      .reduce(
        (totalSum: number, product: ProductInCart) =>
          (totalSum += product.price * product.quantity),
        0
      )
      .toString()} руб.`;
  } else totalPrice().innerText = "";
};
