import { AppLayout } from '@/components/layout/index';
import { adminRoutes } from '@/routes/adminRoutes';
import React from 'react';

export default function App() {
  return <AppLayout routes={adminRoutes} />;
}
