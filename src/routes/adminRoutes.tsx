import { IRoute } from '@/models/route';
import { Welcome } from '@/pages';
import Category from '@/pages/category';
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
  {
    path: '/categories',
    page: <Category />,
  },
  {
    path: '/categories/:id',
    page: <Category />,
  },
];
