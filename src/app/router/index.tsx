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
import { requireRole } from './guards';
import history from './history';

interface Props {
  children(content: React.ReactElement): React.ReactElement;
}

const Router: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <BrowserRouter history={history}>
      <GuardProvider
        guards={[requireRole]}
        loading={LoadingSpinner}
        error={NotFoundPage}
      >
        {children(
          <Switch>
            <GuardedRoute exact path="/" component={HomePage} />
            <GuardedRoute exact path="/auth" component={AuthPage} />
            <GuardedRoute exact path="/login" component={LoginPage} />
            <GuardedRoute exact path="/register" component={RegisterPage} />

            <GuardedRoute
              exact
              path="/logout"
              component={LogoutPage}
              meta={{ roles: [Role.Librarian, Role.Member] }}
            />
            <GuardedRoute
              exact
              path="/user"
              component={UserProfilePage}
              meta={{ roles: [Role.Librarian, Role.Member] }}
            />
            <GuardedRoute
              exact
              path="/books/:id"
              component={BookPage}
              meta={{ roles: [Role.Librarian, Role.Member] }}
            />
            <GuardedRoute
              path="/books"
              component={BooksPage}
              meta={{ roles: [Role.Librarian, Role.Member] }}
            />
            <GuardedRoute
              exact
              path="/add-book"
              component={AddBookPage}
              meta={{ roles: [Role.Librarian] }}
            />
            <GuardedRoute
              path="/dashboard"
              component={DashboardPage}
              meta={{ roles: [Role.Librarian] }}
            />
            <GuardedRoute path="*" component={NotFoundPage} />
          </Switch>,
        )}
      </GuardProvider>
    </BrowserRouter>
  );
};

export default Router;
