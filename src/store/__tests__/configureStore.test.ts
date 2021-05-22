import { configureAppStore } from '../configureStore';

describe('configureStore', () => {
  it('should return a store with injected enhancers', () => {
    const store = configureAppStore();
    expect(store).toEqual(
      expect.objectContaining({
        runSaga: expect.any(Function),
        injectedReducers: expect.any(Object),
        injectedSagas: expect.any(Object),
      }),
    );
  });

  it('should return store with initial reducers', () => {
    const store = configureAppStore();
    expect(store.getState()).toMatchObject({
      memberReservations: {
        hasFetched: false,
        isFailed: false,
        isFetching: false,
        isSuccess: false,
        message: '',
        reservations: [],
      },
    });
  });
});
