import { Reducer } from '@reduxjs/toolkit';
import { createReducer } from '../reducers';

describe('reducer', () => {
  it('should inject reducers', () => {
    const dummyReducer = (s = {}, a) => 'dummyResult';
    const reducer = createReducer({ test: dummyReducer } as any) as Reducer<
      any,
      any
    >;
    const state = reducer({}, '');
    expect(state.test).toBe('dummyResult');
  });

  // Removed because reducers initially are not longer empty
  // it('should return list of reducers', () => {
  //   const reducer = createReducer() as Reducer<any, any>;
  //   const state = { a: 1 };
  //   const newState = reducer(state, '');
  //   expect(newState).toMatchObject(state);
  // });
});
