import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import { Container } from 'react-bootstrap';
import { AddBook } from './AddBookForm/index';

export function AddBookPage() {
  return (
    <>
      <Header title="Book Adding Form" />
      <Container className="text-left wrapper flex-grow-1 mb-4">
        <div
          className="d-block mt-5 mb-5 font-weight-light"
          style={{ fontSize: '2em' }}
        >
          Add a Book
        </div>
        <div className="d-block" style={{ fontSize: '1.232em' }}>
          <AddBook />
        </div>
      </Container>
      <Footer />
    </>
  );
}
