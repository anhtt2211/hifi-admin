import { IRoute } from '@/models/route';
import { Welcome } from '@/pages';
import { UserPage } from '@/pages/users/index';
import React from 'react';

export const adminRoutes: IRoute[] = [
  {
    path: '/',
    page: <Welcome />,
  },
  {
    path: '/users',
    page: <UserPage />,
  },
];
