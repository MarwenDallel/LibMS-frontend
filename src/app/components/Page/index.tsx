import React from 'react';
import styled from 'styled-components/macro';

const Page: React.FunctionComponent<{}> = ({ children }) => (
  <Main className="d-flex flex-column min-vh-100">{children}</Main>
);

const Main = styled.div`
  position: relative;
  min-height: 100%;
`;

export default Page;
