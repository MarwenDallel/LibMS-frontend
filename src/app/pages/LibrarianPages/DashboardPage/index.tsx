import { selectUserProfile } from 'app/pages/CommonPages/UserProfilePage/slice/selectors';
import React from 'react';
import { Badge, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Sidebar } from '../../../components/Sidebar/index';
import { BookDescPage } from '../BookDescPage';
import { BooksPage } from '../BooksPage/Loadable';
import { ReservationsPage } from '../ReservationsPage';

export function DashboardPage() {
  const user = useSelector(selectUserProfile);

  return (
    <Router>
      <Container fluid>
        <Row>
          <Col
            md={3}
            lg={2}
            className="d-none pt-4 d-md-block sidebar p-0"
            style={{ backgroundColor: 'white' }}
          >
            <Sidebar />
          </Col>
          <Col md={9} lg={10} className="md-sm-auto pt-5 mb-4">
            <div className="d-flex justify-content-between mx-3 mb-4">
              <Form.Group className="m-0">
                <Form.Control
                  type="text"
                  placeholder="Search books, categories"
                />
              </Form.Group>
              <div className="d-flex flex-row-reverse">
                <Dropdown>
                  <Dropdown.Toggle variant={'disabled'} id="dropdown-profile">
                    {user.firstName + ' ' + user.lastName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/user">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/logout">Sign out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    variant={'disabled'}
                    id="dropdown-notification"
                  >
                    <i className="bi bi-bell-fill"></i>
                    <Badge variant="danger">1</Badge>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Reservation expires in 2 days</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <Container fluid>
              <Switch>
                <Route
                  path="/dashboard/books"
                  exact
                  render={() => <BooksPage />}
                />
                <Route
                  path="/dashboard/reservations"
                  exact
                  render={() => <ReservationsPage />}
                />
                <Route
                  exact
                  path="/dashboard/books/:id"
                  render={() => <BookDescPage />}
                />
              </Switch>
            </Container>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}
