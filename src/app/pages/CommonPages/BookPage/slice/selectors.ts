import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.memberBook || initialState;

export const selectMemberBook = createSelector([selectSlice], state => state);
