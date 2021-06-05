import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.loginUser || initialState;

export const selectIsError = createSelector(
  [selectSlice],
  loginUserFormState => loginUserFormState.isError,
);

export const selectErrorMessage = createSelector(
  [selectSlice],
  loginUserFormState => loginUserFormState.errorMessage,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  loginUserFormState => loginUserFormState.isFetching,
);

export const selectIsSuccess = createSelector(
  [selectSlice],
  loginUserFormState => loginUserFormState.isSuccess,
);

export const selectAccessToken = createSelector(
  [selectSlice],
  loginUserFormState => loginUserFormState.accessToken,
);
