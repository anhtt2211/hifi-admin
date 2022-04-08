import { IRoute } from '@/models/route';
import { Welcome } from '@/pages';
import Categories from '@/pages/categories';
import CategoryDetails from '@/pages/categories/[id]';
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
    page: <Categories />,
  },
  {
    path: '/categories/edit/:id',
    page: <Categories />,
  },
  {
    path: '/categories/:id',
    page: <CategoryDetails />,
  },
];
