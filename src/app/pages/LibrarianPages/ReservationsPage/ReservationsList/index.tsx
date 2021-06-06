import { MultiCheckBoxColumnFilter } from 'app/components/Filters/checkBoxFilter';
import React, { memo, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardTable } from '../../DashboardPage/dashboardTable';
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
        Header: 'University ID',
        accessor: 'user.universityID',
        disableFilters: true,
      },
      {
        Header: 'Date Of Reservation',
        accessor: 'reservedAt',
        disableFilters: true,
        Cell: ({ value }) => {
          return value.substring(0, 10) + ' ' + value.substring(11, 19);
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
          const rowIdx = value.row.original;
          return (
            <>
              <Button
                disabled={
                  rowIdx.reservationStatus === 'cancelled' ||
                  rowIdx.reservationStatus === 'accepted' ||
                  rowIdx.reservationStatus === 'checkedOut' ||
                  rowIdx.reservationStatus === 'rejected' ||
                  rowIdx.reservationStatus === 'overdue' ||
                  rowIdx.reservationStatus === 'closed'
                }
                onClick={() => handleAcceptReservation({ id: rowIdx.id })}
                className="btn-success btn-sm mr-1"
                block
              >
                Accept
              </Button>
              <Button
                disabled={
                  rowIdx.reservationStatus === 'cancelled' ||
                  rowIdx.reservationStatus === 'accepted' ||
                  rowIdx.reservationStatus === 'checkedOut' ||
                  rowIdx.reservationStatus === 'rejected' ||
                  rowIdx.reservationStatus === 'overdue' ||
                  rowIdx.reservationStatus === 'closed'
                }
                onClick={() => handleRejectReservation({ id: rowIdx.id })}
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
