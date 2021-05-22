import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { memberReservationsSaga } from './saga';
import { MemberReservationsState, Reservation } from './types';

export const initialState: MemberReservationsState = {
  isFetching: false,
  isFailed: false,
  isSuccess: false,
  message: '',
  reservations: [],
  hasFetched: false,
  isBorrowRequestFailed: false,
  isBorrowRequestSuccess: false,
  borrowRequestFailureMessage: '',
};

const slice = createSlice({
  name: 'memberReservations',
  initialState,
  reducers: {
    fetchUserReservations(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    // this is called after the API request for fetching reservations
    fetchUserReservationsSuccess(state, action: PayloadAction<Reservation[]>) {
      return {
        ...state,
        isFetching: false,
        isFailed: false, // in case it has failed previously (e.g. before refreshing token for instance)
        isSuccess: true,
        hasFetched: true,
        reservations: [...action.payload],
      };
    },
    fetchUserReservationsFailed(state, action: PayloadAction<string>) {
      state.isFetching = false;
      state.isFailed = true;
      state.message = action.payload;
    },
    // a "setter" to add reservations the 'reservations' state property
    setReservations(state, action: PayloadAction<Reservation[]>) {
      return {
        ...state,
        reservations: [...action.payload],
      };
    },
    requestReservation(
      state,
      action: PayloadAction<{ isbn: string; reservedAt: string }>,
    ) {},
    requestReservationSuccess(state) {
      state.isBorrowRequestFailed = false;
      state.isBorrowRequestSuccess = true;
    },
    requestReservationFailed(state, action: PayloadAction<string>) {
      state.isBorrowRequestSuccess = false;
      state.isBorrowRequestFailed = true;
      state.borrowRequestFailureMessage = action.payload;
    },
  },
});

export const { actions: memberReservationsActions } = slice;

export const useMemberReservationsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: memberReservationsSaga });
  return { actions: slice.actions };
};

export const MemberReservationReducers = slice.reducer;

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useMemberReservationsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
