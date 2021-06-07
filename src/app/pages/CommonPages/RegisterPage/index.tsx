/**
 *
 * RegisterPage
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import * as React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { RegisterForm } from './RegisterForm';
import { AlertMessage } from './RegisterForm/AlertMessage/AlertMessage';
import {
  selectErrorMessage,
  selectIsError,
  selectIsSuccess,
} from './RegisterForm/slice/selectors';
import { RegisterInfo } from './RegisterInfo';

interface Props {}

export function RegisterPage(props: Props) {
  const errorMessage = useSelector(selectErrorMessage);
  const isError = useSelector(selectIsError);
  const isSuccess = useSelector(selectIsSuccess);

  const successAlert = (
    <AlertMessage
      message={
        <p>
          You have been successfully registered. An link has been sent to your
          email for verification.
        </p>
      }
      condition={isSuccess}
      variant="success"
    />
  );

  const errorAlert = (
    <AlertMessage
      message={<p>{errorMessage}</p>}
      condition={isError}
      variant="danger"
    />
  );

  return (
    <>
      <Header title="My SMU-Library Account" />
      <Container className="text-left wrapper flex-grow-1">
        <RegisterDiv className="d-block mt-5 mb-5 font-weight-light">
          Register
        </RegisterDiv>
        {successAlert}
        {errorAlert}
        <MainDiv className="d-block">
          <Row>
            <Col className="border-left">
              <RegisterForm />
            </Col>
            <Col className="border-left">
              <RegisterInfo />
              <Row className="mt-5">
                <Col>
                  <h4>Already have an account?</h4>
                  <Button as={Link} to="/login" className="btn-primary btn-sm">
                    Log in
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </MainDiv>
      </Container>
      <Footer />
    </>
  );
}

// This is a recurrent div (check login page for instance).
// TODO: Move it to app/components and refactor pages that use it
const RegisterDiv = styled.div`
  font-size: 2em;
`;

const MainDiv = styled.div`
  font-size: 1.232em;
`;
