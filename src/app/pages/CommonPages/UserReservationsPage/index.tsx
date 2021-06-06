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
import { ReservationsTable } from './ReservationsTable';
import { MultiCheckBoxColumnFilter } from '../../../components/Filters/checkBoxFilter';
import { useMemberReservationsSlice } from './slice';
import { selectMemberReservations } from './slice/selectors';
import { ReservationId } from './slice/types';

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
    dispatch(reservationActions.fetchUserReservations({}));
  });

  const onCancelBtnClick = (data: ReservationId): void => {
    dispatch(reservationActions.cancelReservation(data));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Book',
        accessor: 'book.title',
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
            <Button
              disabled={
                rowIdx.reservationStatus === 'cancelled' ||
                rowIdx.reservationStatus === 'checkedOut' ||
                rowIdx.reservationStatus === 'rejected' ||
                rowIdx.reservationStatus === 'overdue' ||
                rowIdx.reservationStatus === 'closed'
              }
              onClick={() => onCancelBtnClick({ id: rowIdx.id })}
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
