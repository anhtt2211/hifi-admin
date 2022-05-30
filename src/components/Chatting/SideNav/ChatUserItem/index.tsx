import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { $chatting } from '@/redux/slices/chattingSlices';
import { Chatter, Message } from '@/types';
import socket from '@/utils/messageSocket';
import { Avatar, Col, Divider, Row, Tooltip, Typography } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import styles from './index.module.less';

interface IProps {
  lastMessage: Message;
  roomId: string;
  chatter?: Chatter;
  selected: boolean;
}

const ChatUserItem: FC<IProps> = (props) => {
  const { chatter, roomId, lastMessage, selected } = props;
  const userId = localStorage.getItem('adminId');

  const handleJoinRoom = () => {
    socket.emit('fetchRoom', roomId);
  };

  return (
    <>
      <Row
        className={[styles.container, selected && styles.selected].join(' ')}
        onClick={handleJoinRoom}
      >
        <Col span={5} className={styles.col}>
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            alt="Han Solo"
            size={'large'}
          />
        </Col>
        <Col span={19}>
          <Tooltip title={chatter?.name}>
            <Typography.Title
              level={5}
              className={styles.title}
              ellipsis={true}
            >
              {chatter?.name}
            </Typography.Title>
          </Tooltip>

          <Row>
            <Typography.Text ellipsis={true} className={styles.text}>
              {userId === lastMessage?.userId ? 'You: ' : ''}
              {lastMessage?.content}
            </Typography.Text>
          </Row>
          <Row>
            <Tooltip
              title={moment(lastMessage?.createdAt).format(
                'YYYY-MM-DD HH:mm:ss',
              )}
            >
              {lastMessage && (
                <Typography.Text className={styles.time}>
                  {moment(lastMessage?.createdAt).fromNow()}
                </Typography.Text>
              )}
            </Tooltip>
          </Row>
        </Col>
      </Row>
      <Divider style={{ margin: '12px 0' }}></Divider>
    </>
  );
};

export default ChatUserItem;
