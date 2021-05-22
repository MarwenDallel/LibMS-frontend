// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { booksActions as actions } from '.';

// function* doSomething() {}

import { BOOK_ENDPOINTS } from 'app/configs/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { memberBooksAction as actions } from '.';

export function* fetchBooksSaga(action) {
  try {
    const books = yield call(request.get, BOOK_ENDPOINTS.books);
    yield put(
      actions.fetchBooksSuccess({
        ...books,
      }),
    );
  } catch (error) {
    yield put(
      actions.fetchBooksFailed({
        message: error.message,
      }),
    );
  }
}

export function* fetchMemberBooksRootState() {
  yield takeLatest(actions.requestFetchBooks.type, fetchBooksSaga);
}
