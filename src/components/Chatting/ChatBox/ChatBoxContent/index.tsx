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

interface IProps {
  chatterAvatar?: string;
}

const ChatBoxContent: FC<IProps> = (props) => {
  const { chatterAvatar } = props;
  const chatting = useAppSelector($chatting);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const userId = localStorage.getItem('adminId');

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
              avatar={message.userId === userId ? '' : chatterAvatar}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChatBoxContent;
