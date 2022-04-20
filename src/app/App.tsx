import { AppLayout } from '@/components/layout/index';
import { adminRoutes } from '@/routes/adminRoutes';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import React from 'react';

export default function App() {
  return (
    <ConfigProvider locale={enUS}>
      <AppLayout routes={adminRoutes} />
    </ConfigProvider>
  );
}
