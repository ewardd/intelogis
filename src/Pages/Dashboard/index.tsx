import { Layout, Menu, MenuProps, Result, Skeleton } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { Map } from '../../components/Map';
import { RouteMenuItem } from '../../components/RouteMenuItem';
import {
  routesActions,
  routesLoadingErrorSelector,
  routesLoadingSelector,
  routesSelector,
  selectedRouteIdSelector,
} from '../../features/routes/routesSlice';
import styles from './styles.module.scss';

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(routesSelector);
  const isLoading = useAppSelector(routesLoadingSelector);
  const isError = useAppSelector(routesLoadingErrorSelector);
  const selectedRouteId = useAppSelector(selectedRouteIdSelector);

  const routeList = useMemo<MenuItemType[]>(
    () =>
      data.map((item) => ({
        key: item.id,
        label: <RouteMenuItem item={item} />,
      })),
    [data],
  );

  const onItemSelect: MenuProps['onClick'] = (item) => dispatch(routesActions.selectRoute(+item.key));

  useEffect(() => {
    dispatch(routesActions.fetchRoutes());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {isError ? (
        <Result status={'error'}>Failed to fetch routes</Result>
      ) : (
        <Skeleton className={styles.skeleton} loading={isLoading}>
          <Menu
            items={routeList}
            onClick={onItemSelect}
            selectedKeys={selectedRouteId ? [selectedRouteId.toString()] : []}
          />
        </Skeleton>
      )}

      <Layout.Content>
        <Map />
      </Layout.Content>
    </div>
  );
};
