import { menuItems } from '@/constants/menuItems';
import { IRoute } from '@/models/route';
import ProLayout from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

type IProps = {
  routes?: IRoute[];
};

export const GuestLayout = ({ routes }: IProps) => {
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
      <Switch>
        {routes?.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.page}
          />
        ))}
      </Switch>
    </div>
  );
};
