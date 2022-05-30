export const menuItems = {
  routes: [
    {
      path: '/',
      name: 'Welcome',
    },
    {
      path: '/users',
      name: 'Users',
    },
    {
      path: '/categories',
      name: 'Category',
    },
    {
      path: '/posts',
      name: 'Posts',
      exact: true,
    },
    {
      name: 'Recruiters',
      path: '/recruiters',
      exact: true,
    },
    {
      name: 'Chatting',
      path: '/chatting',
      exact: true,
    },
  ],
};
