import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';
import { Role } from 'app/configs/user-roles';
import { AuthPage } from 'app/pages/CommonPages/AuthPage/Loadable';
import { BookPage } from 'app/pages/CommonPages/BookPage';
import { BooksPage } from 'app/pages/CommonPages/BooksPage';
import { HomePage } from 'app/pages/CommonPages/HomePage/Loadable';
import { LoginPage } from 'app/pages/CommonPages/LoginPage/Loadable';
import { LogoutPage } from 'app/pages/CommonPages/LogoutPage';
import { RegisterPage } from 'app/pages/CommonPages/RegisterPage/Loadable';
import { UserProfilePage } from 'app/pages/CommonPages/UserProfilePage';
import { AddBookPage } from 'app/pages/LibrarianPages/AddBookPage';
import { DashboardPage } from 'app/pages/LibrarianPages/DashboardPage';
import React from 'react';
import { Router as BrowserRouter, Switch } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import { LoadingSpinner } from '../components/LoadingPage/index';
import history from './history';
import { AuthenticatedRoute, UnauthenticatedRoute } from './Routes';

interface Props {
  children(content: React.ReactElement): React.ReactElement;
}

const Router: React.FunctionComponent<Props> = ({ children }) => (
  <BrowserRouter history={history}>
    <GuardProvider loading={LoadingSpinner} error={NotFoundPage}>
      {children(
        <Switch>
          <UnauthenticatedRoute exact path="/" component={HomePage} />
          <UnauthenticatedRoute exact path="/auth" component={AuthPage} />
          <UnauthenticatedRoute exact path="/login" component={LoginPage} />
          <UnauthenticatedRoute
            exact
            path="/register"
            component={RegisterPage}
          />

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

          <GuardedRoute path="*" component={NotFoundPage} />
        </Switch>,
      )}
    </GuardProvider>
  </BrowserRouter>
);

export default Router;
