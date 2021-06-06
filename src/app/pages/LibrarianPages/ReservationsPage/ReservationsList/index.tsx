import { MultiCheckBoxColumnFilter } from 'app/components/Filters/checkBoxFilter';
import React, { memo, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardTable } from '../../DashboardPage/dashboardTable';
import { useFetchReservationsSlice } from './slice';
import { selectReservations } from './slice/selectors';

export const ReservationsList = memo(() => {
  const { actions } = useFetchReservationsSlice();
  const dispatch = useDispatch();
  const reservationsSelected = useSelector(selectReservations);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.requestReservations());
  });

  const handleAcceptReservation = (id: string): void => {
    dispatch(actions.requestAcceptReservation(id));
  };
  const handleRejectReservation = (id: string): void => {
    dispatch(actions.requestRejectReservation(id));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Book',
        accessor: 'book.title',
        disableFilters: true,
      },
      {
        Header: 'ISBN',
        accessor: 'book.isbn',
        disableFilters: true,
      },
      {
        Header: 'Copies',
        accessor: 'book.copieCount',
        disableFilters: true,
      },
      {
        Header: 'Email',
        accessor: 'user.email',
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
            <>
              <Button
                disabled={reservation.reservationStatus !== 'pending'}
                onClick={() => handleAcceptReservation(reservation.id)}
                className="btn-success btn-sm mr-1"
                block
              >
                Accept
              </Button>
              <Button
                disabled={reservation.reservationStatus !== 'pending'}
                onClick={() => handleRejectReservation(reservation.id)}
                className="btn-danger btn-sm mr-1"
                block
              >
                Reject
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <DashboardTable
        columns={columns}
        data={reservationsSelected.reservations}
      ></DashboardTable>
    </>
  );
});
