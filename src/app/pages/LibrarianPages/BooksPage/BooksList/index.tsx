import { MultiCheckBoxColumnFilter } from 'app/components/Filters/checkBoxFilter';
import React, { memo, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DashboardTable } from '../../DashboardPage/dashboardTable';
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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Book',
        accessor: 'title',
        disableFilters: true,
      },
      {
        Header: 'ISBN',
        accessor: 'isbn',
        disableFilters: true,
      },
      {
        Header: 'Authors',
        accessor: 'authors',
        Cell: authors => {
          return (
            <div className="text-center">
              {authors.value.map(author => author.fullName).join(', ')}
            </div>
          );
        },
        disableFilters: true,
      },
      {
        Header: 'Publisher',
        accessor: 'publisher',
        Filter: MultiCheckBoxColumnFilter,
        filter: 'multiSelect',
      },
      {
        Header: 'Pages',
        accessor: 'pageCount',
        disableFilters: true,
      },
      {
        Header: 'Copies',
        accessor: 'copieCount',
        disableFilters: true,
      },
      {
        Header: 'Details',
        Cell: book => {
          return (
            <Button
              as={Link}
              to={`/dashboard/books/${book.row.values.isbn}`}
              className="btn-primary btn-sm"
            >
              Details
            </Button>
          );
        },
      },
    ],
    [],
  );

  return (
    <DashboardTable
      columns={columns}
      data={booksSelected.books}
    ></DashboardTable>
  );
});
