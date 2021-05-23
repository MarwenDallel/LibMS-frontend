import { RESERVATION_ENDPOINTS } from 'app/configs/endpoints';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  fetchReservationsActions as actions,
  fetchReservationsActions,
} from '.';
import { acceptReservationSaga } from '../../components/AcceptReservation/saga';
import { rejectReservationSaga } from '../../components/RejectReservation/saga';

export function* fetchReservationsSaga(action) {
  try {
    const reservations = yield call(
      request.get,
      RESERVATION_ENDPOINTS.reservations,
    );
    yield put(
      fetchReservationsActions.FetchReservationsSuccess({
        ...reservations,
      }),
    );
  } catch (error) {
    if (error.response?.status !== 200) {
      // console.log('Error');
    }
  }
}
export function* fetchReservationsRootState() {
  yield all([
    yield takeLatest(
      actions.requestFetchReservations.type,
      fetchReservationsSaga,
    ),
    yield takeLatest(
      actions.requestAcceptReservation.type,
      acceptReservationSaga,
    ),
    yield takeLatest(
      actions.requestrejectReservation.type,
      rejectReservationSaga,
    ),
  ]);
}
