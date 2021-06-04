// Returns the type of button to be rendered depending on the reservations

import * as React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useMemberReservationsSlice } from '../../UserReservationsPage/slice';
import { Reservation } from '../../UserReservationsPage/slice/types';
import { RequestButton } from '../Button';
import { selectMemberBook } from '../slice/selectors';

interface Props {
  reservation: Reservation;
}

/**
 * The idea is to display the buttons as follow:
 *  - If the user can borrow => display ONLY the borrow button.
 *  - If there's a pending request: show status (pending) + cancel button only.
 */

export default function RequestButtonHandler({ reservation }: Props) {
  const selectedBook = useSelector(selectMemberBook);
  const { actions: reservationActions } = useMemberReservationsSlice();
  const dispatch = useDispatch();

  const onCancelBtnClick = () => {
    dispatch(
      reservationActions.cancelReservation({
        id: reservation.id,
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

  //the user can cancel reservations with the following statuses: pending and accepted (ref: http://shorturl.at/kozAD)
  switch (reservation.reservationStatus) {
    case 'pending':
      return (
        <>
          <div>Status: {<Badge variant="warning">Pending</Badge>}</div>
          <div className="mt-2">
            <RequestButton
              variant="danger"
              text="Cancel"
              onClick={onCancelBtnClick}
            />
          </div>
        </>
      );

    case 'accepted':
      return (
        <>
          {/** update backend to accomodate this, currently it is not allowed */}
          <div>Status: {<Badge variant="success">Active</Badge>}</div>
          <small>
            Your request has been approved, please go to the library to pickup
            the book.
          </small>
          <div className="mt-2">
            <RequestButton
              variant="danger"
              text="Cancel"
              onClick={onCancelBtnClick}
            />
          </div>
        </>
      );

    case 'checkedOut':
      return (
        <>
          {/** update backend to accomodate this */}
          <div>Status: {<Badge variant="secondary">Checked Out</Badge>}</div>
          <div>
            Return Date: {new Date(reservation.returnDate || '').toDateString()}
          </div>
        </>
      );
    default:
      return (
        <Button variant="success" onClick={onBorrowBtnClick}>
          Borrow
        </Button>
      );
  }
}
