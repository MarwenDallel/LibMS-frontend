import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { emailConfirmationSaga } from './saga';
import { EmailConfirmationState } from './types';

export const initialState: EmailConfirmationState = {
  failureMessage: '',
  isSuccess: false,
  isFailed: false,
};

const slice = createSlice({
  name: 'emailConfirmation',
  initialState,
  reducers: {
    sendVerificationRequest(state, action: PayloadAction<string>) {},
    verificationRequestSuccess(state) {
      state.isSuccess = true;
      state.isFailed = false;
    },
    verificationRequestFailed(state, action: PayloadAction<string>) {
      state.isFailed = true;
      state.failureMessage = action.payload;
      state.isSuccess = false;
    },
  },
});

export const { actions: emailConfirmationActions } = slice;

export const useEmailConfirmationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: emailConfirmationSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useEmailConfirmationSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
