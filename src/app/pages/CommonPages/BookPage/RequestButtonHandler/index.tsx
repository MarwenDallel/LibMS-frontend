// Returns the type of button to be rendered depending on the reservations

import * as React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useMemberReservationsSlice } from '../../UserReservationsPage/slice';
import { Reservation } from '../../UserReservationsPage/slice/types';
import { selectMemberBook } from '../slice/selectors';

interface Props {
  reservations: Reservation[];
}

/**
 * The idea is to display the buttons as follow:
 *  - If the user can borrow => display ONLY the borrow button.
 *  - If there's a pending request: show status (pending) + cancel button only.
 */

export default function RequestButtonHandler({ reservations }: Props) {
  const selectedBook = useSelector(selectMemberBook);
  const { actions: reservationActions } = useMemberReservationsSlice();
  const dispatch = useDispatch();

  const onCancelBtnClick = () => {
    dispatch(
      reservationActions.cancelReservation({
        id: reservations.filter(r => r.reservationStatus === 'pending')[0].id,
      }),
    );
  };

  const onBorrowBtnClick = () => {
    dispatch(
      reservationActions.requestReservation({
        isbn: selectedBook.isbn,
        reservedAt: new Date().toISOString(),
        book: selectedBook,
      }),
    );
  };

  if (reservations.filter(r => r.reservationStatus === 'pending').length > 0) {
    return (
      <>
        <div>Status: {<Badge variant="warning">Pending</Badge>}</div>
        <div className="mt-2">
          <Button variant="danger" onClick={onCancelBtnClick}>
            Cancel
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <Button variant="success" onClick={onBorrowBtnClick}>
        Borrow
      </Button>
    );
  }
}
