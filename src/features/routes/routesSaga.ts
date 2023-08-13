import { call, put, takeLatest } from 'redux-saga/effects';
import { getRouteList } from '../../api/getRouteList';
import { routesActions } from './routesSlice';

function* onRouteListFetch() {
  try {
    const routeList: Awaited<ReturnType<typeof getRouteList>> = yield call(getRouteList);

    yield put(routesActions.fetchRoutesSuccess(routeList));
  } catch (e) {
    console.error(e);

    yield put(routesActions.fetchRoutesFailed());
  }
}

export default function* requestListSaga() {
  yield takeLatest(routesActions.fetchRoutes.type, onRouteListFetch);
}
