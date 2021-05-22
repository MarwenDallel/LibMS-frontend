import { BOOK_ENDPOINTS } from 'app/configs/endpoints';
import { AxiosRequestConfig } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import objectToFormData from 'utils/form-data';
import request from 'utils/request';
import { addBookActions as actions, addBookActions } from '.';
import { AddBookState } from './types';

export function* addBookSaga(action) {
  try {
    const book: AddBookState = {
      isbn: action.payload.isbn,
      title: action.payload.title,
      authors: action.payload.authors,
      subtitle: action.payload.subtitle,
      originalTitle: action.payload.originalTitle,
      publisher: action.payload.publisher,
      publishedDate: action.payload.publicationDate,
      pageCount: action.payload.pageCount,
      image: action.payload.image,
      copiesNbr: action.payload.copiesNbr,
    };
    const formData = objectToFormData(book);
    const options: AxiosRequestConfig = {
      method: 'POST',
      data: formData,
    };
    yield call(request, BOOK_ENDPOINTS.addBook, options);
    yield put(
      addBookActions.addBookSuccess({
        ...book,
        message: 'Book added!',
      }),
    );
  } catch (error) {
    yield put(
      addBookActions.addBookFailed({
        message: error.message,
      }),
    );
  }
}

export function* watchRequestAddBook() {
  yield takeLatest(actions.requestAddBook.type, addBookSaga);
}
