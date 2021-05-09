import { BOOK_ENDPOINTS } from 'app/configs/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { BooksActions as actions, BooksActions } from '.';

export function* BookSaga(action) {
  try {
    yield call(request, BOOK_ENDPOINTS.ListBook, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isbn: action.payload.isbn,
        AuthorName: action.payload.AuthorName,
        AuthorLatName: action.payload.AuthorLatName,
        BookTitle: action.payload.BookTitle,
        BookSubTitle: action.payload.BookSubTitle,
        publishedDate: action.payload.publishedDate,
        pageCount: action.payload.pageCount,
        overview: action.payload.overview,
        originalTitle: action.payload.originalTitle,
        image: action.payload.image,
        publisher: action.payload.publisher,
      }),
    });
    yield put(
      BooksActions.DisplaySuccess({
        isbn: action.payload.isbn,
        AuthorName: action.payload.AuthorName,
        AuthorLatName: action.payload.AuthorLastName,
        BookTitle: action.payload.BookTitle,
        BookSubTitle: action.payload.BookSubTitle,
        publishedDate: action.payload.publishedDate,
        pageCount: action.payload.pageCount,
        overview: action.payload.overview,
        originalTitle: action.payload.originalTitle,
        image: action.payload.image,
        publisher: action.payload.publisher,
      }),
    );
  } catch (error) {
    if (error.response?.status === 409) {
      yield put(
        BooksActions.DisplayFail({
          message: ' Failed',
        }),
      );
    }
  }
}
export function* rootBookSaga() {
  yield takeLatest(actions.Displayrequest.type, BookSaga);
}
