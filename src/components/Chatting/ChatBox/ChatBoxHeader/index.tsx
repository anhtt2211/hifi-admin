import { Chatter } from '@/types';
import { MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Typography } from 'antd';
import React, { FC } from 'react';
import styles from './index.module.less';

interface IProps {
  chatter?: Chatter;
  setVisibleDrawer: Function;
}

const ChatBoxHeader: FC<IProps> = (props) => {
  const { chatter, setVisibleDrawer } = props;

  const handleVisible = () => {
    setVisibleDrawer();
  };

  return (
    <div className={styles.container}>
      <Row align="middle">
        <Col md={3} xs={4}>
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            alt="Han Solo"
            className={styles.avatar}
          />
        </Col>
        <Col md={12} sm={12} xs={12}>
          <Typography.Title level={5} className={styles.title}>
            {chatter?.name}
          </Typography.Title>
        </Col>
        <Col md={0} sm={2} xs={2} offset={6}>
          <Button
            shape="circle"
            type="primary"
            icon={<MessageOutlined />}
            onClick={handleVisible}
          ></Button>
        </Col>
      </Row>
    </div>
  );
};

export default ChatBoxHeader;
