import { call, put, takeLatest } from 'redux-saga/effects';
import { getPolyline } from '../../api/getPolyline';
import { PayloadAction } from '@reduxjs/toolkit';
import { polylineActions } from './polylineSlice';
import { ICoordinates, IPath } from '../../types/common';

function* onPolylineFetch({ payload }: PayloadAction<IPath | null>) {
  if (payload === null) return put(polylineActions.fetchPolylineSuccess(null));

  try {
    const { routes }: Awaited<ReturnType<typeof getPolyline>> = yield call(getPolyline, payload);

    const path =
      (routes?.[0].geometry.coordinates.map<ICoordinates>(
        (coordinates) => coordinates.slice().reverse() as ICoordinates,
      ) as IPath) ?? null;

    yield put(polylineActions.fetchPolylineSuccess(path));
  } catch (e) {
    console.error(e);

    yield put(polylineActions.fetchPolylineFailed());
  }
}

export default function* polylineSaga() {
  yield takeLatest(polylineActions.fetchPolyline.type, onPolylineFetch);
}
