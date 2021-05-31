import { createSelector } from '@reduxjs/toolkit';
import { Book } from 'app/pages/LibrarianPages/AddBookPage/AddBookForm/slice/types';
import { RootState } from 'types';
import { initialState } from '.';
import { Reservation } from './types';

const selectSlice = (state: RootState) =>
  state.memberReservations || initialState;

// making selectActivePendingReservation null safe
// https://slashgear.github.io/react-redux-pitfalls-and-best-pratices/#do-not-create-a-reference-in-the-selector
const defaultEmptyReservation: Reservation = {
  id: '',
  createdAt: '',
  book: {} as Book,
  reservationStatus: '',
};

export const selectMemberReservations = createSelector(
  [selectSlice],
  state => state,
);

export const selectHasFetched = createSelector(
  [selectSlice],
  state => state.hasFetched,
);

export const selectIsFailed = createSelector(
  [selectSlice],
  state => state.isFailed,
);

export const selectIsSuccess = createSelector(
  [selectSlice],
  state => state.isSuccess,
);

export const selectReservationByBookId = (bookId: string) => {
  return createSelector([selectSlice], state =>
    state.reservations.filter(r => r.book.id === bookId),
  );
};

export const selectActivePendingReservation = (bookId: string) => {
  return createSelector(
    [selectSlice],
    state =>
      state.reservations.filter(
        r =>
          r.book.id === bookId &&
          (r.reservationStatus === 'pending' ||
            r.reservationStatus === 'active'),
      )[0] || defaultEmptyReservation,
  );
};

export const selectReservations = createSelector(
  [selectSlice],
  state => state.reservations,
);

export const selectBookRequestSucceeded = createSelector(
  [selectSlice],
  state => state.isBorrowRequestSuccess,
);

export const selectBookRequestFailed = createSelector(
  [selectSlice],
  state => state.isBorrowRequestFailed,
);

export const selectCancelRequestSucceeded = createSelector(
  [selectSlice],
  state => state.isCancelledRequestSuccess,
);

export const selectCancelRequestFailed = createSelector(
  [selectSlice],
  state => state.isCancelledRequestFailed,
);
