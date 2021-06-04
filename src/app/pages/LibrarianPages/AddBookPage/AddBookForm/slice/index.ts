import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { watchRequestAddBook } from './saga';
import { AddBookState } from './types';

export const initialState: AddBookState = {
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
  name: 'addBook',
  initialState,
  reducers: {
    requestAddBook(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    addBookSuccess(state, action: PayloadAction<any>) {
      // Might not be necessary
      state.isbn = action.payload.isbn;
      state.title = action.payload.title;
      state.authors = action.payload.authors;
      state.subtitle = action.payload.subtitle;
      state.originalTitle = action.payload.originalTitle;
      state.publisher = action.payload.publisher;
      state.publishedDate = action.payload.publicationDate;
      state.pageCount = action.payload.pageCount;
      state.copieCount = action.payload.copieCount;

      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      state.successMessage = action.payload.message;
    },
    addBookFailed(state, action: PayloadAction<{ message: string }>) {
      state.isSuccess = false;
      state.isError = true;
      state.isFetching = false;
      state.errorMessage = action.payload.message;
    },
    addAuthor(state, action: PayloadAction<{ list: any[] }>) {
      return {
        ...state,
        authors: [...state.authors, ...action.payload.list],
      };
    },
    removeAuthor(state, action: PayloadAction<{ id: string | number }>) {
      return {
        ...state,
        authors: state.authors.filter(
          author => author.id !== action.payload.id,
        ),
      };
    },
  },
});

export const { actions: addBookActions } = slice;

export const useAddBookSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: watchRequestAddBook });
  return { actions: slice.actions };
};
