import * as React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

interface Props {
  onClick?: React.MouseEventHandler<HTMLElement>;
  variant: string;
  text: string;
  toolTipMessage?: string;
  disbaled?: boolean;
}

function RequestButton(props: Props) {
  return (
    <Button variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

function RequestButtonWithToolTip(props: Props) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id="tooltip-disabled">{props.toolTipMessage}</Tooltip>}
    >
      <span className="d-inline-block">
        <Button
          variant={props.variant}
          disabled
          style={{ pointerEvents: 'none' }}
        >
          {props.text}
        </Button>
      </span>
    </OverlayTrigger>
  );
}

export { RequestButton, RequestButtonWithToolTip };
