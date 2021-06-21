import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFetchReservationsSlice } from '../ReservationsList/slice';
import {
  Reservation,
  ReservationStatus,
} from '../ReservationsList/slice/types';

interface Props {
  reservation: Reservation;
}

export default function ReservationActionsHandler({ reservation }: Props) {
  const { actions } = useFetchReservationsSlice();

  const dispatch = useDispatch();

  const handleAcceptReservation = (id: string): void => {
    dispatch(actions.requestAcceptReservation(id));
  };
  const handleRejectReservation = (id: string): void => {
    dispatch(actions.requestRejectReservation(id));
  };

  const handleCheckoutReservation = (id: string): void => {
    dispatch(actions.requestCheckoutReservation(id));
  };

  switch (reservation.reservationStatus) {
    case ReservationStatus.accepted:
      return (
        <>
          <Button
            className="btn-info btn-sm mr-1"
            onClick={() => handleCheckoutReservation(reservation.id)}
          >
            Checkout
          </Button>
          <Button onClick={() => {}} className="btn-warning btn-sm mr-1">
            Cancel
          </Button>
        </>
      );
    case ReservationStatus.pending:
      return (
        <>
          <Button
            className="btn-success btn-sm mr-1"
            onClick={() => handleAcceptReservation(reservation.id)}
          >
            Accept
          </Button>
          <Button
            onClick={() => handleRejectReservation(reservation.id)}
            className="btn-danger btn-sm mr-1"
          >
            Reject
          </Button>
        </>
      );

    default:
      return <>No Actions</>;
  }
}
