import { IRoute } from '@/models/route';
import Welcome from '@/pages';
import Categories from '@/pages/categories';
import CategoryDetails from '@/pages/categories/subcategories';
import Chatting from '@/pages/Chatting';
import NotFound from '@/pages/not-found';
import Recruiters from '@/pages/recruiters';
import { UserPage } from '@/pages/users/index';

export const adminRoutes: IRoute[] = [
  {
    path: '/',
    exact: true,
    page: <Welcome />,
  },
  {
    path: '/users',
    exact: true,
    page: <UserPage />,
  },
  {
    path: '/categories',
    exact: true,
    page: <Categories />,
  },
  {
    path: '/categories/edit/:id',
    exact: true,
    page: <Categories />,
  },
  {
    path: '/categories/:id',
    exact: true,
    page: <CategoryDetails />,
  },
  {
    path: '/recruiters',
    exact: true,
    page: <Recruiters />,
  },
  {
    path: '/chatting',
    exact: true,
    page: <Chatting />,
  },
  {
    path: '*',
    exact: true,
    page: <NotFound />,
  },
];
