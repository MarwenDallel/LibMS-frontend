import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.emailConfirmation || initialState;

export const selectEmailConfirmation = createSelector(
  [selectSlice],
  state => state,
);

export const selectIsSuccess = createSelector(
  [selectSlice],
  state => state.isSuccess,
);

export const selectIsFailed = createSelector(
  [selectSlice],
  state => state.isFailed,
);

export const selectFailureMessage = createSelector(
  [selectSlice],
  state => state.failureMessage,
);
