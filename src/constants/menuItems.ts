export const menuItems = {
  routes: [
    // {
    //   path: '/',
    //   name: 'Welcome',
    // },
    // {
    //   path: '/users',
    //   name: 'Users',
    // },

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
      path: '/categories',
      name: 'Category',
    },
    {
      name: 'Skill tags',
      path: '/skill-tags',
      exact: true,
    },
    {
      name: 'Chatting',
      path: '/chatting',
      exact: true,
    },
  ],
};
