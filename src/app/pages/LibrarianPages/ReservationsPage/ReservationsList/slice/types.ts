import { User } from 'app/pages/CommonPages/UserProfilePage/slice/types';
import { Book } from 'app/pages/LibrarianPages/AddBookPage/AddBookForm/slice/types';

export interface ReservationId {
  id: string;
}
export interface Reservation extends ReservationId {
  book: Book;
  reservedAt: string;
  user: User;
  reservationStatus: string;
  returnDate?: string;
}

export interface ReservationsState {
  reservations: Reservation[];
  isFetching?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

export interface AcceptReservationResponse {
  copiesNbr: number;
  reservationStatus: string;
  returnDate: string;
  id: string;
}

export interface rejectReservationResponse {
  id: string;
}
