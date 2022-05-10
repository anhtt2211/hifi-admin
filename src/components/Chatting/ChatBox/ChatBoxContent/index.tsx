import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  $chatting,
  setCurrentRoomState,
  setRoomsState,
} from '@/redux/slices/chattingSlices';
import React, { FC, useEffect, useState } from 'react';
import socket from '@/utils/messageSocket';
import ChatItem from './ChatItem';
import styles from './index.module.less';
import { Message, Room } from '@/types';

interface IProps {}

const ChatBoxContent: FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const chatting = useAppSelector($chatting);
  const [receivedData, setReceivedData] = useState<Room>();
  const [messageList, setMessageList] = useState<Message[]>([]);
  const userId = localStorage.getItem('adminId');

  useEffect(() => {
    socket.on('sendDataServer', (data: Room) => {
      let newRooms = [...chatting.rooms!];
      const index = newRooms.findIndex((room) => room._id === data?._id);

      if (index != -1) {
        newRooms[index] = data;
      } else {
        newRooms.push(data);
      }

      dispatch(setRoomsState(newRooms));
      setReceivedData(data);

      // if (current?._id === data._id) {
      //   dispatch(setCurrentRoomState(data));
      // }
    });
  }, [socket]);

  useEffect(() => {
    if (receivedData && receivedData?._id === chatting.currentRoom?._id) {
      dispatch(setCurrentRoomState(receivedData));
    }
  }, [receivedData]);

  useEffect(() => {
    if (chatting.currentRoom) {
      setMessageList(chatting.currentRoom?.messages);
    }
  }, [chatting]);

  return (
    <div className={styles.container}>
      <div>
        {messageList.map((message, index) => {
          return (
            <ChatItem
              key={index}
              isMine={message.userId === userId}
              message={message.content}
              date={message.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChatBoxContent;
