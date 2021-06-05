/**
 *
 * SectionHeading
 *
 */
import React, { memo } from 'react';

interface Props {
  title: string;
}

export const SectionHeading = memo((props: Props) => {
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 className="h2">{props.title}</h1>
    </div>
  );
});
