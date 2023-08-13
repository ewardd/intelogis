import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../types/redux';
import { IApiRouteList } from '../../types/api/route';

interface IRoutesSlice {
  loading: boolean;
  loadingError: boolean;
  data: IApiRouteList;
  selectedRouteId: IApiRouteList[number]['id'] | null;
}

const initialState: IRoutesSlice = {
  loading: true,
  loadingError: false,
  data: [],
  selectedRouteId: null,
};

const routesSlice = createSlice({
  name: 'routeList',
  initialState,
  reducers: {
    fetchRoutes(state: typeof initialState) {
      state.data = [];
      state.selectedRouteId = null;
      state.loading = true;
      state.loadingError = false;
    },
    fetchRoutesSuccess(state: typeof initialState, action: PayloadAction<IApiRouteList>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchRoutesFailed(state: typeof initialState) {
      state.loading = false;
      state.loadingError = true;
    },
    selectRoute: (state, { payload }: PayloadAction<number>) => {
      if (payload === state.selectedRouteId) state.selectedRouteId = null;
      else state.selectedRouteId = payload;
    },
  },
});

export const routesActions = routesSlice.actions;

export const routesLoadingSelector = (state: RootState) => state.routes.loading;
export const routesLoadingErrorSelector = (state: RootState) => state.routes.loadingError;
export const routesSelector = (state: RootState) => state.routes.data;
export const selectedRouteIdSelector = (state: RootState) => state.routes.selectedRouteId;

export const selectedRouteSelector = (state: RootState) =>
  state.routes.data.find(({ id }) => id === state.routes.selectedRouteId);

export const routesReducer = routesSlice.reducer;
