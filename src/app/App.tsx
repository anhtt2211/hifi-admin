import React from 'react';
import { User } from '../components/user';
import { AppLayout } from './layout';

export default function App() {
  return <AppLayout chilren={<User />} />;
}
