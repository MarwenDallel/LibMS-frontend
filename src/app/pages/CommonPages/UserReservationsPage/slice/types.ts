/* --- STATE --- */

import { Book } from 'app/pages/LibrarianPages/AddBookPage/AddBookForm/slice/types';

export interface Reservation {
  id: string;
  createdAt: string;
  book: Book;
  reservationStatus: string;
  returnDate?: string;
  reservedAt?: string;
}
export interface MemberReservationsState {
  isFetching: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  hasFetched: boolean;
  message: string;
  reservations: Reservation[];
  // For sending borrow request
  isBorrowRequestFailed: boolean;
  isBorrowRequestSuccess: boolean;
  borrowRequestFailureMessage: string;
  //For cancelling reservation
  isCancelledRequestSuccess: boolean;
  isCancelledRequestFailed: boolean;
  cancelRequestFailureMessage: string;
}
