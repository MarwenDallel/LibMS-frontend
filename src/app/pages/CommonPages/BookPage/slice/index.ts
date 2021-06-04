import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { memberBookSaga } from './saga';
import { MemberBookState } from './types';

export const initialState: MemberBookState = {
  id: '',
  isbn: '',
  title: '',
  subtitle: '',
  originalTitle: '',
  authors: [],
  publishedDate: '',
  image: {
    name: '',
  },
  pageCount: 0,
  overview: '',
  publisher: '',
  copieCount: 0,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  successMessage: '',
};

const slice = createSlice({
  name: 'memberBook',
  initialState,
  reducers: {
    requestFetchBooks(state, action: PayloadAction<{ id: string }>) {
      state.id = action.payload.id;
      state.isFetching = true;
    },
    fetchBookSuccess(state, action: PayloadAction<any>) {
      state.id = action.payload.id;
      state.isbn = action.payload.isbn;
      state.title = action.payload.title;
      state.authors = action.payload.authors;
      state.subtitle = action.payload.subtitle;
      state.originalTitle = action.payload.originalTitle;
      state.publisher = action.payload.publisher;
      state.publishedDate = action.payload.publicationDate;
      state.pageCount = action.payload.pageCount;
      state.copieCount = action.payload.copieCount;
      state.image.name = action.payload.image.name;

      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      state.successMessage = action.payload.message;
    },
    fetchBookFailed(state, action: PayloadAction<{ message: string }>) {
      state.isSuccess = false;
      state.isError = true;
      state.isFetching = false;
      state.errorMessage = action.payload.message;
    },
  },
});

export const { actions: memberBookActions } = slice;

export const useMemberBookSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: memberBookSaga });
  return { actions: slice.actions };
};
