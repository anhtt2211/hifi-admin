import Minichat from '@/components/Chatting/Minichat';
import { GuestLayout } from '@/components/guest-layout';
import { AppLayout } from '@/components/layout/index';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { $auth, fetchAuthRequest } from '@/redux/slices/authSlices';
import { adminRoutes } from '@/routes/adminRoutes';
import { guestRoutes } from '@/routes/guestRoutes';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import React, { FC, useEffect, useState } from 'react';

export default function App() {
  const authState = useAppSelector($auth);
  const [layout, setLayout] = useState(<GuestLayout routes={guestRoutes} />);
  var accessToken = localStorage.getItem('accessToken');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authState.auth || accessToken) {
      setLayout(<AppLayout routes={adminRoutes} />);
    } else {
      setLayout(<GuestLayout routes={guestRoutes} />);
    }
  }, [authState]);

  useEffect(() => {
    dispatch(fetchAuthRequest());
  }, []);

  return <ConfigProvider locale={enUS}>{layout}</ConfigProvider>;
}
