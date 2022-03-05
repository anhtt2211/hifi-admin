import { User } from '@/components/user';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createUser } from '@/redux/slices/userSlices';
import React from 'react';
import { useEffect } from 'react';

export default function App() {
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const payload = {
      name: 'The Anh',
      old: 20,
    };
    dispatch(createUser(payload));
  }, []);

  console.log({ users });

  return <User />;
}
