const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const SUFFIX = 'api';

export const AUTH_ENDPOINTS = {
  login: `${BASE_URL}/${SUFFIX}/user/auth`,
  register: `${BASE_URL}/${SUFFIX}/user`,
  profile: `${BASE_URL}/profile`,
};

export const BOOK_ENDPOINTS = {
  addBook: `${BASE_URL}/${SUFFIX}/books`,
  ListBook: `${BASE_URL}/${SUFFIX}/Listbook`,
};
