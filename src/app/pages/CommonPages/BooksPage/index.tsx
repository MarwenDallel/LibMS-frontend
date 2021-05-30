/**
 *
 * BooksPage
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import * as React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { BookCard } from './BookCard/Loadable';
import { BookSearch } from './BookSearch/Loadable';
import { useBooksSlice } from './slice/index';
import { selectBooks } from './slice/selectors';

interface Props {}

export function BooksPage(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useBooksSlice();
  const booksList = useSelector(selectBooks);

  React.useEffect(() => {
    dispatch(actions.requestFetchBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="SMU-Library Books" />
      <BooksMain role="main">
        <BooksJumbotron className="text-center">
          <BookSearch />
        </BooksJumbotron>
        <div className="py-5 bg-light min-vh-100">
          <Container style={{ maxWidth: '80vw' }}>
            <div className="d-flex justify-content-center flex-wrap">
              {booksList.map(book => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  image={book.image}
                  copiesNumber={book.copiesNbr}
                ></BookCard>
              ))}
            </div>
          </Container>
        </div>
      </BooksMain>
      <Footer />
    </>
  );
}

const BooksMain = styled.main`
  min-height: 100%;
`;

const BooksJumbotron = styled(Jumbotron)`
  margin-bottom: 0 !important;
  background-color: #fff;
  padding-top: 2rem !important;
  padding-bottom: 2rem !important;

  @media (min-width: 768px) {
    padding-top: 4rem !important;
    padding-bottom: 4rem !important;
  }
`;
