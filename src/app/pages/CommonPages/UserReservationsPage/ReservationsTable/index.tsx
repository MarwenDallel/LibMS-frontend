import { DefaultColumnFilter } from 'app/components/Filters/columnFilter';
import { fuzzyTextFilterFn } from 'app/components/Filters/fuzzyTextFilter';
import { GlobalFilter } from 'app/components/Filters/globalFilter';
import React from 'react';
import { Button } from 'react-bootstrap';
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
} from 'react-table';

export function ReservationsTable({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      multiSelect: (rows, id, filterValues) => {
        if (filterValues.length === 0) return rows;
        return rows.filter(r => filterValues.includes(r.values[id]));
      },
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
  );

  const { pageIndex } = state;

  return (
    <>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <table
            striped="true"
            bordered="true"
            hover="true"
            responsive="true"
            className="table"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map(headerGroup => (
                <tr
                  className="text-center"
                  style={{
                    backgroundColor: '#707070',
                    color: '#E5E5E5',
                    fontFamily: 'Lato',
                  }}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr
                    className="text-center align-items-center"
                    {...row.getRowProps()}
                  >
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-center align-items-center">
            <span>
              Page{' '}
              <strong className="font-weight-bold">
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <div className="btn-group" role="group">
              <Button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </Button>
              <Button onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <hr />
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <div key={column.render('Header')}>
                  <div className="justify-content-md-center text-center font-weight-bold text-capitalize">
                    {column.canFilter ? column.render('Header') : null}
                  </div>
                  <div className="mx-5 text-capitalize">
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
