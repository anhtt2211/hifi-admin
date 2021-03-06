import React, { FC, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import notificationSocket from '@/utils/notificationSocket';
import { Typography } from 'antd';
import { useAppSelector } from '@/redux/hooks';
import { $auth } from '@/redux/slices/authSlices';
import { Notification } from '@/types';

interface IProp {}

const Notifications: FC<IProp> = (props) => {
  const user = useAppSelector($auth).auth;
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div
      style={{
        width: 300,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: 500,
      }}
    >
      <Typography.Title style={{ fontSize: '20px' }}>
        Notifications
      </Typography.Title>
      {user?.data?.notifications
        .slice(0)
        .reverse()
        .map((notification: Notification) => {
          return (
            <NotificationItem
              key={notification?._id}
              notification={notification}
            />
          );
        })}
    </div>
  );
};

export default Notifications;
