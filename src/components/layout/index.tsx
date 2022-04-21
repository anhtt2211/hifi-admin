import { menuItems } from '@/constants/menuItems';
import { IRoute } from '@/models/route';
import ProLayout from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

type IProps = {
  routes?: IRoute[];
};

export const AppLayout = ({ routes }: IProps) => {
  const [pathname, setPathname] = useState(window.location.pathname);

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        title="Hifi"
        fixSiderbar
        fixedHeader
        layout="mix"
        contentWidth="Fluid"
        navTheme="dark"
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => (
          <NavLink
            to={`${item.path}`}
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </NavLink>
        )}
        menu={{
          request: async () => {
            await waitTime(1000);
            return menuItems;
          },
        }}
      >
        <Routes>
          {routes?.map((route) => (
            <Route key={route.path} path={route.path} element={route.page} />
          ))}
        </Routes>
      </ProLayout>
    </div>
  );
};
