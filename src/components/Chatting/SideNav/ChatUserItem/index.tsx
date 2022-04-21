import { Avatar, Col, Divider, Row, Tooltip, Typography } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import socket from '../../../../api/socket';
import styles from './index.module.less';

interface Props {
  lastMessage: Message;
  roomId: string;
  user: User;
  selected: boolean;
}

const ChatUserItem: FC<Props> = (props) => {
  const { user, roomId, lastMessage, selected } = props;
  const userId = '6255931ff19b3638879e3303';

  const handleJoinRoom = () => {
    socket.connect();
    socket.emit('joinRoom', roomId);
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
          <Typography.Title level={5} style={{ marginBottom: '0px' }}>
            {user.name}
          </Typography.Title>
          <Row>
            <Typography.Text ellipsis={true} style={{ fontSize: '14px' }}>
              {userId === lastMessage.userId ? 'You: ' : ''}
              {lastMessage.content}
            </Typography.Text>
          </Row>
          <Row>
            <Tooltip
              title={moment(lastMessage.createdAt).format(
                'YYYY-MM-DD HH:mm:ss',
              )}
            >
              <Typography.Text style={{ fontSize: '12px' }}>
                {moment(lastMessage.createdAt).fromNow()}
              </Typography.Text>
            </Tooltip>
          </Row>
        </Col>
      </Row>
      <Divider></Divider>
    </>
  );
};

export default ChatUserItem;
