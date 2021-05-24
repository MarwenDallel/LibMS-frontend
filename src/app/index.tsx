/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { Role } from './configs/user-roles';
import { AuthenticatedRoute, UnauthenticatedRoute } from './guards/Routes';
import { AuthPage } from './pages/CommonPages/AuthPage/Loadable';
import { BookPage } from './pages/CommonPages/BookPage';
import { BooksPage } from './pages/CommonPages/BooksPage/Loadable';
import { HomePage } from './pages/CommonPages/HomePage/Loadable';
import { LoginPage } from './pages/CommonPages/LoginPage/Loadable';
import { LogoutPage } from './pages/CommonPages/LogoutPage/Loadable';
import { RegisterPage } from './pages/CommonPages/RegisterPage/Loadable';
import { UserProfilePage } from './pages/CommonPages/UserProfilePage/Loadable';
import { AddBookPage } from './pages/LibrarianPages/AddBookPage/Loadable';
import { DashboardPage } from './pages/LibrarianPages/DashboardPage/Loadable';

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - SMU Library"
        defaultTitle="SMU Library"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Web Platform for SMU Library" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        />
      </Helmet>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <UnauthenticatedRoute exact path="/auth" component={AuthPage} />
        <UnauthenticatedRoute exact path="/login" component={LoginPage} />
        <UnauthenticatedRoute exact path="/register" component={RegisterPage} />

        <AuthenticatedRoute
          exact
          path="/logout"
          component={LogoutPage}
          roles={[Role.Librarian, Role.Member]}
        />
        <AuthenticatedRoute
          exact
          path="/user"
          component={UserProfilePage}
          roles={[Role.Librarian, Role.Member]}
        />
        <AuthenticatedRoute
          exact
          path="/books/:id"
          component={BookPage}
          roles={[Role.Librarian, Role.Member]}
        />
        <AuthenticatedRoute
          path="/books"
          component={BooksPage}
          roles={[Role.Librarian, Role.Member]}
        />
        <AuthenticatedRoute
          exact
          path="/add-book"
          component={AddBookPage}
          roles={[Role.Librarian]}
        />
        <AuthenticatedRoute
          path="/dashboard"
          component={DashboardPage}
          roles={[Role.Librarian]}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle></GlobalStyle>
    </BrowserRouter>
  );
}

/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }
`;
