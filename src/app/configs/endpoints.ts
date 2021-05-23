const API_PREFIX = 'api';
const USER_PREFIX = `${API_PREFIX}/users`;
const BOOK_PREFIX = `${API_PREFIX}/books`;
const AUTHOR_PREFIX = `${API_PREFIX}/authors`;
const RESERVATION_PREFIX = `${API_PREFIX}/reservations`;

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
  acceptReservation: RESERVATION_PREFIX,
  userReservations: `${RESERVATION_PREFIX}/@me`,
  createReservation: `${RESERVATION_PREFIX}/`,
  cancelReservation: RESERVATION_PREFIX,
};

export const ASSETS_ENDPOINTS = {
  images: `${process.env.REACT_APP_BACKEND_URL}/upload/images`,
};
