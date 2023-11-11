export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface InsertProduct
  extends Omit<Product, 'id' | 'category' | 'creationAt' | 'updatedAt'> {
  category: number;
}
