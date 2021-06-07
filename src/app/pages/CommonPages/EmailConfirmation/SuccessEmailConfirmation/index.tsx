import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

export function SuccessEmailConfirmation(props: Props) {
  return (
    <>
      <div className="mb-5 mt-5 font-weight-light" style={{ fontSize: '2em' }}>
        <i className="bi bi-check-circle text-success"></i> Email address
        confirmed!
      </div>
      <div style={{ fontSize: '1.232em' }}>
        Your account has been successfully confirmed. You can use your account
        to <Link to="/login">login</Link> to SMU Library.
      </div>
    </>
  );
}
