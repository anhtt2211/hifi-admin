import { menuItems } from '@/constants/menuItems';
import { IRoute } from '@/models/route';
import ProLayout from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { NavLink, Route, Outlet } from 'react-router-dom';

type IProps = {
  routes?: IRoute[];
};

export const GuestLayout = ({ routes }: IProps) => {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <Outlet></Outlet>
    </div>
  );
};
