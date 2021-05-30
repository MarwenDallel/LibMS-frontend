import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.memberReservations || initialState;

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
