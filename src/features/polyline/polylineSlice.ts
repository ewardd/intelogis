import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../types/redux';
import { IPath } from '../../types/common';

interface IPolylineSlice {
  loading: boolean;
  loadingError: boolean;
  data: any;
}

const initialState: IPolylineSlice = {
  loading: false,
  loadingError: false,
  data: null,
};

const polylineSlice = createSlice({
  initialState,
  name: 'polyline',
  reducers: {
    fetchPolyline(state, _: PayloadAction<IPath | null>) {
      state.loading = true;
      state.loadingError = false;
      state.data = null;
    },
    fetchPolylineSuccess(state, action) {
      state.loading = false;
      state.loadingError = false;
      state.data = action.payload;
    },
    fetchPolylineFailed(state) {
      state.loading = false;
      state.loadingError = true;
      state.data = null;
    },
  },
});

export const polylineActions = polylineSlice.actions;

export const polylineLoadingSelector = (state: RootState) => state.polyline.loading;
export const polylineLoadingErrorSelector = (state: RootState) => state.polyline.loadingError;
export const polylineSelector = (state: RootState) => state.polyline.data;

export const polylineReducer = polylineSlice.reducer;
