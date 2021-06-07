/**
 *
 * EmailConfirmation
 *
 */
import { Footer } from 'app/components/Footer';
import { Header } from 'app/components/Header';
import * as React from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FailedEmailConfirmation } from './FailedEmailConfirmation';
import { useEmailConfirmationSlice } from './slice';
import { selectFailureMessage, selectIsSuccess } from './slice/selectors';
import { SuccessEmailConfirmation } from './SuccessEmailConfirmation';

interface Props {}

export function EmailConfirmation(props: Props) {
  let { token } = useParams<{ token: string }>();
  const dispatch = useDispatch();
  const { actions } = useEmailConfirmationSlice();

  const isSuccess = useSelector(selectIsSuccess);
  const failureMessage = useSelector(selectFailureMessage);

  const componentToDisplay = !isSuccess ? (
    <FailedEmailConfirmation message={failureMessage} />
  ) : (
    <SuccessEmailConfirmation />
  );

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.sendVerificationRequest(token));
  });

  return (
    <>
      <Header title="My SMU-Library Account" />
      <Container className="text-left wrapper flex-grow-1">
        {componentToDisplay}
      </Container>
      <Footer />
    </>
  );
}
