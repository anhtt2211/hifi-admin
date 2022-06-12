import { menuItems } from '@/constants/menuItems';
import ProLayout from '@ant-design/pro-layout';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Link, NavLink, Outlet } from 'react-router-dom';
import RightContent from './right-content';
import logoImage from '@/assets/images/Logo1.png';

export const AppLayout = () => {
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        title="Hifi admin"
        fixSiderbar
        logo={logoImage}
        fixedHeader
        layout="mix"
        contentWidth="Fluid"
        navTheme="dark"
        location={{
          pathname,
        }}
        primaryColor="#6D5CE8"
        route={menuItems}
        headerTitleRender={(logo: any, title: any) => (
          <Link to="/" onClick={() => setPathname('/')}>
            {logo}
            {title}
          </Link>
        )}
        rightContentRender={() => <RightContent />}
        menuItemRender={(item: any, dom: any) => (
          <NavLink
            to={`${item.path}`}
            onClick={() => {
              setPathname(item.path || '/');
            }}
          >
            {dom}
          </NavLink>
        )}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};
