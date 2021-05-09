import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.ListBook || initialState;

export const selectBook = createSelector([selectSlice], state => state);

export const selectIsError = createSelector(
  [selectSlice],
  BookState => BookState.isError,
);

export const selectErrorMessage = createSelector(
  [selectSlice],
  BookState => BookState.errorMessage,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  BookState => BookState.isFetching,
);

export const selectIsSuccess = createSelector(
  [selectSlice],
  BookState => BookState.isSuccess,
);
