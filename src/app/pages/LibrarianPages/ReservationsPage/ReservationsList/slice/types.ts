import { User } from 'app/pages/CommonPages/UserProfilePage/slice/types';
import { Book } from 'app/pages/LibrarianPages/AddBookPage/AddBookForm/slice/types';

export enum ReservationStatus {
  pending = 'pending',
  rejected = 'rejected',
  accepted = 'accepted',
  overdue = 'overdue',
  returned = 'returned',
  cancelled = 'cancelled',
  checkedOut = 'checkedOut',
}

export interface Reservation {
  id: string;
  book: Book;
  reservedAt: string;
  user: User;
  reservationStatus: keyof typeof ReservationStatus;
  returnDate?: string;
}

export interface ReservationsState {
  reservations: Reservation[];
  isFetching?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  errorMessage?: string;
}
