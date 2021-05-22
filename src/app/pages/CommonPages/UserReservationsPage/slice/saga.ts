import { RESERVATION_ENDPOINTS } from 'app/configs/endpoints';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { memberReservationsActions as actions } from '.';

// function* doSomething() {}

function* getUserReservations() {
  try {
    const { reservations } = yield call(
      request.get,
      RESERVATION_ENDPOINTS.userReservations,
    );
    yield put(actions.fetchUserReservationsSuccess(reservations));
  } catch (error) {
    yield put(actions.fetchUserReservationsFailed(error.message));
    console.log('[ERROR]:', error);
  }
}

function* setUserReservations(action) {
  yield put(actions.setReservations(action.payload));
}

export function* memberReservationsSaga() {
  // yield takeLatest(actions.someAction.type, doSomething);
  yield all([
    takeLatest(actions.fetchUserReservations, getUserReservations),
    takeLatest(actions.setReservations.type, setUserReservations),
  ]);
}
