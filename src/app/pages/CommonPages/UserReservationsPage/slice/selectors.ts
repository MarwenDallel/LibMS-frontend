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
