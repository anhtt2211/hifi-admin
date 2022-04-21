import { IRoute } from '@/models/route';
import { Welcome } from '@/pages';
import Categories from '@/pages/categories';
import CategoryDetails from '@/pages/categories/subcategories';
import { Recruiters } from '@/pages/recruiters';
import { UserPage } from '@/pages/users/index';

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
  {
    path: '/recruiters',
    exact: true,
    page: <Recruiters />,
  },
];
