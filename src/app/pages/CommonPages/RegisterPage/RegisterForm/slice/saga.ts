import { USER_ENDPOINTS } from 'app/configs/endpoints';
import { AxiosRequestConfig } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { useRegistrationActions as actions, useRegistrationActions } from '.';

// function* doSomething() {}

export function* registerUserSaga(action) {
  try {
    // Saga's way of dispatching actions
    const options: AxiosRequestConfig = {
      method: 'POST',
      data: {
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        universityID: action.payload.universityID,
        password: action.payload.password,
      },
    };
    yield call(request, USER_ENDPOINTS.createUser, options);
    yield put(
      useRegistrationActions.registerSuccess({
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        universityID: action.payload.universityID,
        password: action.payload.password,
      }),
    );
  } catch (error) {
    if (error.response?.status === 409) {
      yield put(
        useRegistrationActions.registerFail({
          message: 'Registration Failed: Please retry',
        }),
      );
    }
  }
}

export function* rootRegisterUserSaga() {
  yield takeLatest(actions.requestRegister.type, registerUserSaga);
}
