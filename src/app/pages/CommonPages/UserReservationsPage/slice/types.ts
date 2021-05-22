/* --- STATE --- */

import { Book } from 'app/pages/LibrarianPages/AddBookPage/AddBookForm/slice/types';

export interface Reservation {
  id: string;
  createdAt: string;
  book: Book;
  reservationStatus: string;
}
export interface MemberReservationsState {
  isFetching: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  hasFetched: boolean;
  message: string;
  reservations: Reservation[];
}
