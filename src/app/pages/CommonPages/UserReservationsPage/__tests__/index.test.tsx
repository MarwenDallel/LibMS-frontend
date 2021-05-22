import * as React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureAppStore } from 'store/configureStore';
import { UserReservationsPage } from '..';

const store = configureAppStore();

const renderWithRouter = (component: JSX.Element) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>{' '}
      </Provider>,
    ),
  };
};

describe('<UserReservationsPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = renderWithRouter(<UserReservationsPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
