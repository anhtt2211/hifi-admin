import { IRoute } from '@/models/route';
import Login from '@/pages/login';
import UnAuthorzied from '@/pages/unauthorized';

export const guestRoutes: IRoute[] = [
  {
    path: '/login',
    exact: true,
    page: Login,
  },
  {
    path: '*',
    exact: true,
    page: UnAuthorzied,
  },
];
