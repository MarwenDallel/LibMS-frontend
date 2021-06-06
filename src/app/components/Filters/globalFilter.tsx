import React from 'react';
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
    <div className="container-sm">
      <div className="row">
        <div className="col justify-content-md-center text-center font-weight-bold">
          Search:{' '}
        </div>
      </div>
      <div className="row">
        <input
          value={value || ''}
          className="form-control form-control-sm"
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </div>
    </div>
  );
}
