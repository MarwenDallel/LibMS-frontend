import React from 'react';

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

  return (
    <div>
      {Object.entries(options).map(([option, count], i) => {
        return (
          <div key={i}>
            <input
              className="form-check-input"
              type="checkbox"
              color="primary"
              name={option}
              id={option}
              checked={checked.includes(option)}
              onChange={onChange}
              title={`${option} (${count})`}
            />
            {option}
          </div>
        );
      })}
    </div>
  );
}
