import { SearchOutlined } from '@ant-design/icons';
import { Divider, Input, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import socket from '../../../api/socket';
import ChatUserItem from './ChatUserItem';
import styles from './index.module.less';
import roomApi from '../../../api/roomApi';
import { Room } from '@/types';

const { Title } = Typography;

interface Props {
  setRoom: Function;
}

const SideNav: FC<Props> = (props) => {
  const userId = '6255931ff19b3638879e3303';
  const [rooms, setRooms] = useState<Room[]>([]);
  const { setRoom } = props;
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    socket.on('sendRoom', (data: any) => {
      setRoom(data);
      setRoomId(data._id);
    });
  }, [socket]);

  useEffect(() => {
    roomApi
      .getRoomsByUserId(userId)
      .then((res) => {
        setRooms(res.data.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Title level={3}>Chats</Title>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search or start new chat"
        className={styles['search-input']}
      ></Input>
      {rooms.map((room) => {
        return (
          <ChatUserItem
            lastMessage={room.messages[room.messages.length - 1]}
            key={room._id}
            roomId={room._id}
            user={room.chatters[0]}
            selected={room._id === roomId}
          />
        );
      })}
    </>
  );
};

export default SideNav;
