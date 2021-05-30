import { AUTH_ENDPOINTS } from 'app/configs/endpoints';
import { clearToken, setToken } from 'app/services/auth/tokens.service';
import { AxiosRequestConfig } from 'axios';
import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { userActions as actions } from '.';

function* loginUserSaga(action) {
  try {
    const options: AxiosRequestConfig = {
      method: 'POST',
      data: {
        email: action.payload.email,
        password: action.payload.password,
      },
    };
    const { accessToken } = yield call(request, AUTH_ENDPOINTS.login, options);
    request.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken.token}`;
    yield call(setToken, accessToken.token);
    yield put(
      actions.loginSuccess({
        email: action.payload.email,
      }),
    );
  } catch (error) {
    yield put(
      actions.loginFailed({
        message: 'Login Failed: Please check your credentials',
      }),
    );
  } finally {
    if (yield cancelled()) {
      yield call(clearToken);
    }
  }
}

export function* loginFlow() {
  yield takeLatest(actions.requestLogin.type, loginUserSaga);
}
