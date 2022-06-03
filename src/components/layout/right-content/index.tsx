import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { $users } from '@/redux/slices/userSlices';
import notificationSocket from '@/utils/notificationSocket';
import { BellFilled, WechatOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Popover, Row, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import Content from './UserContent';
import Notifications from './Notifications';
import Title from './UserTitle';
import { $auth, setUser } from '@/redux/slices/authSlices';
import { Notification } from '@/types';

const RightContent = () => {
  const avatarUrl = 'https://joeschmoe.io/api/v1/random';
  const auth = useAppSelector($auth).auth;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth) {
      notificationSocket.emit('joinNotification', {
        receiver: auth?.data?._id,
      });
    }
  }, [auth]);

  useEffect(() => {
    notificationSocket.on('receiveNotification', (user) => {
      dispatch(setUser(user));
    });
  }, [notificationSocket]);

  return (
    <Row gutter={[20, 10]}>
      <Col>
        <Tooltip title="Chatting">
          <Button
            type="link"
            icon={<WechatOutlined />}
            href="/chatting"
          ></Button>
        </Tooltip>
      </Col>
      <Col>
        <Popover
          placement="bottomRight"
          content={<Notifications />}
          trigger="hover"
        >
          <Badge
            count={
              auth?.data?.notifications.filter(
                (noti: Notification) => !noti.isRead,
              ).length
            }
            size="small"
          >
            <Button type="link" icon={<BellFilled />} />
          </Badge>
        </Popover>
      </Col>
      <Col>
        <Popover
          placement="bottomRight"
          content={<Content />}
          title={<Title />}
          trigger="hover"
        >
          <Avatar
            style={{ cursor: 'pointer' }}
            shape="square"
            src={auth?.data?.photoUrl ? auth?.data?.photoUrl : avatarUrl}
          />
        </Popover>
      </Col>
    </Row>
  );
};

export default RightContent;
