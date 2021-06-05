import { SectionHeading } from 'app/components/SectionHeading';
import React from 'react';
import { BooksList } from './BooksList';

export function BooksPage() {
  return (
    <>
      <SectionHeading title="Library"></SectionHeading>
      <BooksList />
    </>
  );
}
