import React, { memo } from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components/macro';
import FooterLogo from './assets/FOOTER-LOGO.png';

interface Props {}

export const Footer = memo((props: Props) => {
  return (
    <CustomFooter className="text-lg-start">
      <Container>
        <img src={FooterLogo} alt="" />
      </Container>
    </CustomFooter>
  );
});

const CustomFooter = styled.footer`
  background-color: #203549;
`;
