const API = process.env.NEXT_API;

const endpoints = {
  auth: { login: '/api/v1/auth/login', profile: '/api/v1/auth/profile', token: '/api/v1/auth/refresh-token' },
  users: {
    getListOfUsers: '/api/v1/users',
    postUser: '/api/v1/users',
    getUserById: (id: string) => `/api/v1/users/${id}`,
    putUserById: (id: string) => `/api/v1/users/${id}`,
    removeUserById: (id: string) => `/api/v1/users/${id}`,
    userAvailable: `/api/v1/users/is-available`,
  },
  products: {
    getListOfProducts: `/api/v1/products`,
    postProduct: `/api/v1/products`,
    getProductById: (id: string) => `/api/v1/products/${id}`,
    putProductById: (id: string) => `/api/v1/products/${id}`,
    removeProductById: (id: string) => `/api/v1/products/{id}`,
  },
  categories: { getListOfCategories: `/api/v1/categories`, getCategoryById: (id: string) => `/api/v1/categories/${id}` },
  fies: { getFile: (filename: string) => `/api/v1/files/${filename}`, postFile: `/api/v1/files/upload` },
};

export default endpoints;
