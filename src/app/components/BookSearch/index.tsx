/**
 *
 * BooksPage
 *
 */
import * as React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import styled from 'styled-components/macro';

interface Props {
  size: 'lg' | 'sm';
  className?: string;
}

export function BookSearch({ size, className }: Props) {
  return (
    <>
      <InputGroup size={size} className={`mb-3 ${className}`}>
        <SearchInput
          placeholder="Search books"
          aria-label="Search books"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <SearchButton>Search</SearchButton>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
}

const SearchInput = styled(FormControl)`
  border-color: #007ea4 !important;
`;

const SearchButton = styled(Button)`
  color: #007ea4 !important;
  background-color: #fff !important;
  border-color: #007ea4 !important;

  :hover {
    color: #fff !important;
    background-color: #007ea4 !important;
    border-color: #007ea4 !important;
  }
`;
