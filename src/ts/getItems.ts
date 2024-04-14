export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export async function getItems(): Promise<Product[]> {
  const responce: Response = await fetch("items.json");
  const data: Product[] = await responce.json();
  const products: Product[] = JSON.parse(JSON.stringify(data));
  return products;
}
