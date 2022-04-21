import ChatBox from '@/components/Chatting/ChatBox';
import SideNav from '@/components/Chatting/SideNav';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import styles from './index.module.less';
import { Room } from '@/types';

const Chatting = () => {
  const [room, setRoom] = useState<Room>();

  return (
    <Row className={styles.container}>
      <Col span={6} className={styles['side-nav']}>
        <SideNav setRoom={setRoom}></SideNav>
      </Col>
      <Col span={18}>
        <ChatBox room={room}></ChatBox>
      </Col>
    </Row>
  );
};

export default Chatting;
