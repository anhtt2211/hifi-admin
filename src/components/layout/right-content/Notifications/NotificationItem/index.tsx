import { Avatar, Badge, Col, Row, Tooltip, Typography } from 'antd';
import moment from 'moment';
import styles from './index.module.less';
import React, { FC } from 'react';
import { Notification } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';

interface IProp {
  notification: Notification;
}

const NotificationItem: FC<IProp> = (props) => {
  const { notification } = props;

  const handleClickNotification = () => {
    window.location.href = notification.redirectUrl;
  };

  return (
    <Row className={styles.container} onClick={handleClickNotification}>
      <Col span={5} className={styles.col}>
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
          alt="Han Solo"
          size={'large'}
        />
      </Col>
      <Col span={18}>
        <Row>
          <Typography.Text ellipsis={true} className={styles.title}>
            {notification.message}
          </Typography.Text>
        </Row>
        <Row>
          <Tooltip
            title={moment(notification.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          >
            <Typography.Text className={styles.time}>
              {moment(notification.createdAt).fromNow()}
            </Typography.Text>
          </Tooltip>
        </Row>
      </Col>
      <Col span={1}>
        {!notification.isRead && <Badge status="processing" />}
      </Col>
    </Row>
  );
};

export default NotificationItem;
