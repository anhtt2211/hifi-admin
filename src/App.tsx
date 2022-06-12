import { AppLayout } from '@/components/layout/index';
import { adminRoutes } from '@/routes/adminRoutes';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GuestLayout } from './components/guest-layout';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { guestRoutes } from '@/routes/guestRoutes';
import { $auth, fetchAuthRequest } from './redux/slices/authSlices';

export default function App() {
  const authState = useAppSelector($auth);
  const [layout, setLayout] = useState(
    <Route element={<GuestLayout />}>
      {guestRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.page} />
      ))}
    </Route>,
  );
  var accessToken = localStorage.getItem('accessToken');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authState.auth || accessToken) {
      setLayout(
        <Route element={<AppLayout />}>
          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.page} />
          ))}
        </Route>,
      );
    } else {
      setLayout(
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Navigate replace to="/login" />} />
          {guestRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.page} />
          ))}
        </Route>,
      );
    }
  }, [authState]);

  useEffect(() => {
    dispatch(fetchAuthRequest());
  }, []);

  return <Routes>{layout}</Routes>;
}
