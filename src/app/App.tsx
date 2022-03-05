import { User } from '@/components/user';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';

export default function App() {
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  console.log({ users });

  return <User />;
}
