import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { $users } from '@/redux/slices/userSlices';
import notificationSocket from '@/utils/notificationSocket';
import { BellFilled, WechatOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Popover, Row, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import Content from './content';
import Notifications from './Notifications';
import Title from './Title';

const RightContent = () => {
  const avatarUrl = 'https://joeschmoe.io/api/v1/random';
  const user = useAppSelector($users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      notificationSocket.connect();
      notificationSocket.emit('joinNotification', {
        receiver: user?._id,
      });
    }
  }, [user]);

  useEffect(() => {
    notificationSocket.on('receiveNotification', (user) => {
      // dispatch(authActions.setUser(user));
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
          <Badge count={user?.notifications.length} size="small">
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
            src={user?.photoUrl ? user.photoUrl : avatarUrl}
          />
        </Popover>
      </Col>
    </Row>
  );
};

export default RightContent;
