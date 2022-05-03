import React, { FC, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import notificationSocket from '@/utils/notificationSocket';
import { Typography } from 'antd';
import { useAppSelector } from '@/redux/hooks';
import { $users } from '@/redux/slices/userSlices';

interface IProp {}

const Notifications: FC<IProp> = (props) => {
  const user = useAppSelector($users);

  return (
    <div style={{ width: 300 }}>
      <Typography.Title style={{ fontSize: '20px' }}>
        Notifications
      </Typography.Title>
      {user?.notifications
        .slice(0)
        .reverse()
        .map((notification) => {
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
