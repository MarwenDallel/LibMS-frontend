import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { fetchReservationsRootState } from './saga';
import { ReservationId, ReservationsState } from './types';

export const initialState: ReservationsState = {
  reservations: [],
  isFetching: false,
  isError: false,
  isSuccess: false,
};

interface ReservationResponse {
  reservationStatus: string;
  id: string;
}
interface AcceptReservationResponse extends ReservationResponse {
  returnDate: string;
  copiesNbr: number;
}

const slice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    requestFetchReservations(state) {
      state.isFetching = true;
    },
    FetchReservationsSuccess(state, action: PayloadAction<any>) {
      state.reservations = action.payload.reservations;
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      return state;
    },
    requestAcceptReservation(state, action: PayloadAction<ReservationId>) {
      state.isFetching = true;
    },
    acceptReservationSuccess(
      state,
      action: PayloadAction<AcceptReservationResponse>,
    ) {
      state.reservations
        .filter(reservation => reservation.id === action.payload.id)
        .map(acceptedReservation => {
          acceptedReservation.reservationStatus =
            action.payload.reservationStatus;
          acceptedReservation.book.copiesNbr = action.payload.copiesNbr;
          acceptedReservation.returnDate = action.payload.returnDate;
          return null;
        });
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      return state;
    },
    requestrejectReservation(state, action: PayloadAction<any>) {
      state.isFetching = true;
    },
    rejectReservationSuccess(
      state,
      action: PayloadAction<ReservationResponse>,
    ) {
      state.reservations
        .filter(reservation => reservation.id === action.payload.id)
        .map(rejectedReservation => {
          rejectedReservation.reservationStatus =
            action.payload.reservationStatus;
          return null;
        });
      state.isSuccess = true;
      state.isError = false;
      state.isFetching = false;
      return state;
    },
    rejectReservationFailed(state) {
      state.isSuccess = false;
      state.isError = true;
      state.isFetching = false;
    },
  },
});

export const { actions: fetchReservationsActions } = slice;
export const { actions: acceptReservationActions } = slice;
export const { actions: rejectReservationActions } = slice;

export const useFetchReservationsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: fetchReservationsRootState });
  return { actions: slice.actions };
};
