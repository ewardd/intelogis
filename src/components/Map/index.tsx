import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MapAutoCenter } from './AutoCenter';
import { MapRoute } from './Route';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { polylineActions, polylineSelector } from '../../features/polyline/polylineSlice';
import { selectedRouteSelector } from '../../features/routes/routesSlice';

export const Map: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedRoute = useAppSelector(selectedRouteSelector);
  const polyline = useAppSelector(polylineSelector);

  useEffect(() => {
    dispatch(polylineActions.fetchPolyline(selectedRoute?.path ?? null));
  }, [dispatch, selectedRoute]);

  return (
    <MapContainer className={styles.map} center={[59.9386, 30.3141]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapAutoCenter path={selectedRoute?.path ?? null} />

      <MapRoute path={selectedRoute?.path} polyline={polyline} />
    </MapContainer>
  );
};
