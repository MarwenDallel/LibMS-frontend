import React from 'react';
import { Form } from 'react-bootstrap';

export function MultiCheckBoxColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    let counts = {};
    preFilteredRows.forEach(x => {
      x = x.values[id].toString();

      counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
  }, [id, preFilteredRows]);

  const [checked, setChecked] = React.useState(Object.keys(options));

  const onChange = e => {
    const t = e.target.name.toString();

    if (checked && checked.includes(t)) {
      setFilter(checked.filter(v => v !== t));
      // setChecked((p) => p.filter((v) => v !== t));
      setChecked(prevChecked => {
        if (prevChecked.length === 1) return Object.keys(options);
        return prevChecked.filter(v => v !== t);
      });
    } else {
      setFilter([...checked, t]);
      setChecked(prevChecked => [...prevChecked, t]);
    }
  };

  return Object.entries(options).map(([option, count], i) => {
    return (
      <Form.Check key={i} type="checkbox">
        <Form.Check.Input
          name={option}
          id={option}
          type="checkbox"
          checked={checked.includes(option)}
          onChange={onChange}
        />
        <Form.Check.Label>{option}</Form.Check.Label>
      </Form.Check>
    );
  });
}
