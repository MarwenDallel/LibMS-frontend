import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { fetchMemberBooksRootState } from './saga';
import { MemberBooksState } from './types';

export const initialState: MemberBooksState = {
  books: [],
  isFetching: false,
  isError: false,
  isSuccess: false,
  errorMessage: '',
};

const slice = createSlice({
  name: 'memberBooks',
  initialState,
  reducers: {
    requestFetchBooks(state) {
      state.isFetching = true;
    },
    fetchBooksSuccess(state, action: PayloadAction<any>) {
      state.books = action.payload.books;
      state.isSuccess = true;
      state.isError = false;
    },
    fetchBooksFailed(state, action: PayloadAction<{ message: string }>) {
      state.errorMessage = action.payload.message;
      state.isSuccess = false;
      state.isError = true;
      state.isFetching = false;
    },
  },
});

export const { actions: memberBooksAction } = slice;

export const useBooksSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: fetchMemberBooksRootState });
  return { actions: slice.actions };
};
