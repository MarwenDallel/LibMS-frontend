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
  login: `${USER_PREFIX}/auth`,
  refresh: `${USER_PREFIX}/refresh`,
};

export const BOOK_ENDPOINTS = {
  createBook: BOOK_PREFIX,
  books: BOOK_PREFIX,
};

export const AUTHOR_ENDPOINTS = {
  authors: AUTHOR_PREFIX,
};

export const RESERVATION_ENDPOINTS = {
  reservations: `${API_PREFIX}/reservation/reservations`,
  acceptReservation: `${API_PREFIX}/reservation/accept-reservation`,
  userReservations: `${API_PREFIX}/reservations/@me`,
};

export const ASSETS_ENDPOINTS = {
  images: `${process.env.REACT_APP_BACKEND_URL}/upload/images`,
};
