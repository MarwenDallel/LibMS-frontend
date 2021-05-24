import { BOOK_ENDPOINTS } from 'app/configs/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { memberBookActions as actions } from '.';

function* fetchBookSaga(action) {
  try {
    const books = yield call(
      request.get,
      `${BOOK_ENDPOINTS.books}/${action.payload.id}`,
    );
    yield put(
      actions.fetchBookSuccess({
        ...books,
      }),
    );
  } catch (error) {
    yield put(
      actions.fetchBookFailed({
        message: error.message,
      }),
    );
  }
}

export function* memberBookSaga() {
  yield takeLatest(actions.requestFetchBooks.type, fetchBookSaga);
}
