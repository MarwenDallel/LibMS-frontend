import * as React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  message: JSX.Element;
  variant: string;
  condition: boolean;
}

export function AlertMessage(props: Props) {
  const [showAlert, setShowAlert] = React.useState(true);
  if (props.condition && showAlert) {
    return (
      <Alert
        variant={props.variant}
        onClose={() => setShowAlert(false)}
        dismissible
        className="w-50"
      >
        {props.message}
      </Alert>
    );
  }
  return null;
}
