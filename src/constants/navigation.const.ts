export enum Paths {
  Home = '/',
  Login = '/',
  Dashboard = '/dashboard',
  Product = '/products',
}

export const navigation: Route[] = [
  { name: 'Dashboard', path: Paths.Dashboard },
  { name: 'Product', path: Paths.Product },
];
