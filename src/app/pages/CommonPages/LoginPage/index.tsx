/**
 *
 * LoginPage
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { SecurityNotice } from './SecurityNotice';

interface Props {}

export function LoginPage(props: Props) {
  return (
    <>
      <Header title="My SMU-Library Account" navItems={[]} account={false} />
      <Container className="text-left wrapper flex-grow-1">
        <div
          className="d-block mt-5 mb-5 font-weight-light"
          style={{ fontSize: '2em' }}
        >
          Login
        </div>
        <div className="d-block" style={{ fontSize: '1.232em' }}>
          <Row>
            <Col className="border-left">
              <LoginForm />
            </Col>
            <Col className="border-left">
              <SecurityNotice />
              <Row className="mt-5">
                <Col>
                  <h4>Don't have an account?</h4>
                  <Link to="/register">
                    <button type="button" className="btn btn-primary btn-sm">
                      Register
                    </button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  );
}
