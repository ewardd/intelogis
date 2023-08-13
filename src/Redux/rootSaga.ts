import requestListSaga from '../features/routes/routesSaga';
import routerSaga from '../features/polyline/polylineSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([routerSaga(), requestListSaga()]);
}
