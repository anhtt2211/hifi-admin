import { IRoute } from '@/models/route';
import Login from '@/pages/login';
import ForgotPassword from '@/pages/login/forgot-pasword';
import UnAuthorzied from '@/pages/unauthorized';

export const guestRoutes: IRoute[] = [
  {
    path: '/login',
    exact: true,
    page: <Login />,
  },
  {
    path: '/forgot-password',
    exact: true,
    page: <ForgotPassword />,
  },
  {
    path: '*',
    exact: true,
    page: <UnAuthorzied />,
  },
];
