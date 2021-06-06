import { RESERVATION_ENDPOINTS } from 'app/configs/endpoints';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { reservationActions as actions } from '.';

export function* fetchReservationsSaga() {
  try {
    const reservations = yield call(
      request.get,
      RESERVATION_ENDPOINTS.reservations,
    );
    yield put(actions.reservationsLoaded(reservations));
    yield put(actions.requestSuccess());
  } catch (error) {
    yield put(actions.requestFailed(error.message));
  }
}

export function* acceptReservationSaga(action) {
  try {
    yield call(
      request.patch,
      `${RESERVATION_ENDPOINTS.reservations}/${action.payload}/accept`,
    );
    yield put(actions.acceptReservation(action.payload));
    yield put(actions.requestSuccess());
  } catch (error) {
    yield put(actions.requestFailed(error.message));
  }
}

export function* rejectReservationSaga(action) {
  try {
    yield call(
      request.patch,
      `${RESERVATION_ENDPOINTS.reservations}/${action.payload}/reject`,
    );
    yield put(actions.rejectReservation(action.payload));
    yield put(actions.requestSuccess());
  } catch (error) {
    yield put(actions.requestFailed(error.message));
  }
}

export function* fetchReservationsRootState() {
  yield all([
    yield takeLatest(actions.requestReservations.type, fetchReservationsSaga),
    yield takeLatest(
      actions.requestAcceptReservation.type,
      acceptReservationSaga,
    ),
    yield takeLatest(
      actions.requestRejectReservation.type,
      rejectReservationSaga,
    ),
  ]);
}
