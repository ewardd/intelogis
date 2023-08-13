import { Layout } from 'antd';
import React from 'react';

interface ILayoutInterface {
  children: React.ReactNode;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
}

export const BaseLayout: React.FC<ILayoutInterface> = (props) => {
  const { children, headerSlot, footerSlot } = props;

  return (
    <Layout className={'common-bg flex h-screen min-w-full'}>
      <Layout className={'common-bg'}>
        {headerSlot}

        <Layout.Content className={'p-4'}>{children}</Layout.Content>

        {footerSlot}
      </Layout>
    </Layout>
  );
};
