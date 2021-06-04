import React from 'react';
import { Badge, Container, Dropdown, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Sidebar } from '../../../components/Sidebar/index';
import { BookDescPage } from '../BookDescPage';
import { BooksPage } from '../BooksPage/Loadable';
import { ReservationsPage } from '../ReservationsPage';

export function DashboardPage() {
  return (
    <Router>
      <Container fluid>
        <div className="row min-vh-100">
          <Sidebar />
          <main role="main" className="col-md-9 col-lg-10 md-sm-auto">
            <div className="d-flex justify-content-between mb-3">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search books, categories"
                />
              </Form.Group>
              <div className="d-flex flex-row-reverse">
                <Dropdown>
                  <Dropdown.Toggle variant={'disabled'} id="dropdown-profile">
                    Bechir Jamoussi
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
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
            <div>
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
            </div>
          </main>
        </div>
      </Container>
    </Router>
  );
}
