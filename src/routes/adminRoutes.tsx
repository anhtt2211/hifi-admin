import { IRoute } from '@/models/route';
import { Welcome } from '@/pages';
import Chatting from '@/pages/Chatting';
import Recruiters from '@/pages/recruiters';
import { UserPage } from '@/pages/users/index';
import React from 'react';

export const adminRoutes: IRoute[] = [
  {
    path: '/',
    exact: true,
    page: Welcome,
  },
  {
    path: '/users',
    exact: true,
    page: UserPage,
  },
  {
    path: '/recruiters',
    exact: true,
    page: Recruiters,
  },
  {
    path: '/chatting',
    exact: true,
    page: Chatting,
  },
];
