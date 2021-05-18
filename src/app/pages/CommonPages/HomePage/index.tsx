import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import * as React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components/macro';

interface Props {}

const items = [
  { name: 'About', link: '/' },
  { name: 'Catalog', link: '/' },
  { name: 'Code', link: '/' },
  { name: 'Contact Us', link: '/' },
];

export function HomePage(props: Props) {
  return (
    <Div className="d-flex flex-column min-vh-100">
      <Header navItems={items} account={false} />
      <Container className="wrapper flex-grow-1" fluid>
        <Col md={6} className="h-25 text-center mx-auto mt-5">
          <Form className="mt-5">
            <Row>
              <Col md={10}>
                <Form.Group controlId="search">
                  <Form.Control type="text" placeholder="Search" />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="success">Search</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Container>
      <Footer />
    </Div>
  );
}

const Div = styled.div`
  background-color: #f6f8fb;
`;
