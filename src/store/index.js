import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
const devMode = process.env.NODE_ENV === 'development';
if (devMode) {
  middleware.push(logger);
}

export default () => {
  const store = configureStore({
    reducer,
    devTools: devMode,
    middleware,
  });
  sagaMiddleware.run(sagas);
  return store;
};
