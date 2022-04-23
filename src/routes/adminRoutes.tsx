import PostDetails from '@/components/post/PostDetails';
import { IRoute } from '@/models/route';
import { Welcome } from '@/pages';
import PostPage from '@/pages/posts';
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
    path: '/posts',
    page: <PostPage />,
  },
  {
    path: '/posts/:id',
    page: <PostDetails />,
  },
];
