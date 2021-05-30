import { LoadingSpinner } from 'app/components/LoadingPage';
import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';
import { USER_ENDPOINTS } from 'app/configs/endpoints';
import { User } from 'app/pages/CommonPages/UserProfilePage/slice/types';
import { getToken } from 'app/services/auth/tokens.service';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import request from 'utils/request';

const getProfile = async () => {
  request.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
  return request.get(USER_ENDPOINTS.profile);
};

const isAuthenticated = async () => {
  try {
    const response: AxiosResponse<User> = await getProfile();
    return response;
  } catch (error) {
    return false;
  }
};

const AuthenticatedRoute = ({ component: Component, roles, ...rest }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [allowed, setAllowed] = useState<boolean | null>(null);

  const handleResponse = response => {
    setTimeout(() => {
      if (response) {
        setAuthenticated(true);
        if (response.role && roles.includes(response.role)) setAllowed(true);
        else setAllowed(false);
      } else {
        setAuthenticated(false);
        setAllowed(false);
      }
    }, 100);
  };

  useEffect(() => {
    if (getToken()) {
      isAuthenticated().then(response => handleResponse(response));
    } else {
      setAuthenticated(false);
      setAllowed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Route
      {...rest}
      render={props => {
        if (authenticated === null || allowed === null)
          return <LoadingSpinner />;
        if (!authenticated) return <Redirect to="/login" />;
        if (!allowed) return <NotFoundPage />;
        return <Component {...props} />;
      }}
    />
  );
};

const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    if (getToken()) {
      isAuthenticated().then(response =>
        setTimeout(() => {
          setAuthenticated(!!response);
        }, 100),
      );
    } else {
      setAuthenticated(false);
    }
  }, []);
  return (
    <Route
      {...rest}
      render={props => {
        if (authenticated === null) return <LoadingSpinner />;
        if (!authenticated) return <Component {...props} />;
        return <Redirect to="/user" />;
      }}
    />
  );
};

export { AuthenticatedRoute, UnauthenticatedRoute };
