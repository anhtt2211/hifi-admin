import { AppLayout } from '@/components/layout/index';
import { adminRoutes } from '@/routes/adminRoutes';
import React from 'react';

export default function App() {
  console.log({ adminRoutes });

  return <AppLayout routes={adminRoutes} />;
}
