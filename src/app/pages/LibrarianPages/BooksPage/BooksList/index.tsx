import React, { memo, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFetchBooksSlice } from './slice';
import { selectState } from './slice/selectors';

export const BooksList = memo(() => {
  const { actions } = useFetchBooksSlice();
  const dispatch = useDispatch();
  const booksSelected = useSelector(selectState);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.requestFetchBooks());
  });

  return (
    <Table responsive striped bordered hover size="sm">
      <thead>
        <tr
          className="text-center"
          style={{
            backgroundColor: '#707070',
            color: 'white',
            fontFamily: 'Lato',
          }}
        >
          <th className="align-middle">Title</th>
          <th className="align-middle">ISBN</th>
          <th className="align-middle">Authors</th>
          <th className="align-middle">Publisher</th>
          <th className="align-middle d-none d-lg-table-cell">Pages</th>
          <th className="align-middle d-none d-lg-table-cell">
            Publication Date
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {booksSelected.books.map(book => (
          <tr className="text-center align-items-middle">
            <td className="align-middle">{book.title}</td>
            <td className="align-middle">{book.isbn}</td>
            <td className="align-middle">
              {book.authors.map(author => author.fullName).join(', ')}
            </td>
            <td className="align-middle">{book.publisher}</td>
            <td className="align-middle d-none d-lg-table-cell">
              {book.pageCount}
            </td>
            <td className="align-middle d-none d-lg-table-cell">
              {book.publishedDate
                ? new Date(book.publishedDate).toLocaleDateString()
                : 'Unavailable'}
            </td>
            <td className="align-middle">
              <Button
                as={Link}
                to={`/dashboard/books/${book.isbn}`}
                className="btn-primary btn-sm"
              >
                Details
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});
