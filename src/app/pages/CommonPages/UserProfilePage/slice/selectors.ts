import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.userProfile || initialState;

export const selectUserProfile = createSelector([selectSlice], state => state);

export const selectEmail = createSelector(
  [selectSlice],
  userProfileState => userProfileState.email,
);

export const selectFirstName = createSelector(
  [selectSlice],
  userProfileState => userProfileState.firstName,
);

export const selectLastName = createSelector(
  [selectSlice],
  userProfileState => userProfileState.lastName,
);

export const selectRole = createSelector(
  [selectSlice],
  userProfileState => userProfileState.role,
);
export const selectIsFetching = createSelector(
  [selectSlice],
  userProfileState => userProfileState.isFetching,
);
