import { memo, useEffect } from 'react';
import { Table, Col, Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useAcceptReservationSlice } from '../components/AcceptButton/slice';
import { AcceptReservation } from '../components/AcceptButton/slice/types';
import { useFetchReservationsSlice } from './slice';
import { selectReservations } from './slice/selectors';

const features = [
  'Book',
  'ISBN',
  'Copies',
  'University ID',
  'Date of Reservation',
  'Status',
  'Actions',
];
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

  const { acceptReservationActions } = useAcceptReservationSlice();

  const acceptReservation = (data: AcceptReservation): void => {
    console.log(data);
    dispatch(acceptReservationActions.requestAcceptReservation(data));
  };

  const statusToBadge = {
    pending: 'warning',
    active: 'success',
    rejected: 'alert',
  };
  return (
    <Table className="w-100 mr-5 ml-5" striped bordered hover>
      <thead>
        <tr
          key={1}
          className="text-center"
          style={{
            backgroundColor: '#707070',
            color: '#E5E5E5',
            fontFamily: 'Lato',
          }}
        >
          {features.map((feature, i) => (
            <th key={i * 10}>{feature}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {reservationsSelected.reservations.map((reservation, i) => (
          <tr key={i + 1} className="text-center">
            <td className="col-2">{reservation.book.title}</td>
            <td className="col-1">{reservation.book.isbn}</td>
            <td className="col-1">{reservation.book.copiesNbr}</td>
            <td className="col-2">{reservation.user.universityID}</td>
            <td className="col-2">{reservation.reservedAt.substring(0, 10)}</td>
            <td className="col-1">
              <Badge variant={statusToBadge[reservation.reservationStatus]}>
                {reservation.reservationStatus.charAt(0).toUpperCase() +
                  reservation.reservationStatus.slice(1)}
              </Badge>
            </td>
            <td className="col-3">
              <div className="d-flex flex-row">
                <Col xs={6}>
                  <Button
                    onClick={() => acceptReservation({ id: reservation.id })}
                    className="w-100 btn-success btn-sm"
                  >
                    Accept
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button className="btn-danger w-100 btn-sm">Deny</Button>
                </Col>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});
