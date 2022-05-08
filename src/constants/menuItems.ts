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
    path: '/posts',
    name: 'Posts',
    exact: true
  },
  {
    name: 'Recruiters',
    path: '/recruiters',
    exact: true,
  },
];
