import { User } from '@/types';
import { Avatar, Col, Row, Typography } from 'antd';
import React, { FC } from 'react';
import styles from './index.module.less';

interface Props {
  chatter?: User;
}

const ChatBoxHeader: FC<Props> = (props) => {
  const { chatter } = props;
  return (
    <div className={styles.container}>
      <Row align="middle">
        <Col md={2} xs={4}>
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            alt="Han Solo"
            className={styles.avatar}
          />
        </Col>
        <Col md={4} xs={8}>
          <Typography.Title level={5} style={{ marginBottom: '0px' }}>
            {chatter?.name}
          </Typography.Title>
        </Col>
      </Row>
    </div>
  );
};

export default ChatBoxHeader;
