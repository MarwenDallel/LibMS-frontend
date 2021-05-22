import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userProfileSaga } from './saga';
import { User, UserProfileState } from './types';

export const initialState: UserProfileState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  universityID: '',
  role: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const slice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    requestUserProfile(state) {
      state.isFetching = true;
    },
    fetchProfileSuccess(state, action: PayloadAction<User>) {
      state.isFetching = false;
      state.isSuccess = true;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.role = action.payload.role;
    },
    fetchProfileFailed(state, action: PayloadAction<{ message: string }>) {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
    },
  },
});

export const { actions: userProfileActions } = slice;

export const useUserProfileSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userProfileSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useUserProfileSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
