import React, { memo, useEffect } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchReservationsSlice } from './slice';
import { selectReservations } from './slice/selectors';
import { ReservationId } from './slice/types';

export const ReservationsList = memo(() => {
  const { actions } = useFetchReservationsSlice();
  const dispatch = useDispatch();
  const reservationsSelected = useSelector(selectReservations);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.requestFetchReservations());
  });

  const handleAcceptReservation = (data: ReservationId): void => {
    dispatch(actions.requestAcceptReservation(data));
  };
  const handleRejectReservation = (data: ReservationId): void => {
    dispatch(actions.requestrejectReservation(data));
  };

  const statusToBadge = {
    pending: 'warning',
    accepted: 'success',
    rejected: 'danger',
  };
  return (
    <Table responsive striped bordered hover size="sm">
      <thead>
        <tr
          className="text-center"
          style={{
            backgroundColor: '#707070',
            color: 'white',
            fontFamily: 'Lato',
          }}
        >
          <th className="align-middle">Book</th>
          <th className="align-middle d-none d-lg-table-cell">ISBN</th>
          <th className="align-middle">Copies</th>
          <th className="align-middle">University ID</th>
          <th className="align-middle">Reservation Date</th>
          <th className="align-middle">Return Date</th>
          <th className="align-middle">Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservationsSelected.reservations.map(reservation => (
          <tr className="text-center">
            <td className="align-middle">{reservation.book.title}</td>
            <td className="align-middle d-none d-lg-table-cell">
              {reservation.book.isbn}
            </td>
            <td className="align-middle">{reservation.book.copieCount}</td>
            <td className="align-middle">{reservation.user.universityID}</td>
            <td className="align-middle">
              {reservation.reservedAt
                ? new Date(reservation.reservedAt).toLocaleDateString()
                : 'Unavailable'}
            </td>
            <td className="align-middle">
              {reservation.returnDate
                ? new Date(reservation.returnDate).toLocaleDateString()
                : 'N/A'}
            </td>
            <td className="align-middle">
              <h5 className="m-0">
                <Badge
                  variant={statusToBadge[reservation.reservationStatus]}
                  className="text-capitalize"
                  style={{ width: '6rem' }}
                >
                  {reservation.reservationStatus}
                </Badge>
              </h5>
            </td>
            <td className="align-middle">
              <div className="d-flex justify-content-center flex-row">
                <div className="d-flex flex-column">
                  <Button
                    disabled={
                      reservation.reservationStatus === 'accepted' ||
                      reservation.reservationStatus === 'rejected' ||
                      reservation.reservationStatus === 'overdue' ||
                      reservation.reservationStatus === 'closed' ||
                      reservation.reservationStatus === 'cancelled'
                    }
                    onClick={() =>
                      handleAcceptReservation({ id: reservation.id })
                    }
                    className="btn-success btn-sm mr-1"
                  >
                    Accept
                  </Button>
                </div>
                <div className="d-flex flex-column">
                  <Button
                    disabled={
                      reservation.reservationStatus === 'rejected' ||
                      reservation.reservationStatus === 'accepted' ||
                      reservation.reservationStatus === 'overdue' ||
                      reservation.reservationStatus === 'closed' ||
                      reservation.reservationStatus === 'cancelled'
                    }
                    onClick={() =>
                      handleRejectReservation({ id: reservation.id })
                    }
                    className="btn-danger btn-sm ml-1"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});
