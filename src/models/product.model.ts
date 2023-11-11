import { Product, Category, InsertProduct } from '@types';

type PartialProduct = Partial<Product>;
type PartialInsert = Partial<InsertProduct>;

const base = (data?: PartialProduct | PartialInsert) => ({
  title: data?.title || '',
  price: data?.price ?? 0,
  description: data?.description || '',
  images: data?.images || [''],
});

export const productModel = (data?: PartialProduct): Product => {
  const result = base(data);

  const category: Category = {
    id: data?.id || 0,
    image: data?.category?.image || '',
    name: data?.category?.name || '',
    creationAt: data?.category?.creationAt || '',
    updatedAt: data?.category?.updatedAt || '',
  };

  return {
    ...result,
    id: data?.id || 0,
    category: category,
    creationAt: data?.creationAt || '',
    updatedAt: data?.updatedAt || '',
  };
};

export const insertProductModel = (data?: PartialInsert): InsertProduct => {
  const result = base(data);
  return {
    ...result,
    category: data?.category ?? 0,
  };
};
