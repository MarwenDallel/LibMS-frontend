/**
 *
 * BookDescRequest
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import { ASSETS_ENDPOINTS } from 'app/configs/endpoints';
import { selectMemberBooksById } from 'app/pages/MemberPages/BooksPage/slice/selectors';
import * as React from 'react';
import { useEffect } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Image,
  OverlayTrigger,
  Row,
  Tab,
  Tabs,
  Tooltip,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useMemberReservationsSlice } from '../UserReservationsPage/slice';
import {
  selectBookRequestFailed,
  selectBookRequestSucceeded,
  selectHasFetched,
  selectIsSuccess,
  selectReservationByBookId,
} from '../UserReservationsPage/slice/selectors';

interface Props {}

export function BookDescRequestPage(props: Props) {
  /**
   * 1) If user is logged (i.e. isSuccess is set to true from UserProfilePage, (I'm also fetching the reservations when the
   * user is redirected to their profile page, the idea is to load everything from that page) ) render borrow btn (conditionally
   * of course, meaning it is render if the user has not already made a request etc)
   * 2) If not, render login btn
   */

  const dispatch = useDispatch();
  const { actions } = useMemberReservationsSlice();
  let { id } = useParams<{ id: string }>();

  const selectedBook = useSelector(selectMemberBooksById(id))[0];

  // Placeholders until BookEntity is refactored
  const nbrOfAvailableCopies: number = 30;
  const nbrOfCopies: number = 30;

  // I'm using hasFetched in case the store is already setup, to avoid duplicate requests
  const hasFetched = useSelector(selectHasFetched);
  const isSuccess = useSelector(selectIsSuccess);
  const reservationWithISBN = useSelector(selectReservationByBookId(id));

  const [canBorrow, setCanBorrow] = React.useState(true);
  const [cantBorrowMsg, setCantBorrowMsg] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false);

  // Listening for borrow request status: Succeeded or Failed
  const hasBorrowRequestSucceeded = useSelector(selectBookRequestSucceeded);
  const hasBorrowRequestFailed = useSelector(selectBookRequestFailed);

  const useEffectOnMount = (
    effect: React.EffectCallback,
    dependencies: any[],
  ) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, [...dependencies]);
  };

  // Note that multiple conditions can be true
  const canUserBorrow = () => {
    if (
      reservationWithISBN.filter(r => r.reservationStatus === 'pending')
        .length > 0
    ) {
      setCanBorrow(false);
      setCantBorrowMsg('Cannot borrow, reservation is pending');
    } else if (
      reservationWithISBN.filter(r => r.reservationStatus === 'active').length >
      0
    ) {
      setCanBorrow(false);
      setCantBorrowMsg('Cannot borrow, reservation is active');
    } else if (nbrOfAvailableCopies === 0) {
      setCanBorrow(false);
      setCantBorrowMsg('Not enough quantity');
    }
  };

  const disabledRequestBtn = (
    <OverlayTrigger
      overlay={<Tooltip id="tooltip-disabled">{cantBorrowMsg}</Tooltip>}
    >
      <span className="d-inline-block">
        <Button variant="success" disabled style={{ pointerEvents: 'none' }}>
          <i className="bi bi-check-circle"></i> Borrowed
        </Button>
      </span>
    </OverlayTrigger>
  );

  const availableCopies = (
    <div className="mt-4">
      {nbrOfAvailableCopies ? (
        <i className="bi bi-check-circle text-success"></i>
      ) : (
        <i className="bi bi-x-circle text-danger"></i>
      )}{' '}
      {nbrOfAvailableCopies} of {nbrOfCopies} available copies
    </div>
  );

  const loginBtn = (
    <Link to="/login">
      <Button className="ml-2">Login to Request</Button>
    </Link>
  );

  const successBorrowRequest = (
    <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
      Request has been successfully issued. It will be shortly reviewed
    </Alert>
  );

  const onBorrowBtnClick = () => {
    dispatch(
      actions.requestReservation({
        isbn: selectedBook.isbn,
        reservedAt: new Date().toISOString(),
      }),
    );
  };

  const canRequestBtn = (
    <Button variant="success" onClick={onBorrowBtnClick}>
      Borrow
    </Button>
  );

  const requestBtn = canBorrow ? canRequestBtn : disabledRequestBtn;

  useEffectOnMount(() => {
    // No store? fetch the reservations
    if (!hasFetched) {
      dispatch(actions.fetchUserReservations({}));
    }
    canUserBorrow();
  }, [reservationWithISBN, dispatch]);

  useEffectOnMount(() => {
    if (hasBorrowRequestSucceeded) {
      setCanBorrow(false);
      setCantBorrowMsg('Cannot borrow, reservation is pending');
      setShowSuccess(true);
    }
  }, [hasBorrowRequestSucceeded]);

  useEffectOnMount(() => {
    if (hasBorrowRequestFailed) {
      console.log('[FAILED]:');
      // Handle error alert
    }
  }, [hasBorrowRequestFailed]);

  return (
    <Div className="d-flex flex-column min-vh-100">
      <Header navItems={[]} title={selectedBook.title} account={false} />
      <Container className="wrapper flex-grow-1" fluid>
        <Row className="justify-content-md-center mt-2">
          <Col className="my-auto" md="auto">
            {!!showSuccess && successBorrowRequest}
          </Col>
        </Row>
        <Row className="w-100 mt-3 justify-content-md-center">
          <Col md="auto">
            <Image
              height={346}
              width={224}
              src={`${ASSETS_ENDPOINTS.images}/${selectedBook.image.name}`}
              thumbnail
            />
          </Col>
          <Col md={6}>
            <BookTitle className="font-weight-normal">
              {selectedBook.title}
            </BookTitle>
            <div className="font-weight-normal">{selectedBook.subtitle}</div>
            <div className="mt-4">
              {selectedBook.authors
                .slice(0, selectedBook.authors.length - 1)
                .map(a => a.fullName)
                .join(', ')}
              {selectedBook.authors.length > 1 ? ` and ` : ` `}
              {selectedBook.authors[selectedBook.authors.length - 1].fullName}
            </div>
            {availableCopies}
            <div className="mt-4">{isSuccess ? requestBtn : loginBtn}</div>
            <Tabs
              className="mt-3"
              defaultActiveKey="description"
              id="book-details"
            >
              <Tab eventKey="description" title="Description">
                <div className="mt-4">{selectedBook.overview}</div>
              </Tab>
              <Tab eventKey="details" title="Details">
                <div className="mt-4">
                  <div>Publisher: {selectedBook.publisher}</div>
                  <div>
                    Date: {new Date(selectedBook.publishedDate).toDateString()}
                  </div>
                  <div>ISBN: {selectedBook.isbn}</div>
                  <div>Pages: {selectedBook.pageCount}</div>
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Div>
  );
}

const BookTitle = styled.div`
  font-size: 2em;
`;
const Div = styled.div`
  background-color: #f6f8fb;
`;
