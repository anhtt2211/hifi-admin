import { AppLayout } from '@/components/layout/index';
import { adminRoutes } from '@/routes/adminRoutes';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.page} />
        ))}
      </Route>
    </Routes>
  );
}

{
  /* <AppLayout routes={adminRoutes} />; */
}
