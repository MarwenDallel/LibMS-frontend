import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { fetchReservationsRootState } from './saga';
import { ReservationsState, ReservationStatus } from './types';

export const initialState: ReservationsState = {
  reservations: [],
  isFetching: false,
  isError: false,
  isSuccess: false,
  errorMessage: '',
};

const slice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    // Load reservations
    requestReservations(state) {
      state.isFetching = true;
    },
    reservationsLoaded(state, action: PayloadAction<any>) {
      state.reservations = action.payload.reservations;
    },

    // Accept reservation by ID
    requestAcceptReservation(state, action: PayloadAction<string>) {
      state.isFetching = true;
    },
    acceptReservation(state, action: PayloadAction<string>) {
      state.reservations
        .filter(reservation => reservation.id === action.payload)
        .map(reservation => {
          reservation.reservationStatus = ReservationStatus.accepted;
          return reservation;
        });
    },

    // Reject reservation by ID
    requestRejectReservation(state, action: PayloadAction<string>) {
      state.isFetching = true;
    },
    rejectReservation(state, action: PayloadAction<string>) {
      state.reservations
        .filter(reservation => reservation.id === action.payload)
        .map(reservation => {
          reservation.reservationStatus = ReservationStatus.rejected;
          return reservation;
        });
    },

    // Checkout reservation by ID
    requestCheckoutReservation(state, action: PayloadAction<string>) {
      state.isFetching = true;
    },
    checkoutReservation(state, action: PayloadAction<string>) {
      state.reservations
        .filter(reservation => reservation.id === action.payload)
        .map(reservation => {
          reservation.reservationStatus = ReservationStatus.checkedOut;
          reservation.returnDate = new Date(
            Date.now() + 15 * 24 * 3600 * 1000,
          ).toISOString(); // expires after 15 days
          return reservation;
        });
    },

    // Generic response (this is stupid)
    requestSuccess(state) {
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
    },
    requestFailed(state, action: PayloadAction<string>) {
      state.isSuccess = false;
      state.isError = true;
      state.isFetching = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { actions: reservationActions, reducer } = slice;

export const useFetchReservationsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: fetchReservationsRootState });
  return { actions: slice.actions };
};
