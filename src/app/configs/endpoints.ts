const API_PREFIX = 'api';
const USER_PREFIX = `${API_PREFIX}/users`;
const BOOK_PREFIX = `${API_PREFIX}/books`;
const AUTHOR_PREFIX = `${API_PREFIX}/authors`;
const RESERVATION_PREFIX = `${API_PREFIX}/reservations`;
const EMAIL_CONFIRMATION_PREFIX = `${API_PREFIX}/confirmation-token`;

export const USER_ENDPOINTS = {
  createUser: USER_PREFIX,
  profile: `${USER_PREFIX}/@me`,
};

export const AUTH_ENDPOINTS = {
  login: `${API_PREFIX}/users/auth`,
  refresh: `${API_PREFIX}/users/refresh`,
  register: `${API_PREFIX}/users`,
};

export const BOOK_ENDPOINTS = {
  createBook: BOOK_PREFIX,
  books: BOOK_PREFIX,
};

export const AUTHOR_ENDPOINTS = {
  authors: AUTHOR_PREFIX,
};

export const RESERVATION_ENDPOINTS = {
  reservations: RESERVATION_PREFIX,
  userReservations: `${RESERVATION_PREFIX}/@me`,
};

export const EMAIL_CONFIRMATION_ENDPOINTS = {
  confirm: (token: string) => `${EMAIL_CONFIRMATION_PREFIX}/${token}/confirm`,
};

export const ASSETS_ENDPOINTS = {
  images: `${process.env.REACT_APP_BACKEND_URL}/upload/images`,
};
