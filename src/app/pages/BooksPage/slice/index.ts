import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { BookState } from './types';
import { rootBookSaga } from './saga';
import { injectReducer, injectSaga } from 'redux-injectors';

export const initialState: BookState = {
  isbn: 0,
  AuthorName: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  AuthorLastName: '',
  BookTitle: '',
  BookSubTitle: '',
  originalTitle: '',
  publishedDate: '',
  image: '',
  pageCount: '',
  overview: '',
  publisher: '',
};

const slice = createSlice({
  name: 'ListBook',
  initialState,
  reducers: {
    Displayrequest(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    DisplaySuccess(
      state,
      action: PayloadAction<{
        isbn: number;
        AuthorName: string;
        AuthorLatName: string;
        BookTitle: string;
        BookSubTitle: string;
        originalTitle: string;
        publishedDate: string;
        image: string;
        pageCount: string;
        overview: string;
        publisher: string;
      }>,
    ) {
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      state.isbn = action.payload.isbn;
      state.AuthorName = action.payload.AuthorName;
      state.AuthorLastName = action.payload.AuthorLatName;
      state.BookTitle = action.payload.BookTitle;
      state.BookSubTitle = action.payload.BookSubTitle;
      state.publishedDate = action.payload.publishedDate;
      state.pageCount = action.payload.pageCount;
      state.overview = action.payload.overview;
      state.originalTitle = action.payload.originalTitle;
      state.image = action.payload.image;
      state.publisher = action.payload.publisher;
    },
    DisplayFail(state, action: PayloadAction<any>) {
      state.isError = true;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = action.payload.message;
    },
  },
});

export const { actions: BooksActions } = slice;
export default function BooksSlice() {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: rootBookSaga });

  return null;
}
