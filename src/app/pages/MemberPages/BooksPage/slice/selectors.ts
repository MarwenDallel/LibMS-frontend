import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.memberBooks || initialState;

export const selectMemberBooks = createSelector([selectSlice], state => state);

export const selectState = createSelector(
  [selectSlice],
  memeberBooksState => memeberBooksState,
);

export const selectBooks = createSelector(
  [selectSlice],
  memeberBooksState => memeberBooksState.books,
);

export const selectMemberBooksByISBN = (isbn: string) => {
  return createSelector([selectSlice], state =>
    state.books.filter(b => b.isbn === isbn),
  );
};
