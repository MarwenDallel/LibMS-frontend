import { DefaultColumnFilter } from 'app/components/Filters/columnFilter';
import { fuzzyTextFilterFn } from 'app/components/Filters/fuzzyTextFilter';
import { GlobalFilter } from 'app/components/Filters/globalFilter';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap';
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useTable,
} from 'react-table';
export function DashboardTable({ columns, data }) {
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
      <Row>
        <Col lg={10} className="order-lg-first order-last">
          <Container fluid>
            <Row>
              <Table
                responsive
                striped
                bordered
                hover
                size="sm"
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
                      <tr className="text-center" {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td
                              className="align-middle"
                              {...cell.getCellProps()}
                            >
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
            <Row>
              <Col className="text-center align-items-center">
                <Row className="my-2">
                  <Col>
                    <ButtonGroup>
                      <Button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                      >
                        Next
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>
                      Page{' '}
                      <strong className="font-weight-bold">
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>{' '}
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col lg={2} className="order-lg-last order-first mb-lg-0 mb-1">
          <Container fluid>
            <Row>
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </Row>
            <hr />
            {headerGroups.map(headerGroup => (
              <Row {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                  if (!column.canFilter) return null;
                  return (
                    <Col key={column.render('Header')}>
                      <div className="justify-content-md-center text-center font-weight-bold text-capitalize">
                        {column.render('Header')}
                      </div>
                      <div className="text-capitalize">
                        {column.render('Filter')}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            ))}
            <hr />
          </Container>
        </Col>
      </Row>
    </>
  );
}
