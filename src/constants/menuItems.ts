import { Recruiters } from '@/pages/recruiters';

export const menuItems = [
  {
    path: '/',
    name: 'Welcome',
  },
  {
    path: '/users',
    name: 'Users',
  },
  {
    name: 'Recruiters',
    path: '/recruiters',
    exact: true,
  },
];
