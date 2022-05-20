import { menuItems } from '@/constants/menuItems';
import ProLayout from '@ant-design/pro-layout';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

export const AppLayout = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        title="Hifi admin"
        fixSiderbar
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
        menuItemRender={(item: any, dom: any) => (
          <NavLink
            to={`${item.path}`}
            onClick={() => {
              setPathname(item.path || '/welcome');
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
