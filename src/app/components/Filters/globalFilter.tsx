import React from 'react';
import { Form } from 'react-bootstrap';
import { useAsyncDebounce } from 'react-table';

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <>
      <Form.Label className="font-weight-bold">Search</Form.Label>
      <Form.Control
        id="searchTable"
        placeholder={`${count} records...`}
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </>
  );
}
