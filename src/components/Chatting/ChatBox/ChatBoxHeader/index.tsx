import { MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Typography } from 'antd';
import React, { FC } from 'react';
import styles from './index.module.less';

interface Props {
  chatter?: User;
  setVisibleDrawer: Function;
}

const ChatBoxHeader: FC<Props> = (props) => {
  const { chatter, setVisibleDrawer } = props;

  const handleVisible = () => {
    setVisibleDrawer();
  };

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
        <Col md={0} sm={4} xs={4} offset={8}>
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
