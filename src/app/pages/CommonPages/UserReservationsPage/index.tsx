/**
 *
 * UserReservationsPage
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MultiCheckBoxColumnFilter } from '../../../components/Filters/checkBoxFilter';
import { ReservationsTable } from './ReservationsTable';
import { useMemberReservationsSlice } from './slice';
import { selectMemberReservations } from './slice/selectors';

interface Props {}

export function UserReservationsPage(props: Props) {
  const { actions: reservationActions } = useMemberReservationsSlice();
  const dispatch = useDispatch();

  const reservations = useSelector(selectMemberReservations);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(reservationActions.fetchUserReservations());
  });

  const onCancelBtnClick = (id: string): void => {
    dispatch(reservationActions.cancelReservation(id));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Book',
        accessor: 'book.title',
        disableFilters: true,
      },
      {
        Header: 'Reservation Date',
        accessor: 'reservedAt',
        disableFilters: true,
        Cell: ({ value }) => {
          return value ? new Date(value).toLocaleDateString() : 'Unavailable';
        },
      },
      {
        Header: 'Return Date',
        accessor: 'returnDate',
        disableFilters: true,
        Cell: ({ value }) => {
          return value ? new Date(value).toLocaleDateString() : 'N/A';
        },
      },
      {
        Header: 'Status',
        accessor: 'reservationStatus',
        Filter: MultiCheckBoxColumnFilter,
        filter: 'multiSelect',
        Cell: ({ value }) => {
          return value.charAt(0).toUpperCase() + value.slice(1);
        },
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        disableFilters: true,
        Cell: value => {
          const reservation = value.row.original;
          return (
            <Button
              disabled={
                reservation.reservationStatus !== 'pending' ||
                reservation.reservationStatus !== 'accepted'
              }
              onClick={() => onCancelBtnClick(reservation.id)}
              className="btn-danger btn-sm"
              block
            >
              Cancel
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <>
      <Header title="My SMU-Library Account" />
      <Container fluid className="flex-grow-1 my-5 mx-0">
        <ReservationsTable
          columns={columns}
          data={reservations.reservations}
        ></ReservationsTable>
      </Container>
      <Footer />
    </>
  );
}
