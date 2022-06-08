import { PostDetails } from '@/components/post/PostDetails';
import { IRoute } from '@/models/route';
import Welcome from '@/pages';
import Categories from '@/pages/categories';
import CategoryDetails from '@/pages/categories/subcategories';
import Chatting from '@/pages/Chatting';
import NotFound from '@/pages/not-found';
import { PostPage } from '@/pages/posts';
import Recruiters from '@/pages/recruiters';
import SkillTagPage from '@/pages/skill-tags';
import { UserPage } from '@/pages/users/index';
import Profile from '@/pages/profile';

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
    path: '/posts',
    exact: true,
    page: <PostPage />,
  },
  {
    path: '/posts/:id',
    exact: true,
    page: <PostDetails />,
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
    path: '/skill-tags',
    exact: true,
    page: <SkillTagPage />,
  },
  {
    path: '/chatting',
    exact: true,
    page: <Chatting />,
  },
  {
    path: '/profile',
    exact: true,
    page: <Profile />,
  },
  {
    path: '*',
    exact: true,
    page: <NotFound />,
  },
];
