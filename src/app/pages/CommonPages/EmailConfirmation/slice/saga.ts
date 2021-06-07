import { EMAIL_CONFIRMATION_ENDPOINTS } from 'app/configs/endpoints';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { emailConfirmationActions as actions } from '.';

function* sendConfirmationTokenVerification(action) {
  try {
    yield call(request, EMAIL_CONFIRMATION_ENDPOINTS.confirm(action.payload));
    yield put(actions.verificationRequestSuccess());
  } catch (error) {
    /**
     * Error format:
     * {
     *  error: string; (e.g. "Bad Request")
     *  message: string[] | string;
     * statusCode: number;
     * }
     */
    yield put(
      actions.verificationRequestFailed(
        error.message.constructor === String ? error.message : error.message[0],
      ),
    );
    console.log('[Verification_Error]', error.message.constructor === String);
  }
}

export function* emailConfirmationSaga() {
  yield takeLatest(
    actions.sendVerificationRequest.type,
    sendConfirmationTokenVerification,
  );
}
