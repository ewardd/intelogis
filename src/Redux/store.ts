import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { routesReducer } from '../features/routes/routesSlice';
import { polylineReducer } from '../features/polyline/polylineSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  polyline: polylineReducer,
  routes: routesReducer,
});

export const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
