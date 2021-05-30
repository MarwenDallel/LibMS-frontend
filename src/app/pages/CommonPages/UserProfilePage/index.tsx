/**
 *
 * UserProfilePage
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import { Role } from 'app/configs/user-roles';
import * as React from 'react';
import { ButtonGroup, Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
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
      <Header title="My SMU-Library Account" navItems={[]} account={false} />
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
        <ButtonContainer>
          <ButtonGroup
            className="d-flex justify-content-center"
            size="lg"
            vertical
          >
            {role === Role.Librarian && (
              <>
                <Link
                  className="btn btn-warning w-100 btn-block"
                  role="button"
                  to="/dashboard/books"
                >
                  Continue to Dashboard
                </Link>
                <Link
                  className="btn btn-success w-100 btn-block"
                  role="button"
                  to="/add-book"
                >
                  Add a Book
                </Link>
              </>
            )}
            <Link
              className="btn btn-primary w-100 btn-block"
              role="button"
              to="/books"
            >
              List of Books
            </Link>
          </ButtonGroup>
        </ButtonContainer>
      </Container>
      <Footer />
    </>
  );
}

const ButtonContainer = styled(Container)`
  @media (min-width: 768px) {
    max-width: 40rem !important;
  }
`;
