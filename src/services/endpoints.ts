export const endpoints = {
  auth: { login: '/auth/login', profile: '/auth/profile', token: '/auth/refresh-token' },
  users: {
    getListOfUsers: '/users',
    postUser: '/users',
    getUserById: (id: string) => `/users/${id}`,
    putUserById: (id: string) => `/users/${id}`,
    removeUserById: (id: string) => `/users/${id}`,
    userAvailable: `/users/is-available`,
  },
  products: {
    getListOfProducts: `/products`,
    postProduct: `/products`,
    getProductById: (id: string) => `/products/${id}`,
    putProductById: (id: string) => `/products/${id}`,
    removeProductById: (id: string) => `/products/{id}`,
  },
  categories: { getListOfCategories: `/categories`, getCategoryById: (id: string) => `/categories/${id}` },
  files: { getFile: (filename: string) => `/files/${filename}`, postFile: `/files/upload` },
};
