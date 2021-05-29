import { ASSETS_ENDPOINTS } from 'app/configs/endpoints';
import { Book } from 'app/pages/LibrarianPages/AddBookPage/AddBookForm/slice/types';
import * as React from 'react';
import { Col, Image, Row, Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';
import { Reservation } from '../../UserReservationsPage/slice/types';
import RequestButtonHandler from '../RequestButtonHandler';

interface Props {
  book: Book;
  reservations: Reservation[];
}
export default function BookDescription({ book, reservations }: Props) {
  // Placeholder until BookEntity is refactored
  const nbrOfAvailableCopies: number = 2;

  const requestBtn = <RequestButtonHandler reservations={reservations} />;

  const availableCopies = (
    <div className="mt-4">
      {nbrOfAvailableCopies ? (
        <i className="bi bi-check-circle text-success"></i>
      ) : (
        <i className="bi bi-x-circle text-danger"></i>
      )}{' '}
      {nbrOfAvailableCopies} of {book.copiesNbr} available copies
    </div>
  );

  return (
    <Row className="w-100 my-3 justify-content-md-center">
      <Col md="auto">
        <Image
          height={346}
          width={224}
          src={`${ASSETS_ENDPOINTS.images}/${book.image.name}`}
          thumbnail
        />
      </Col>
      <Col md={6} className="mb-5">
        <BookTitle className="font-weight-normal">{book.title}</BookTitle>
        <div className="font-weight-normal">{book.subtitle}</div>
        <div className="mt-4">
          {book.authors
            .slice(0, book.authors.length - 1)
            .map(a => a.fullName)
            .join(', ')}
          {book.authors.length > 1 ? ` and ` : ` `}
          {book.authors[book.authors.length - 1].fullName}
        </div>
        {availableCopies}
        <div className="mt-4">{requestBtn}</div>
        <Tabs className="mt-3" defaultActiveKey="description" id="book-details">
          <Tab eventKey="description" title="Description">
            <div className="mt-4">
              {book.overview
                ? book.overview
                : 'No description was provided for this book'}
            </div>
          </Tab>
          <Tab eventKey="details" title="Details">
            <div className="mt-4">
              <div>Publisher: {book.publisher}</div>
              <div>Date: {new Date(book.publishedDate).toDateString()}</div>
              <div>ISBN: {book.isbn}</div>
              <div>Pages: {book.pageCount}</div>
            </div>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
}

const BookTitle = styled.div`
  font-size: 2em;
`;
