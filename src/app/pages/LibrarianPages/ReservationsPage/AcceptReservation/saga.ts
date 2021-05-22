import { RESERVATION_ENDPOINTS } from 'app/configs/endpoints';
import { AxiosRequestConfig } from 'axios';
import { call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { acceptReservationActions } from '../ReservationsList/slice/index';

export function* acceptReservationSaga(action) {
  try {
    const param = {
      id: action.payload.id,
    };
    const options: AxiosRequestConfig = {
      method: 'PATCH',
    };
    const acceptedReservation = yield call(
      request,
      `${RESERVATION_ENDPOINTS.acceptReservation}/${param.id}/accept`,
      options,
    );
    yield put(
      acceptReservationActions.acceptReservationSuccess({
        message: 'Reservation accepted!',
        ...acceptedReservation,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}
