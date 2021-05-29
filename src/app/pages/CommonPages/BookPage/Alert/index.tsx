import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

interface Props {
  text: string;
  renderCondition: boolean;
  variant: string;
  payload?: any;
}

export default function RequestAlert(props: Props) {
  const [showAlert, setShowAlert] = React.useState(true);
  const dispatch = useDispatch();

  if (showAlert && props.renderCondition) {
    return (
      <Alert
        variant={props.variant}
        onClose={() => {
          setShowAlert(state => !state);
          dispatch(props.payload); // I need to restore this in the store otherwise, when you go back to the component, the alert will be displayed
        }}
        dismissible
      >
        {props.text}
      </Alert>
    );
  }
  return null;
}
