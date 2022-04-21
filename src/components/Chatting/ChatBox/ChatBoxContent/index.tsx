import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setRoomsState } from '@/redux/slices/chattingSlices';
import React, { FC, useEffect, useState } from 'react';
import socket from '@/utils/socket';
import ChatItem from './ChatItem';
import styles from './index.module.less';

interface IProps {}

const ChatBoxContent: FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const chatting = useAppSelector((state) => state.chatting);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const userId = '6255931ff19b3638879e3303';

  useEffect(() => {
    socket.on('sendDataServer', (data: Room) => {
      dispatch(setRoomsState(data));
    });
  }, [socket]);

  useEffect(() => {
    if (chatting.room) {
      setMessageList(chatting.room?.messages);
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
