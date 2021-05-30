/**
 *
 * BookDescRequest
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import * as React from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMemberReservationsSlice } from '../UserReservationsPage/slice';
import {
  selectBookRequestSucceeded,
  selectCancelRequestSucceeded,
  selectHasFetched,
  selectReservationByBookId,
} from '../UserReservationsPage/slice/selectors';
import RequestAlert from './Alert';
import BookDescription from './BookDescription';
import { useMemberBookSlice } from './slice';
import { selectMemberBook } from './slice/selectors';
interface Props {}

export function BookPage(props: Props) {
  let { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const { actions: reservationActions } = useMemberReservationsSlice();
  const { actions: memberBookActions } = useMemberBookSlice();

  const selectedBook = useSelector(selectMemberBook);

  // I'm using hasFetched in case the store is already setup, to avoid duplicate requests
  const hasFetched = useSelector(selectHasFetched);
  const reservationWithISBN = useSelector(selectReservationByBookId(id));

  // Listening for borrow request status: Succeeded or Failed
  const hasBorrowRequestSucceeded = useSelector(selectBookRequestSucceeded);

  const hasCancelledRequestSucceeded = useSelector(
    selectCancelRequestSucceeded,
  );

  const useEffectOnMount = (
    effect: React.EffectCallback,
    dependencies: any[],
  ) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, [...dependencies]);
  };

  const successBorrowRequestAlert = (
    <>
      <RequestAlert
        renderCondition={hasBorrowRequestSucceeded}
        variant="success"
        text="Request has been successfully issued. It will be shortly reviewed"
        payload={reservationActions.setReservationSuccess(false)}
      />
    </>
  );
  const successCancelRequestAlert = (
    <RequestAlert
      renderCondition={hasCancelledRequestSucceeded}
      variant="success"
      text="Reservation Cancelled Successfully"
      payload={reservationActions.setCancelReservationSuccess(false)}
    />
  );

  useEffect(() => {
    dispatch(memberBookActions.requestFetchBooks({ id }));
  }, [dispatch, id, memberBookActions, selectedBook.isSuccess]);

  useEffectOnMount(() => {
    // No store? fetch the reservations
    if (!hasFetched) {
      dispatch(reservationActions.fetchUserReservations({}));
    }
  }, [reservationWithISBN, dispatch]);

  return (
    <>
      <Header
        navItems={[]}
        title={selectedBook?.title ? selectedBook.title : ''}
        account={false}
      />
      {selectedBook?.isSuccess && (
        <Container className="wrapper flex-grow-1" fluid>
          <Row className="justify-content-md-center mt-2">
            <Col className="my-auto" md="auto">
              {successBorrowRequestAlert}
              {successCancelRequestAlert}
            </Col>
          </Row>
          <BookDescription
            book={selectedBook}
            reservations={reservationWithISBN}
          />
        </Container>
      )}
      <Footer />
    </>
  );
}
