import { RESERVATION_ENDPOINTS } from 'app/configs/endpoints';
import { AxiosRequestConfig } from 'axios';
import { call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { rejectReservationActions } from '../../ReservationsList/slice/index';

export function* rejectReservationSaga(action) {
  try {
    const param = {
      id: action.payload.id,
    };
    const options: AxiosRequestConfig = {
      method: 'PATCH',
    };
    const rejectedReservation = yield call(
      request,
      `${RESERVATION_ENDPOINTS.rejectReservation}/${param.id}/reject`,
      options,
    );
    yield put(
      rejectReservationActions.rejectReservationSuccess({
        ...rejectedReservation,
        message: 'Reservation rejected!',
      }),
    );
  } catch (error) {
    yield put(rejectReservationActions.rejectReservationFailed());
  }
}
