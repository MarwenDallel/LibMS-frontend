/**
 *
 * BooksPage
 *
 */
import * as React from 'react';
import { Button, Container, FormControl, InputGroup } from 'react-bootstrap';
import styled from 'styled-components/macro';

interface Props {}

export function BookSearch(props: Props) {
  return (
    <>
      <Container className="w-75">
        <h1>SMU Library</h1>
        <InputGroup className="mt-4" size="lg">
          <SearchInput
            placeholder="Search books"
            aria-label="Search books"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <SearchButton>Search</SearchButton>
          </InputGroup.Append>
        </InputGroup>
      </Container>
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
