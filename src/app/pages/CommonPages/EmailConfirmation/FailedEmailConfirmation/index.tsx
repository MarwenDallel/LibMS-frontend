import * as React from 'react';

interface Props {
  message?: string;
}

export function FailedEmailConfirmation(props: Props) {
  return (
    <>
      <div className="mb-5 mt-5 font-weight-light" style={{ fontSize: '2em' }}>
        <i className="bi bi-x-circle text-danger"></i> Something went wrong...
      </div>
      <div className="text-capitalize" style={{ fontSize: '1.232em' }}>
        {props.message}
      </div>
    </>
  );
}
