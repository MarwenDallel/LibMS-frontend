import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureAppStore } from 'store/configureStore';
import { BooksPage } from '..';

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

describe('<BooksPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = renderWithRouter(<BooksPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
