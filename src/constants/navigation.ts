export enum Paths {
  Dashboard = '/dashboard',
  Product = '/dashboard/products',
}

export const navigation: Route[] = [
  { name: 'Dashboard', path: Paths.Dashboard },
  { name: 'Product', path: Paths.Product },
];