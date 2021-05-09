import { Table } from 'react-bootstrap';

export function BooksPage() {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Sub Title</th>
            <th>Original Title</th>
            <th>Publisher</th>
            <th>Published Date</th>
            <th>Page Numbers</th>
            <th>Description</th>
            <th>Author(s)</th>
            <th>Front</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
