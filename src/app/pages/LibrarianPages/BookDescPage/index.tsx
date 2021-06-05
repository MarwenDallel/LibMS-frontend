/**
 *
 * BookDescPage
 *
 */
import { SectionHeading } from 'app/components/SectionHeading';
import { ASSETS_ENDPOINTS } from 'app/configs/endpoints';
import * as React from 'react';
import { Button, ButtonGroup, Col, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectBookByISBN } from '../BooksPage/BooksList/slice/selectors';

interface Props {}

export function BookDescPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { id } = useParams<{ id: string }>();

  const selectedBook = useSelector(selectBookByISBN(id))[0];
  return (
    <>
      <SectionHeading title="Book Details"></SectionHeading>
      <div
        className="container rounded shadow p-4 my-auto"
        style={{ backgroundColor: 'white' }}
      >
        <Row>
          <Col lg={3} md={4}>
            <Image
              height={346}
              width={224}
              src={`${ASSETS_ENDPOINTS.images}/${selectedBook.image.name}`}
              thumbnail
            />
          </Col>
          <Col lg={7} md={8}>
            <h1 className="font-weight-light">{selectedBook.title}</h1>
            <h5 className="font-italic font-weight-light">
              Subtitle: {selectedBook.subtitle}
            </h5>
            <dl className="row mt-4">
              <dt className="col-sm-3">ISBN</dt>
              <dd className="col-sm-9">{selectedBook.isbn}</dd>

              <dt className="col-sm-3">Authors</dt>
              <dd className="col-sm-9">
                {selectedBook.authors
                  .slice(0, selectedBook.authors.length - 1)
                  .map(a => a.fullName)
                  .join(', ')}
                {selectedBook.authors.length > 1 ? ` and ` : ` `}
                {selectedBook.authors[selectedBook.authors.length - 1].fullName}
              </dd>

              <dt className="col-sm-3">Publisher</dt>
              <dd className="col-sm-9">{selectedBook.publisher}</dd>

              <dt className="col-sm-3">Publication Date</dt>
              <dd className="col-sm-9">
                {new Date(selectedBook.publishedDate).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </dd>

              <dt className="col-sm-3">Pages</dt>
              <dd className="col-sm-9">{selectedBook.pageCount}</dd>
            </dl>
          </Col>
          <div>
            <ButtonGroup className="ml-3">
              <Button variant="warning">Edit</Button>
              <Button variant="danger">Delete</Button>
            </ButtonGroup>
          </div>
        </Row>
      </div>
    </>
  );
}
