export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isInCart: boolean;
}

export interface ProductInCart extends Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export async function getItems(): Promise<Map<number, Product>> {
  const responce: Response = await fetch("items.json");
  const data: Product[] = await responce.json();
  const products: Map<number, Product> = new Map();
  data.map((product) => products.set(product.id, product));
  return products;
}
