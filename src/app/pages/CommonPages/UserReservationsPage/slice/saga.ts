import { RESERVATION_ENDPOINTS } from 'app/configs/endpoints';
import { AxiosRequestConfig } from 'axios';
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

function* sendBorrowRequest(requestDetails) {
  try {
    const options: AxiosRequestConfig = {
      method: 'POST',
      data: {
        isbn: requestDetails.payload.isbn,
        reservedAt: requestDetails.payload.reservedAt,
      },
    };
    const { id } = yield call(
      request,
      RESERVATION_ENDPOINTS.createReservation,
      options,
    );

    yield put(actions.requestReservationSuccess());
    yield put(
      actions.addReservation({
        id,
        createdAt: requestDetails.payload.reservedAt,
        book: requestDetails.payload.book,
        reservationStatus: 'pending',
      }),
    );
  } catch (error) {
    yield put(actions.requestReservationFailed(error.message));
    console.log('[CREATE_RESERVATION_ERROR]', error.message);
  }
}

function* cancelReservation(requestDetails) {
  try {
    const param = {
      id: requestDetails.payload.id,
    };
    const options: AxiosRequestConfig = {
      method: 'PATCH',
    };
    yield call(
      request,
      `${RESERVATION_ENDPOINTS.cancelReservation}/${param.id}/cancel`,
      options,
    );
    yield put(actions.cancelReservationSuccess());
    yield put(actions.removeReservationFromStore(requestDetails.payload.id));
  } catch (error) {
    yield put(actions.cancelReservationFailed(error.message));
    console.log('[CANCEL_RESERVATION_ERROR]', error.message);
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
    takeLatest(actions.requestReservation.type, sendBorrowRequest),
    takeLatest(actions.cancelReservation.type, cancelReservation),
  ]);
}
