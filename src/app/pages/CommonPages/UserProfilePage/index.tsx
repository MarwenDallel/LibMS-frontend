/**
 *
 * UserProfilePage
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import { Role } from 'app/configs/user-roles';
import * as React from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FeatureCard from './FeatureCard';
import { useUserProfileSlice } from './slice';
import {
  selectFirstName,
  selectIsFetching,
  selectLastName,
  selectRole,
} from './slice/selectors';

interface Props {}

export function UserProfilePage(props: Props) {
  const { actions } = useUserProfileSlice();

  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const role = useSelector(selectRole);
  const isFetching = useSelector(selectIsFetching);

  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.requestUserProfile());
  });

  return (
    <>
      <Header title="My SMU-Library Account" />
      <Container className="text-center wrapper flex-grow-1 my-5">
        <div
          className="d-block font-weight-light mb-5"
          style={{ fontSize: '2em' }}
        >
          Welcome{' '}
          {isFetching ? (
            <Spinner animation="grow" />
          ) : (
            firstName + ' ' + lastName
          )}
        </div>
        <Row className="justify-content-center">
          {role === Role.Librarian && (
            <>
              <Col md="auto">
                <FeatureCard
                  icon="speedometer2"
                  title="Dashboard"
                  link="/dashboard"
                />
              </Col>
              <Col md="auto">
                <FeatureCard
                  icon="journal-plus"
                  title="Add Book"
                  link="/add-book"
                />
              </Col>
            </>
          )}
          <Col md="auto">
            <FeatureCard icon="card-list" title="List of Books" link="/books" />
          </Col>
          <Col md="auto">
            <FeatureCard
              icon="calendar2-week"
              title="My Reservations"
              link="/list-reservations"
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
