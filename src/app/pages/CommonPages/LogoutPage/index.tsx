import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useLogoutSlice } from './slice';

interface Props {}

export function LogoutPage(props: Props) {
  const { actions } = useLogoutSlice();
  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.requestLogout());
  });

  return <Redirect to="/" />;
}
