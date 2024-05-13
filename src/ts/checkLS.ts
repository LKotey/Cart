import { Product, ProductInCart } from "./getItems";

export const checkLS = (
  cartItems: Map<number, ProductInCart>,
  products: Map<number, Product>
) => {
  if (localStorage.length) {
    const localStorageData: Map<string, ProductInCart> = new Map(
      Object.entries(JSON.parse(localStorage.getItem("cart")!))
    );

    for (let [key, value] of localStorageData) {
      const keyNum = parseInt(key);

      if (products.has(keyNum)) {
        const currProduct = products.get(keyNum)!;
        value.price = currProduct.price;
        value.isInCart ? (currProduct.isInCart = true) : currProduct.isInCart;

        cartItems.set(keyNum, value);
      }
    }

    localStorage.setItem("cart", JSON.stringify(Object.fromEntries(cartItems)));
  }
};
