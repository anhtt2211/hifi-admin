import {
  HiChat,
  HiCog,
  HiCollection,
  HiTable,
  HiTag,
  HiUserGroup,
} from 'react-icons/hi';

export const menuItems = {
  routes: [
    {
      path: '/posts',
      name: 'Posts',
      exact: true,
      icon: (
        <span role="img" className="anticon">
          <HiCollection size={18} />
        </span>
      ),
    },
    {
      name: 'Recruiters',
      path: '/recruiters',
      exact: true,
      icon: (
        <span role="img" className="anticon">
          <HiUserGroup size={18} />
        </span>
      ),
    },
    {
      path: '/categories',
      name: 'Category',
      icon: (
        <span role="img" className="anticon">
          <HiTable size={18} />
        </span>
      ),
    },
    {
      name: 'Skill tags',
      path: '/skill-tags',
      exact: true,
      icon: (
        <span role="img" className="anticon">
          <HiTag size={18} />
        </span>
      ),
    },
    {
      name: 'Chatting',
      path: '/chatting',
      exact: true,
      icon: (
        <span role="img" className="anticon">
          <HiChat size={18} />
        </span>
      ),
    },
    {
      name: 'Profile',
      path: '/profile',
      exact: true,
      icon: (
        <span role="img" className="anticon">
          <HiCog size={18} />
        </span>
      ),
    },
  ],
};
