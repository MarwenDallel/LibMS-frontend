import React from 'react';
import styled from 'styled-components/macro';

const Page: React.FunctionComponent<{}> = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">
    <Main>{children}</Main>
  </div>
);

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #f6f8fb;
`;

export default Page;
