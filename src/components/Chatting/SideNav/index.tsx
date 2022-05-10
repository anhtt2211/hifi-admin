import roomApi from '@/api/roomApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  $chatting,
  setCurrentRoomState,
  setRoomsState,
} from '@/redux/slices/chattingSlices';
import { Room } from '@/types';
import socket from '@/utils/messageSocket';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import ChatUserItem from './ChatUserItem';
import styles from './index.module.less';
const { Title } = Typography;

interface IProps {}

const SideNav: FC<IProps> = (props) => {
  const userId = localStorage.getItem('adminId');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState<string>();
  const dispatch = useAppDispatch();
  const chatting = useAppSelector($chatting);

  const joinAllRoom = () => {
    socket.connect();

    rooms.forEach((room) => {
      socket.emit('joinRoom', room._id);
    });
  };

  useEffect(() => {
    socket.on('sendRoom', (data: Room) => {
      setRoomId(data._id);
      dispatch(setCurrentRoomState(data));
    });
  }, [socket]);

  useEffect(() => {
    roomApi
      .getRoomsByUserId(userId!)
      .then((res) => {
        dispatch(setRoomsState(res.data.value));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (chatting.rooms) {
      setRooms(chatting.rooms);
      console.log(chatting);
    }
  }, [chatting]);

  useEffect(() => {
    joinAllRoom();
  }, [rooms]);

  return (
    <div>
      <Title level={3}>Chats</Title>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search or start new chat"
        className={styles['search-input']}
      />
      <div className={styles.container}>
        {rooms.map((room) => {
          return (
            <ChatUserItem
              lastMessage={room.messages[room.messages.length - 1]}
              key={room._id}
              roomId={room._id}
              chatter={room.chatters.find(
                (chatter) => chatter.chatterId != userId,
              )}
              selected={room._id === roomId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
